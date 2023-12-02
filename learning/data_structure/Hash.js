export class HashTable {
    constructor(toStrFn = defaultToString) {
        this.toStrFn = toStrFn;
        this.table = {};
    }
 
    put(key, value) {
        if(key != null && value !=null) {
            const tableKey = this.hashCode(key)
            const pair = new ValuePair(key, value)
            this.table[tableKey] = pair;
            return true;
        }
        return false;
    }
 
    get(key) {
        if(this.hasKey(key)) {
            const tableKey = this.hashCode(key);
            const pair = this.table[tableKey];
            return pair.value;
        }
        return undefined;
    }
 
    remove(key) {
        if(this.hasKey(key)) {
            const tableKey = this.hashCode(key);
            delete this.table[tableKey];
            return true;
        }
        return false;
    }
 
    forEach(fn) {
        const keys = this.keys();
        for(let i = 0; i < keys; i++) {
            const key = keys[i];
            const tableKey = this.hashCode(key);
            const item = this.item[tableKey];
            fn(item, key, i);
        }
    }
 
    hasKey(key) {
        const tableKey = this.hashCode(key);
        return this.table[tableKey] != null;
    }
 
    size() {
        return Object.keys(this.table).length;
    }
 
    isEmpty() {
        return this.size() === 0
    }
 
    keys() {
        return this.keyValues().map(item => item.key);
    }
 
    values() {
        return this.keyValues().map(item => item.value);
    }
 
    keyValues() {
        return Object.values(this.table);
    }
 
    toString() {
        if(this.isEmpty()) {
            return '';
        }
        const valuePairs = this.keyValues();
        let str = valuePairs[0].toString();
        for(let i = 1; i < valuePairs.length; i++) {
            str = `${str}, ${valuePairs[i].toString()}`;
        }
        return str;
    }
 
    hashCode(key) {
        if(typeof key === 'number') {
            return key;
        }
        const tableKey = this.toStrFn(key);
        let hash = 0;
        for(let i = 0; i < tableKey.length; i++) {
            hash += tableKey.charCodeAt(i);
        }
        hash = hash % 72;
        return hash;
    }
}
 
 
class ValuePair {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
 
    toString() {
        let keyStr = '', valueStr = '';
        try {
            keyStr = `${this.key}`;
        } catch(e) {
            keyStr = this.key.toString();
        }
        try {
            valueStr = `${this.value}`;
        } catch(e) {
            valueStr = this.value.toString();
        }
        return `{${keyStr}: ${valueStr}}`;
    }
}
 
const defaultToString = item => {
    if(item === null) {
        return 'NULL';
    }
    if(item === undefined) {
        return 'UNDEFINED';
    }
    if(typeof item === 'string' || item instanceof String) {
        return `${item}`;
    }
    return item.toString();
}
 
const dic = new Dictionary();
const obj = {};
const sym = Symbol();
 
dic.set('a', 1);
dic.set('b', true);
dic.set(obj, 1);
dic.set(sym, 1);