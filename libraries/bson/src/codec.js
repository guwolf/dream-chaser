// codec.js
import BSConverter from './converter';
 
class Base {
  constructor(params = {}) {
    this.value = params.value;
    this._length = params.length;
    this._offset = params.offset;
  }
 
  set length(length) {
    this._length = length;
  }
 
  get length() {
    return this._length;
  }
 
  set offset(offset) {
    this._offset = offset;
  }
 
  get offset() {
    return this._offset;
  }
 
  get setter() {
    console.log('由子类实现');
    return '';
  }
 
  get getter() {
    console.log('由子类实现');
    return '';
  }
 
  encoder(dataView, offset, value, endianness = false) {
    dataView[this.setter](offset, value, endianness);
  }
 
  decoder(dataView, offset, endianness = false) {
    return dataView[this.getter](offset, endianness);
  }
}
 
// 8位有符号整数，长度1字节
class Int8 extends Base {
  get setter() {
    return 'setInt8';
  }
  get getter() {
    return 'getInt8';
  }
}
 
// 8位无符号整数，长度1字节
class Uint8 extends Base {
  get setter() {
    return 'setUint8';
  }
  get getter() {
    return 'getUint8';
  }
}
 
// 16位有符号整数，长度2字节
class Int16 extends Base {
  get setter() {
    return 'setInt16';
  }
  get getter() {
    return 'getInt16';
  }
}
 
// 16位无符号整数，长度2字节
class Uint16 extends Base {
  get setter() {
    return 'setUint16';
  }
  get getter() {
    return 'getUint16';
  }
}
 
// 32位有符号整数，长度4字节
class Int32 extends Base {
  get setter() {
    return 'setInt32';
  }
  get getter() {
    return 'getInt32';
  }
}
 
// 32位无符号整数，长度4字节
class Uint32 extends Base {
  get setter() {
    return 'setUint32';
  }
  get getter() {
    return 'getUint32';
  }
}
 
// 64位有符号整数，长度8字节
class BigInt64 extends Base {
  get setter() {
    return 'setBigInt64';
  }
  get getter() {
    return 'getBigInt64';
  }
}
 
// 64位无符号整数，长度8字节
class BigUint64 extends Base {
  get setter() {
    return 'setBigUint64';
  }
  get getter() {
    return 'getBigUint64';
  }
}
 
// 32位浮点数，长度4字节
class Float32 extends Base {
  get setter() {
    return 'setFloat32';
  }
  get getter() {
    return 'getFloat32';
  }
}
 
// 64位浮点数，长度8字节
class Float64 extends Base {
  get setter() {
    return 'setFloat64';
  }
  get getter() {
    return 'getFloat64';
  }
}
 
// 字符串单独实现
class String extends Base {
  constructor(params) {
    super(params);
  }
 
  encoder(dataView, offset, value, endianness) {
    const formatted = String.converter.str2bin(dataView, offset, value, endianness);
    return formatted.buffer;
  }
 
  decoder(dataView, offset, endianness) {
    // 从二进制数据解析字符串，必须知道字符串的长度，否则返回''
    const byteLength = this.length;
    if (byteLength) {
      return String.converter.bin2str(dataView, offset, byteLength, endianness);
    }
    return '';
  }
}
 
// 将BSConverter实例化对象作为String的静态属性
String.converter = new BSConverter();
 
const codec = {
  Int8,
  Uint8,
  Int16,
  Uint16,
  Int32,
  Uint32,
  BigInt64,
  BigUint64,
  Float32,
  Float64,
  String,
};
 
export default codec;