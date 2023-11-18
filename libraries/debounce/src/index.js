const debounce = (func, wait) => {
    let timer; // 任务ID（闭包变量）
    return (...args) => {
        if(timer) {
            // 重新触发事件后，清除已有的定时任务
            clearTimeout(timer);
            timer = null;
        }
        // 制定定时任务
        timer = setTimeout(() => func(...args), wait);
    }
}