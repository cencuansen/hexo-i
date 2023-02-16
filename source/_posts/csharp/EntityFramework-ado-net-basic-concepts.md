---
title: EntityFramework ADO.NET
tags:
  - EntityFramework
  - CSharp
  - ADO.NET
categories:
  - EntityFramework
date: 2023-02-16 16:12:29
---

用于进行数据库访问的技术。

五个对象：

- Connection
- Command
- DataAdapter
- DataSet
- DataReader

# 使用示例

```c#
using System.Data.SqlClient;

private const string connectionString = "";

// 增删改
public static int update(string sql)
{
  using SqlConnection connection = new SqlConnection(connectionString);
  connection.Open();
  using SqlCommand cmd = new SqlCommand(sql, connection);
  // ExecuteNonQuery 用于执行增删改语句
  int result = cmd.ExecuteNonQuery();
  return result;
}

// 查询单条数据
public static int query(string sql)
{
  using SqlConnection connection = new SqlConnection(connectionString);
  connection.Open();
  SqlCommand cmd = new SqlCommand(sql, connection);
  // ExecuteScalar 用于查询返回结果中的首行首列数据
  int result = cmd.ExecuteScalar();
  return result;
}

// 查询数据
public static void query(string sql)
{
  using SqlConnection connection = new SqlConnection(connectionString);
  connection.Open();
  SqlCommand cmd = new SqlCommand(sql, connection);
  // ExecuteReader 读取的数据是行流，会跟数据库保存连接去读取数据，适合数据量小的情况
  using SqlDataReader dataReader = cmd.ExecuteReader();
  while (dataReader.Read())
  {
    // 一次while循环读一行数据

    // 获得第0列数据
    var col0 = dataReader.GetString(0);
    // 获得第1列数据
    var col1 = Convert.ToInt32(dataReader["name"]);
    // 获得第2列数据
    var col2 = dataReader.GetString(2);
  }
}

// 查询数据
public static DataTable query(string sql)
{
  using SqlConnection connection = new SqlConnection(connectionString);
  SqlDataAdapter adapter = new SqlDataAdapter(sql, connection);
  // DataSet 中含可以有多个 DataTable
  // DataSet dataSet = new DataSet();
  DataTable dtable = new DataTable();
  adapter.Fill(dtable);
  return dtable;
}
```

# 参数化查询防 SQL 注入

```c#
using SqlConnection connection = new SqlConnection(connectionString);
connection.Open();
// @符号是必须的
string querySql = "select * from students where name=@name and age=@age and class=@class;";
SqlCommand command = new SqlCommand(querySql, connection);

// 单条参数处理
SqlParameter sqlParameter1 = new ();
sqlParameter.ParameterName = "name";
sqlParameter.Size = 64;
sqlParameter.SqlDbType = SqlDbType.VarChar;
sqlParameter.Value = "李明";
command.Parameters.Add(sqlParameter1);

// 批量参数处理
SqlParameter[] parameters =
{
  new SqlParameter("age", SqlDbType.Int),
  new SqlParameter("class", SqlDbType.VarChar),
}
parameters[0].Value = 18;
parameters[1].Value = "精英班";
command.Parameters.AddRange(parameters);

int result = Convert.ToInt32(command.ExecuteScalar());
```
