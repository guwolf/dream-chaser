export class Dictionary {
    constructor(toStrFn = defaultToString) {
        this.toStrFn = toStrFn;
        this.table = {};
    }
 
    set(key, value) {
        if(key != null && value !=null) {
            const tableKey = this.toStrFn(key)
            const pair = new ValuePair(key, value)
            this.table[tableKey] = pair;
            return true;
        }
        return false;
    }
 
    get(key) {
        if(this.hasKey(key)) {
            const tableKey = this.toStrFn(key);
            const pair = this.table[tableKey];
            return pair.value;
        }
        return undefined;
    }
 
    remove(key) {
        if(this.hasKey(key)) {
            const tableKey = this.toStrFn(key);
            delete this.table[tableKey];
            return true;
        }
        return false;
    }
 
    hasKey(key) {
        const tableKey = this.toStrFn(key);
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