const throttle = (func, wait) => {
    let timer; // 任务ID（闭包变量）
    return (...args) => {
        if(timer) {
            // 如果已经有未执行的定时任务，则不再重新制定定时任务
            return null;
        }
        timer = setTimeout(() => { 
            func(...args);
            // 执行定时任务后，清除定时任务，并将任务ID timer赋值为null
            clearTimeout(timer);
            timer = null;
        }, wait);
    }
}