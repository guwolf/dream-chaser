
import EventEmitter from './EventEmiter';
import Queue from './Queue';

export default class MockHTTP {
    constructor(url) {
        this.ws = new WebSocket(url);
        this.eventEmitter = new EventEmitter();
        this.queue = new Queue();
        this.ws.onmessage = this.receive;
    }

    loop() {
        if(this.queue.size() && this.ws.readyState === this.ws.OPEN) {
            // 发起请求
            const params = this.queue.dequeue();
            this.ws.send(JSON.stringify(params));
        }
        requestAnimationFrame(this.loop);
    }

    // 接收数据
    receive(e) {
        const data = e.data;
        const uuid = data.uuid;
        if(uuid) {
            this.eventEmitter.emit(uuid);
        }
    }

    asyncSend(params) {
        // 发起的请求放到队列中
        this.queue.enqueue(params);
    }

    // 请求
    request(params, callback) {
        return new Promise((resolve, reject) => {
            // 生成uuid，用来匹配发起的ws请求 和 ws响应
            const uuid = `${new Date().valueOf()}${Math.round(Math.random() * 1000)}`;
            // 将回调函数放入事件发射器
            this.eventEmitter.once(uuid, (data) => {
                // 采用回调函数接收响应数据
                if(callback) {
                    callback(data);
                }
                // resolve
                resolve(data);
            });
            params.uuid = uuid;
            this.asyncSend(params);
        });
    }

    // 关闭websocket连接
    close() {
        this.ws.close();
    }
}

// Demo
const HTTP = new MockHTTP('http://localhost:8080/ws');
const params = {
    method: 'add',
    data: {
        name: '小明',
        sex: '男',
        age: 13
    }
};

HTTP.request(params).then((data) => {
    console.dir(data);
});