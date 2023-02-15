---
title: CSharp 简单应用
tags:
  - CSharp
categories:
  - CSharp
date: 2023-02-14 23:27:46
---

# 生成二维码

```c#
public Stream QRCodeStream(string contents)
{
    QRCodeGenerator qrGenerator = new QRCodeGenerator();
    QRCodeData qrCodeData = qrGenerator.CreateQrCode(contents, QRCodeGenerator.ECCLevel.L);
    QRCode qrCode = new QRCode(qrCodeData);
    Bitmap bigMap = qrCode.GetGraphic(20, Color.Black, Color.White, true);
    MemoryStream stream = new MemoryStream();
    bigMap.Save(stream, System.Drawing.Imaging.ImageFormat.Png);
    stream.Position = 0;
    return stream;
}
```

# 拼接图片

```c#
string file1 = @"C:\Users\Admin\Desktop\images\1.png";
string file2 = @"C:\Users\Admin\Desktop\images\2.png";
Image image1 = Image.FromStream(new MemoryStream(File.ReadAllBytes(file1)));
Image image2 = Image.FromStream(new MemoryStream(File.ReadAllBytes(file2)));
var image1Width = image1.Width;
var image1Height = image1.Height;
var image2Width = image2.Height;
var image2Height = image2.Height;
var stream = new MemoryStream();
using Bitmap map = new Bitmap(image1Width, image1Height);//定义画布
Graphics g = Graphics.FromImage(map);//定义画笔
g.Clear(Color.White);//把画布更改为白色
g.DrawImage(image1, new Point(0, 0));
g.DrawImage(image2, new Point(image1Width - image2Width, image1Height - image2Height));
map.Save(stream, ImageFormat.Jpeg);
```

# 端口占用检查

```c#
while (true)
{
  Console.WriteLine("请输入需要检测的端口号(如：80), 输入exit退出此程序");
  var inPortString = Console.ReadLine();
  Process process = new Process();

  if (inPortString == "exit")
  {
    process.Close();
    break;
  }

  int port = 80;
  try
  {
    if (string.IsNullOrWhiteSpace(inPortString))
    {
      Console.WriteLine("输入端口号非法，将查询默认端口号：80");
    }
    else
    {
      port = Convert.ToInt32(inPortString);
    }
  }
  catch (Exception e)
  {
    Console.WriteLine("输入端口号非法，将查询默认端口号：80");
    port = 80;
  }

  process.StartInfo.FileName = "cmd.exe";
  process.StartInfo.UseShellExecute = false;
  process.StartInfo.RedirectStandardInput = true;
  process.StartInfo.RedirectStandardOutput = true;
  process.StartInfo.RedirectStandardError = true;
  process.StartInfo.CreateNoWindow = true;
  process.Start();
  process.StandardInput.WriteLine("netstat -ano");
  process.StandardInput.WriteLine("exit");
  Regex reg = new Regex("\\s+", RegexOptions.Compiled);
  bool found = false;
  string line = string.Empty;
  while ((line = process.StandardOutput.ReadLine()) != null)
  {
    line = line.Trim();
    if (line.StartsWith("TCP", StringComparison.OrdinalIgnoreCase))
    {
      line = reg.Replace(line, ",");
      string[] arr = line.Split(',');
      if (arr[1].EndsWith($":{port}"))
      {
        found = true;
        int pid = int.Parse(arr[4]);
        Process foundProcess = Process.GetProcessById(pid);
        Console.WriteLine($"{port}端口. pid：{pid}, 进程名：{foundProcess.ProcessName}\n");
        break;
      }
    }
  }
  if (!found)
  {
    Console.WriteLine($"未找到{port}端口上的进程\n");
  }
  process.Close();
}
```

# byte[]、string、stream 间转换

## stream -> string

```c#
using StreamReader reader = new StreamReader(stream);
string result = reader.ReadToEnd();
```

## string -> stream

```c#
string test = "This is string";
using MemoryStream stream = new MemoryStream();
using StreamWriter writer = new StreamWriter( stream );
writer.Write( test );
writer.Flush();
```

## byte[] -> string

```c#
string str = System.Text.Encoding.Default.GetString( byteArray );
```

## string -> byte[]

```c#
byte[] byteArray = System.Text.Encoding.Default.GetBytes( str );
```

## stream -> byte[]

```c#
byte[] bytes = new byte[stream.Length];
stream.Read(bytes, 0, bytes.Length);
```

## byte[] -> stream

```c#
using Stream stream = new MemoryStream(bytes);
```

# 文本长度

```c#
string strTmp = "a1某某某";
// 10，Unicode下中英文每个字2字节。
int len1 = System.Text.Encoding.Unicode.GetBytes(strTmp).Length;
// 11，Default 等价与 UTF8，中文3个字节，英文1个字节
int len2 = System.Text.Encoding.Default.GetBytes(strTmp).Length;
int len3 = System.Text.Encoding.UTF8.GetBytes(strTmp).Length;
// 5，就是个数
int len4 = System.Text.Encoding.Default.GetBytes(strTmp).Length;
```

# WebSocket 应用

## Startup.Configure

```c#
app.UseWebSockets();
```

## Controller.cs

```c#
[HttpGet("receive-message")]
public async Task GetMessage()
{
    if (HttpContext.WebSockets.IsWebSocketRequest)
    {
        using (var webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync())
        {
            Console.WriteLine("WebSocket connection established");
            await Echo(webSocket);
        }
    }
    else
    {
        HttpContext.Response.StatusCode = 400;
    }
}

private async Task Echo(WebSocket webSocket)
{
    var buffer = new byte[1024 * 4];
    var result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
    Console.WriteLine("Message received from Client");
    while (!result.CloseStatus.HasValue)
    {
        var serverMsg = Encoding.UTF8.GetBytes($"Server: Hello. You said: {Encoding.UTF8.GetString(buffer)}");
        await webSocket.SendAsync(new ArraySegment<byte>(serverMsg, 0, serverMsg.Length), result.MessageType, result.EndOfMessage, CancellationToken.None);
        Console.WriteLine("Message sent to Client");
        result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
        Console.WriteLine("Message received from Client");
    }
    await webSocket.CloseAsync(result.CloseStatus.Value, result.CloseStatusDescription, CancellationToken.None);
    Console.WriteLine("WebSocket connection closed");
}
```

## index.html

```html
var socket = new WebSocket('wss://localhost:6666/receive-message');
socket.send('前端消息');
```

# HTTP 网络请求

HttpWebRequest：最早，不阻塞 ui，细节控制；
WebClient：对 HttpWebRequest 的简化和封装；
HttpClient：.NET 4.5 开始，预热机制，适合发送多次请求；

## HttpClient

```c#
var httpClientHandler = new HttpClientHandler
{
  Proxy = new WebProxy("http://127.0.0.1:1080", false),// 设置代理
};
var httpClient = new HttpClient(httpClientHandler);
var response = await httpClient.GetAsync("http://www.baidu.com");
var responseText = await response.Content.ReadAsStringAsync();
```

HttpClient 存在 Dispose 后不能立即释放对应套接字问题，默认需要 4 分钟去释放。
可以创建一个 HttpClient 实例，把它存储在一个静态字段中，或者使用 HttpClientFactory，[相关文章](url=https://www.oschina.net/news/77036/httpclient)。
