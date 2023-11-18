// converter.js
import {
    calculateUTF16asUTF8,
    encodeUTF16toUTF8,
    decodeUTF8toUTF16,
  } from 'utfx';
   
  // 字符串<-->二进制转换器
  export default class BSConverter {
   
    _stringSource(s) {
      let i = 0;
      return () => i < s.length ? s.charCodeAt(i++) : null;
    }
   
    // 计算字符串字节长度
    getStrLength(str) {
      const strCodes = this._stringSource(str);
      return calculateUTF16asUTF8(strCodes)[1];
    }
   
    str2bin(view, offset = 0, str, endianness) {
      const length = this.getStrLength(str);
      encodeUTF16toUTF8(this._stringSource(str), (b) => view.setUint8(offset++, b, endianness));
   
      return { view, length };
    }
   
    bin2str(view, offset = 0, byteLength, endianness) {
      const end = offset + byteLength;
      // utfx在处理到错误数据会停止，采用递归方式继续处理，异常数据使用42（*）填充
      const handler = () => {
        const result = [];
        let extra = '';
        try {
          decodeUTF8toUTF16(
            () => offset < end ? view.getUint8(offset++, endianness) : null,
            (char) => result.push(char)
          );
        } catch (e) {
          // 异常数据使用42（*）填充
          result.push(42);
          extra = handler();
        }
        // 根据字符编码获取字符，进行字符拼接
        return result.reduce((prev, next) => prev + String.fromCharCode(next), '') + extra;
      };
   
      return handler();
    }
  }
  