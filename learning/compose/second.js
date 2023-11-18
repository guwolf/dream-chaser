const compose = (...funcs) => {
    if(funcs.length === 0) {
        return arg => arg;
    }
    
    if(funcs.length === 1) {
        return funcs[0];
    }
 
    return (...args) => {
        return funcs.reduceRight((prev, cur, i) => {
            let param = i === funcs.length - 1 ? args : [ prev ];
            return cur(...param);
        }, args);
    }
}