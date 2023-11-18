// index.js
import codec from './codec';
 
export class Bson {
  constructor() {
    // 将codec相关函数挂载到Bson实例中
    this.codec = codec;
  }
 
  encode(data, schema, endianness, bufferLength) {
    // 判断schema的payload是否已设置length字段，否，则获取payload的长度
    if([null, undefined].includes(schema.payload.length)) {
      const length = this.codec.String.converter.getStrLength(data.payload);
      data.length = length;
      schema.payload.length = length;
    }
    // 计算数据总字节长度
    const byteLength = bufferLength ?? Object.keys(schema).reduce((total, item) => {
      return total + schema[item].length;
    }, 0);
 
    const buffer = new ArrayBuffer(byteLength);
    const dataView = new DataView(buffer);
    let offset = 0;
 
    Object.keys(schema).forEach(key => {
      const encoder = schema[key].encoder;
      const value = data[key];
      const length = schema[key].length;
      const curOffset = schema[key].offset;
      encoder.call(schema[key], dataView, curOffset ?? offset, value, endianness);
 
      if (curOffset) {
        offset = curOffset + length;
      } else {
        offset += length;
      }
    });
    return buffer;
  }
 
  decode(buffer, schema, endianness) {
    const dataView = new DataView(buffer);
    const data = {};
    let offset = 0;
 
    Object.keys(schema).forEach(key => {
      const decoder = schema[key].decoder;
      // 解析数据时，如果预先不知道payload长度时，这里从已解析的data.length读取
      if(key === 'payload' && [null, undefined].includes(schema[key].length)) {
        schema[key].length = data.length;
      }
      const length = schema[key].length;
      const curOffset = schema[key].offset;
 
      data[key] = decoder.call(schema[key], dataView, curOffset ?? offset, endianness);
 
      if (curOffset) {
        offset = curOffset + length;
      } else {
        offset += length;
      }
    });
 
    return data;
  }
}
 
export default new Bson();