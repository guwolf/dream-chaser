export default class Queue {
    constructor() {
        this.items = {};
        this.index = 0;
        this.prevIndex = 0;
    }
 
    enqueue(item) {
        this.items[this.index] = item;
        this.index++;
    }
 
    dequeue() {
        if(this.isEmpty()) {
            return undefined
        }
        const item = this.items[this.prevIndex];
        delete this.items[this.prevIndex];
        this.prevIndex++;
        return item;
    }
 
    peek() {
        if(this.isEmpty()) {
            return undefined
        }
        return this.items[this.prevIndex];
    }
 
    isEmpty() {
        return this.size() === 0;
    }
 
    clear() {
        this.items = {};
        this.index = 0;
        this.prevIndex = 0;
    }
 
    size() {
        return this.index - this.prevIndex;
    }
 
    toString() {
        if(this.isEmpty()) {
            return '';
        }
        let str = this.items[this.prevIndex];
        for(let i = this.prevIndex + 1; i < this.index; i++) {
            str += ',' + this.items[i];
        }
        return str;
    }
}