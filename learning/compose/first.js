export default compose = (...funcs) => {
    if(funcs.length === 0) {
        return arg => arg;
    }
    
    if(funcs.length === 1) {
        return funcs[0];
    }
 
    return funcs.reduce((prev, cur) => {
       return (...args) => {
           prev(cur(...args));
        } 
    });
}