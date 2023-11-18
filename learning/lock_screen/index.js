const child_process = require('child_process');
 
// 指定锁屏的时间，按自己需求灵活配置
const lock_screen_period_list = [
    '09.00.00',
    '10.00.00',
    '11.00.00',
    '12.00.00',
    '13.00.00',
    '14.00.00',
    '15.00.00',
    '16.00.00',
    '17.00.00',
    '18.00.00',
];
 
const getTime = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
 
    let time_str = ''
    time_str += (hours < 10 ? '0' + hours : hours) + '.';
    time_str += (minutes < 10 ? '0' + minutes : minutes) + '.';
    time_str += seconds < 10 ? '0' + seconds : seconds;
    
    return time_str;
}
 
const task = () => {
 
    const time = getTime();
 
    if (lock_screen_period_list.includes(time)) {
        // 真正干活的代码
        child_process.exec('rundll32.exe user32.dll,LockWorkStation');
    }
};
 
setInterval(task, 1000);
