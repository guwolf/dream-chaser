// demo.js
import Bson from "./bson";
 
// Step 1. 对需要交换的json数据进行序列化
const payload = JSON.stringify({
  code: 0,
  message: 'Hello world, This is a test. 我爱我的祖国。',
  data: {
    field_1: 1,
    field_2: true,
    field_3: '123',
  }
});
 
// Step 2. 交换数据的格式（length和payload为必须字段）
const data = {
  extra: -12,
  length: null, // 必传length，占位，可设置为null，暂不计算payload长度
  payload, // 序列化的数据
};
 
// Step 3.1. 定义schema，必须和待二进制化的数据对应
const schema_encode = {
  extra: new Bson.codec.Int8({length: 1}),
  length: new Bson.codec.Uint32({length: 4}),
  // 如果不想自己计算payload长度，可不设置length，Bson会计算payload长度
  payload: new Bson.codec.String(),
};
 
// Step 3.2 根据schema，将JSON数据二进制化（JSON -> Binary）
console.log('----------data数据 开始分割线------------');
console.dir(data);
console.log('----------data数据 结束分割线------------');
 
const buffer = Bson.encode(data, schema_encode, false);
console.log('----------buffer数据 开始分割线------------');
console.log(new DataView(buffer));
console.log('----------buffer数据 结束分割线------------');
 
// Step 4.1. 定义schema，必须和待解析的数据对应
const schema_decode = {
  extra: new Bson.codec.Int8({length: 1}),
  length: new Bson.codec.Uint32({length: 4}),
  // 如果还不知道payload的长度，可不设置length，Bson会从buffer中读取payload长度
  payload: new Bson.codec.String(),
};
 
// Step 4.2. 根据schema，将二进制数据解析成JSON（Binary -> JSON）
const parseData = Bson.decode(buffer, schema_decode, false);
console.log('----------解析出来的数据 开始分割线------------');
console.dir(parseData);
console.dir(JSON.parse(parseData.payload));
console.log('----------解析出来的数据 结束分割线------------');