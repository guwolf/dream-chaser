class EventEmitter {
    constructor() {
        this.map = new Map();
    }

    getEvents(eventName) {
        if(!this.map.has(eventName)) {
            this.map.set(eventName, new Set());
        }
        return this.map.get(eventName);
    }

    on(eventName, callback) {
        const list = this.getEvents(eventName);
        list.add(callback);
        return () => {
            list.delete(callback);
        }
    }

    once(eventName, callback) {
        callback.once = true;
        return this.on(eventName, callback);
    }

    emit(eventName, ...args) {
        const list = this.map.get(eventName);
        if(list) {
            for(const callback of list) {
                try {
                    callback(...args);
                } catch(e) {
                    console.log(e);
                }
                if(callback.once) {
                    list.delete(callback);
                }
            }
        }
    }

    off(eventName, callback) {
        const list = this.map.get(eventName);
        if(list) {
            list.delete(callback);
        }
    }

    clear() {
        this.map.clear();
    }
}