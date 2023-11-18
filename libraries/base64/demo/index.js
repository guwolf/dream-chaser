const base64Str = Base64.encode('Hello world。𠮷𠮷𠮷。这个世界很精彩。！＠＃￥％……＆×（）——！!#%^&*()_+');
console.log('------------------打印开始-------------------------');
console.log("Base64.encode('Hello world。𠮷𠮷𠮷。这个世界很精彩。！＠＃￥％……＆×（）——！!#%^&*()_+')输出结果是：");
console.log(base64Str);
console.log('------------------打印结束-------------------------');
 
const str = Base64.decode(base64Str);
console.log('------------------打印开始-------------------------');
console.log(`Base64.decode('${base64Str}')`);
console.log(str);
console.log('------------------打印结束-------------------------');