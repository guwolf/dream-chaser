export class Set {
    constructor() {
        this.items = {};
        this.length = 0;
    }
 
    add(item) {
        if(this.has(item)) {
            return this;   
        }
        this.items[item] = item;
        this.length++;
        return this;
    }
 
    delete() {
        if(this.has(item)) {
            this.length--;
            return delete this.items[item];
        }
        return false;
    }
 
    clear() {
        this.items = {};
        this.length = 0;
    }
 
    has(item) {
        return item in this.items;
    }
 
    size() {
        return this.length;
    }
 
    keys() {
        return Object.keys(this.items);
    }
 
    values() {
        return Object.values(this.items);
    }
 
    entries() {
        return Object.entries(this.items);
    }
 
    forEach(callback) {
        let index = 0;
        for(let item in this.items) {
            if(this.items.hasOwnProperty(item)) {
                callback(item, index, this);
                index++;
            }
        }
    }
 
    union(set) {
        const unionSet = new Set();
        if(set instanceof Set) {
            this.forEach((key) => {
                if(!unionSet.has(key)) {
                    unionSet.add(this.items[key]);
                }
            });
            set.forEach((key) => {
                if(!unionSet.has(key)) {
                    unionSet.add(this.items[key]);
                }
            });
        }
        return unionSet;
    }
 
    intersection(set) {
        const intersectionSet = new Set();
        if(set instanceof Set) {
            const keys = this.keys().concat(set.keys());
            for(const key of keys) {
                if(this.has(key) && set.has(key)) {
                    intersectionSet.add(this.items[key]);
                }
            }
        }
        return intersectionSet;
    }
 
 
    difference() {
 
    }
}