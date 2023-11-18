export default class Stack {
    constructor() {
        this.items = {};
        this.length = 0;
    }
 
    push(item) {
        this.items[this.length] = item;
        this.length++;
    }
 
    pop() {
        if(this.isEmpty()) {
            return undefined;
        }
        const item = this.items[this.length - 1];
        this.length--;
        return item;
    }
 
    peek() {
        if(this.isEmpty()) {
            return undefined
        }
        return this.items[this.length - 1];
    }
 
    clear() {
        this.items = {};
        this.length = 0;
    }
 
    isEmpty() {
        return this.length === 0;
    }
 
    size() {
        return this.length;
    }
    
    toString() {
        if(this.isEmpty()) {
            return ''
        }
        let str = this.items[0];
        for(let i = 1; i < this.length; i++) {
            str += ',' + this.items[i];
        }
        return str;
    }
}