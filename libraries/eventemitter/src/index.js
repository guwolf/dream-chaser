class EventEmitter {
    events = new Map();
 
    constructor() {}
 
    getEvents(eventName) {
        if(eventName) {
            let list = this.events.get(eventName);
            if(!list) {
                this.events.set(eventName, new Set());
                list = this.events.get(eventName);
            }
            return list;
        } else {
            return this.events;
        }        
    }
 
    on(eventName, executor) {
        const list = this.getEvents(eventName);
        list.add(executor);
        return () => {
            list.delete(executor);
        }
    }
 
    once(eventname, executor) {
        executor.once = true;
        return this.on(eventname, executor);
    }
 
    emit(eventName) {
        let list = this.events.get(eventName);
        if(list) {
            for(const handler of list) {
                try {
                    handler();
                } catch(e) {
                    console.log(e);
                }
                if(handler.once) {
                    list.delete(handler);
                }
            }
        }
    }
 
    off(eventName, executor) {
        let list = this.events.get(eventName);
        if(list) {
            if(executor) {
                list.delete(executor);
            } else {
                list.clear();
            }            
        }
    }
 
    clear() {
        this.events.clear();
    }
}
