Array.prototype.mockMap = function(fn, thisArg) {
    thisArg = thisArg || this;
    const arr = [];
    for(let i = 0; i < thisArg.length; i++) {
        const res = fn(thisArg[i], i , thisArg)
        arr.push(res);
    }
    return arr;
}

Array.prototype.mockMap = function(fn, thisArg) {
    thisArg = thisArg || this;
    const arr = [];
    for(let i = 0; i < thisArg.length; i++) {
        const res = fn(thisArg[i], i , thisArg)
        arr.push(res);
    }
    return arr;
}

Array.prototype.mockFilter = function(fn, thisArg) {
    thisArg = thisArg || this;
    const arr = [];
    for(let i = 0; i < thisArg.length; i++) {
        if(fn(thisArg[i], i, thisArg)) {
            arr.push(thisArg[i]);
        }
    }
    return arr;
}