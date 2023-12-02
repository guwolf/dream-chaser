class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}
 
export class LinkedList {
    constructor() {
        this.length = 0;
        this.head = null;
    }
 
    insert(value, index) {
        if(index === undefined || index > this.size() || index < 0) {
            return false;
        }
        if(index === this.size()) {
            return this.append(value);
        }
        if(index === 0) {
            return this.perpend(value);
        }
        let prev = this.head, cnt = 0;
        while(prev.next && cnt < index - 1) {
            prev = prev.next;
            cnt++;
        }
        const node = new Node(value);
        const next = prev.next;
        prev.next = node;
        node.next = next;
        this.length++;
        return true;
    }
 
    remove(index) {
        if(index < 0 || index >= this.size() || !this.head) {
            return undefined;
        }
        if(index === 0) {
            const node = this.head;
            this.head = node.next;
            this.length--;
            return node;
        }
        let prev = this.head, cnt = 0;
        while(prev.next && cnt < index - 1) {
            prev = prev.next;
            cnt++;
        }
        const node = prev.next;
        prev.next = node.next;
        this.length--;
        return node;
    }
 
    append(value) {
        const node = new Node(value);
        if(!this.head) {
            this.head = node;
            this.length++;
            return true;
        }
        let current = this.head;
        while(current.next) {
            current = current.next;
        }
        current.next = node;
        this.length++;
        return true;
    }
 
    perpend(value) {
        const node = new Node(value);
        if(!this.head) {
            this.head = node;
            this.length++;
            return true;
        }
        node.next = this.head;
        this.head = node;
        this.length++;
        return true;
    }
 
    toString() {
        if(this.isEmpty()) {
            return '';
        }
        let current = this.head;
        let str = current.value;
        while(current.next) {
            current = current.next;
            str += ',' + current.value;
        }
        return str;
    }
 
    clear() {
        this.head = null;
        this.length = 0;
    }
 
    isEmpty() {
        return this.size() === 0;
    }
 
    size() {
        return this.length;
    }
}

class DbNode extends Node {
    constructor(value) {
        super(value);
        this.prev = null;
    }
}
 
export class DbLinkedList extends LinkedList {
    constructor() {
        super();
        this.tail = null;
    }
 
    insert(value, index) {
        if(index === undefined || index > this.size() || index < 0) {
            return false;
        }
        if(index === this.size()) {
            return this.append(value);
        }
        if(index === 0) {
            return this.perpend(value);
        }
        let prev = this.head, cnt = 0;
        while(prev && cnt < index - 1) {
            prev = prev.next;
        }
        const node = new DbNode(value);
        const next = prev.next;
        node.next = next;
        next.prev = node;
        node.prev = prev;
        prev.next = node;
        this.length++;
        return true;
    }
 
    remove(index) {
        if(index < 0 || index >= this.size() || !this.head) {
            return undefined;
        }
        if(index === 0) {
            const node = this.head;
            this.head = node.next;
            this.length--;
            return node;
        }
        let prev = this.head, cnt = 0;
        while(prev.next && cnt < index - 1) {
            prev = prev.next;
            cnt++;
        }
        const node = prev.next;
        if(node ===  this.tail) {
            prev.next = null;
            this.tail = prev;
        } else {
            const next = node.next;
            next.prev = prev;
            prev.next = next;            
        }
        this.length--;
        return node;
    }
 
    append(value) {
        const node = new DbNode(value);
        if(!this.head) {
            this.head = node;
            this.tail = node;
            this.length++;
            return true;
        }
        let current = this.head;
        while(current.next) {
            current = current.next;
        }
        current.next = node;
        node.prev = current;
        this.tail = node;
        this.length++;
        return true;
    }
 
    perpend(value) {
        if(!this.head) {
            this.append(value)
        }
        const node = new DbNode(value);
        node.next = this.head;
        this.head.prev = node;
        this.head = node;
        this.length++;
        return true;
    }
}