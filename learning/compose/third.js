export default compose = (...funcs) => {
    let com = arg => arg;
    for(const cur of funcs) {
        const prev = com;
        com = (...args) => prev(cur(...args));
    }
    return com;
}