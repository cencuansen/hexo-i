---
title: RabbitMQ 基础
tags:
  - RabbitMQ
categories:
  - RabbitMQ
date: 2023-02-19 21:37:33
---

# 模式

点对点模式：一个消息被一个消费者消费；
发布订阅模式：一个消息被多个消费者消费。

# 交换机

交换机负责消息转发，不具备存储消息的能力，没有匹配的队列时，消息会丢失。
扇形交换机：Fanout ，广播，将消息发给所有绑定到交换机的队列；
直连交换机：Direct，定向，消息的 routing key 和 队列 binding key 对应投递；
主题交换机：Topic，通配符，将消息交给符合指定 routing pattern 的队列；

# 消息流程

生产者向交换机发送一条消息，交换机通过 routing key 和队列绑定规则(binding key)，将消息分发到队列。
![mq](/images/rabbit-mq.webp)

# 消费模式

1. 推：消费者用 channel.basicConsume 订阅队列，RabbitMQ 会推送消息给消费者；
2. 拉：消费者用 channel.basicGet 主动从指定队列拉取消息；

# 消息队列用途

解耦：功能模块之间通过消息进行关系解耦；
削峰填谷：保护系统不因短期大流量冲击而服务崩溃；
冗余数据：防止系统在保存数据时崩溃导致数据丢失；
顺序消费：能保持消息被顺序消费；

# 死信交换机

死信（Dead Letter）产生原因可能是：

1. 消费者拒收了，basic.reject、basic.nack、requeue=false
2. 消息超时过期了，ttl
3. 消息数量超出队列长度了

## 配置死信交换机

策略(Policy)和队列参数(Optional Queue Arguments)两种方式。

## 策略

```bash
rabbitmqctl set_policy DLX ".*" '{"dead-letter-exchange":"my-dlx"}' --apply-to queues
```

这里将名为 my-dlx 的死信交换机应用到全部队列。

## 队列参数

```java
Map<String, Object> queueArgs = new HashMap<String, Object>();
channel.exchangeDeclare("myExchange", "direct");
queueArgs.put("x-dead-letter-exchange", "myExchange");
channel.queueDeclare("myQueue", false, false, false, queueArgs);
```

## 死信路由

1. 队列参数中定义 x-dead-letter-routing-key；
2. 否则使用消息上的 routing key 去找死信交换机；

## 死循环

死信路由出现死循环，死信就会被丢弃。如：死信没定义 routing key 并投递到默认交换机。

# 消息不丢失

1. 消息生产阶段：从消息被生产出来，然后提交给 MQ 的过程中，只要能正常收到 MQ Broker 的 ack 确认响应，就表示发送成功，所以只要处理好返回值和异常，这个阶段是不会出现消息丢失的。
2. 消息存储阶段：这个阶段一般会直接交给 MQ 消息中间件来保证，但是你要了解它的原理，比如 Broker 会做副本，保证一条消息至少同步两个节点再返回 ack。
3. 消息消费阶段：消费端从 Broker 上拉取消息，只要消费端在收到消息后，不立即发送消费确认给 Broker，而是等到执行完业务逻辑后，再发送消费确认，也能保证消息的不丢失。
4. 进阶：给每个发出的消息都指定一个全局唯一 ID，或者附加一个连续递增的版本号，然后在消费端做对应的版本校验。利用拦截器机制。在生产端发送消息之前，通过拦截器将消息版本号注入消息。

# 消息重复消费

建立消息消费日志表。查询消费日志后再去消费，再更新消费日志

# 消息堆积

## 原因

- 消费者数量不足；
- 消费者处理速度慢；
- 消息生产速度过快；
- 队列没有被正确地消费；
- 消费者拒绝消费(basic.reject、basic.nack)：
  - basic.reject 拒绝单个消息，requeue=true，重新排队，堆积
  - basic.nack 一次性拒绝多个消息，requeue=true，重新排队，堆积

## 解决

- 增加消费者数量，加快消息的消费速度；
- 优化消费者的处理逻辑，提高消费速度；
- 增加队列的大小，缓解消息积累的问题；
- 限制消息的生产速度，防止消息过快地进入队列；
- 检查消费者是否正常工作，以及是否正确地处理了消息；
- 配置消息过期时间，及时清理过期消息；
