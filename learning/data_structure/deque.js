export default class Deque {
    constructor() {
        this.items = {};
        this.backIndex = 0;
        this.frontIndex = 0;
    }
 
    addBack(item) {
        this.items[this.backIndex] = item;
        this.backIndex++;
    }
 
    removeBack() {
        if(this.isEmpty()) {
            return undefined;
        }
        const item = this.items[this.backIndex - 1];
        delete this.items[this.backIndex - 1];
        this.backIndex--;
        return item;
    }
 
    addFront(item) {
        if(this.isEmpty()) {
            this.addBack(item);
        } else if(this.frontIndex > 0) {
            this.frontIndex--;
            this.items[this.frontIndex] = item;
        } else {
            for(let i = this.backIndex; i > this.frontIndex; i--) {
                this.items[i] = this.items[i-1];
            }
            this.backIndex++;
            this.items[this.frontIndex] = item;
        }
    }
 
    removeFront() {
        if(this.isEmpty()) {
            return undefined;
        }
        const item = this.items[this.frontIndex];
        delete this.items[this.frontIndex];
        this.frontIndex++;
        return item;
    }
 
    peekBack() {
        if(this.isEmpty()) {
            return undefined;
        }
        return this.items[this.backIndex - 1];
    }
 
    peekFront() {
        if(this.isEmpty()) {
            return undefined;
        }
        return this.items[this.frontIndex];
    }
 
    clear() {
        this.items = {};
        this.backIndex = 0;
        this.frontIndex = 0;
    }
 
    size() {
        return this.backIndex - this.frontIndex;
    }
 
    isEmpty() {
        return this.size() === 0;
    }
 
    toString() {
        if(this.isEmpty()) {
            return ''
        }
        let str = this.items[this.frontIndex];
        for(let i = this.frontIndex + 1; i < this.backIndex; i++) {
            str += ',' + this.items[i];
        }
        return str;
    }
}