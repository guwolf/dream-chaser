// 创建WebSocket连接
const ws = new WebSocket('ws://localhost:8080/echo');

// 链接建立成功
ws.onopen = () => {
    // 向服务端发送数据
    ws.send('Hello World!');
}

// 监听服务端发过来的数据
ws.onmessage = (event) => {
    console.dir(event.data);
}

// 连接出错触发error事件
ws.onerror = () => {
    console.log('连接出错');
}

// 服务端关闭WebSocket连接或ws.close()主动关闭连接触发close事件
ws.onclose = () => {
    console.log('链接已关闭');
}
