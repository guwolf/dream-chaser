import dicts from "./dicts";
import Unicode from "./unicode";

export default Base64 = {
    // 普通字符串转Base64字符串（UTF-8）
    encode(srcStr) {
        let base64Str = '', byteArr = [];
        // I：字符串 -> UTF-8
        for(let i = 0; i < srcStr.length; i++) {
            // Step 1: String.prototype.codePointAt获取Unicode编码值
            let unicode = srcStr.codePointAt(i);
            if(unicode > 0x00FFFF) {
                // 大于0x00FFFF，i++，因为codePointAt是按UTF-16码元读取
                i++;
            }
            // Step 2: Unicode编码值 -> UTF-8编码值
            let utf8code = Unicode.encodeUTF8(unicode);
            // Step 3：存储到数组中（当然也可以使用其他方式保存）
            const utf8codeSplit = [];
            while(utf8code) {
                utf8codeSplit.push(utf8code & 0x000000FF);
                utf8code = utf8code >>> 8;
            }
            // 大端字节序
            byteArr = byteArr.concat(utf8codeSplit.reverse());
        }
        // II：UTF-8 -> Base64
        for(let i = 0; i < byteArr.length; i+=3) {
            // Step 1：获取连续3个字节的数据
            const byte_1 = byteArr[i];
            const byte_2 = byteArr[i+1];
            const byte_3 = byteArr[i+2];
            // Step 2：3个字节，拆分成4个字符，3*8 -> 4*6，高2位补0
            let code_1 = byte_1 >>> 2, code_2 = 0, code_3 = 0, code_4 = 0;
            if(byte_2 && byte_3) {
                code_2 = (byte_1 & 0x03) << 4 | byte_2 >>> 4;
                code_3 = (byte_2 & 0x0F) << 2 | byte_3 >>> 6;
                code_4 = byte_3 & 0x3f;
            } else if(byte_2 && !byte_3) {
                code_2 = (byte_1 & 0x03) << 4 | byte_2 >>> 4;
                code_3 = (byte_2 & 0x0F) << 2;
                code_4 = 64;
            } else {
                code_2 = (byte_1 & 0x03) << 4;
                code_3 = 64;
                code_4 = 64;
            }
            // Step 3：将转码后的字符串进行拼接
            const char_1 = dicts[code_1];
            const char_2 = dicts[code_2]
            const char_3 = dicts[code_3]
            const char_4 = dicts[code_4];
            base64Str += char_1 + char_2 + char_3 + char_4;
        }
        return base64Str;
    },
 
    // Base64字符串转普通字符串
    decode(base64Str) {
        let srcStr = '', byteArr = [];
        // I：Base64 -> UTF-8
        for(let i = 0; i < base64Str.length; i += 4) {
            // Step 1：每次取出4个Base64字符
            const char_1 = base64Str[i];
            const char_2 = base64Str[i+1];
            const char_3 = base64Str[i+2];
            const char_4 = base64Str[i+3];
            // Step 2：4个字节，去掉各字节高2位0，拼接成3个字节，4*6 -> 3*8
            const code_1 = dicts.indexOf(char_1);
            const code_2 = dicts.indexOf(char_2);
            const code_3 = dicts.indexOf(char_3); // 64时，为padding =
            const code_4 = dicts.indexOf(char_4); // 64时，为padding =
            const byte_1 = (code_1 << 2 | (code_2 >>> 4 & 0x03)) & 0xFF;
            const byte_2 = (code_2 << 4 | (code_3 >>> 2 & 0x0F)) & 0xFF;
            const byte_3 = (code_3 << 6 | (code_4 & 0x3F)) & 0xFF;
            // Step 3：依次push到字节数组中
            if(code_3 !== 64 && code_4 !== 64) {
                byteArr.push(byte_1);
                byteArr.push(byte_2);
                byteArr.push(byte_3);
            } else if(code_3 !== 64 && code_4 === 64) {
                byteArr.push(byte_1);
                byteArr.push(byte_2);
            } else {
                byteArr.push(byte_1);
            }
        }
        // II：UTF-8 -> 字符串
        for(let j = 0; j < byteArr.length; j += 1) {
            let utf8code = 0, unicode = 0;
            // Step 1：遍历数组，按UTF-8规则，取出1个或2个或3个或4个字节，拼接成完整UTF-8编码值
            const byte_1 = byteArr[j];
            if(byte_1 > 0x7F) {
                const byte_2 = byteArr[j+1];
                const byte_3 = byteArr[j+2];
                const byte_4 = byteArr[j+3];
                if(byte_1 >>> 5 === 0b110) {
                    utf8code = byte_1 << 8 | byte_2;
                    j += 1;
                } else if(byte_1 >>> 4  === 0b1110) {
                    utf8code = (byte_1 << 16 | byte_2 << 8 | byte_3) >>> 0;
                    j += 2;
                } else if(byte_1 >>> 3 === 0b11110) {
                    utf8code = (byte_1 << 24 | byte_2 << 16 | byte_3 << 8 | byte_4) >>> 0;
                    j += 3;
                }
            } else {
                utf8code = byte_1;
            }
            // Step 2: Unicode编码值 -> UTF-8编码值
            unicode = Unicode.decodeUTF8(utf8code);
            // Step 3: String.fromCodePoint获取unicode对应的字符
            srcStr += String.fromCodePoint(unicode);
        }
        return srcStr;
    }
};