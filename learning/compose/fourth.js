const compose = (...funcs) => {
    if(funcs.length === 0) {
        return arg => arg;
    }
 
    return (...args) => {
        let res, len = funcs.length;    
        for(let i = len - 1; i >=0; i--) {
            param = i === len - 1 ? args : [ res ];
            res = funcs[i](...param);
        }
        return res;
    }
}