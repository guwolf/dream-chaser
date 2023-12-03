const Unicode = {
    UTF8Schema: [
        {
            unicodeMin: 0x000000,
            unicodeMax: 0x00007F,
            // 0xxx xxxx
            utf8Format: 0b00000000,
        },
        {
            unicodeMin: 0x000080,
            unicodeMax: 0x0007FF,
            // 110x xxxx 10xx xxxx
            utf8Format: 0b1100000010000000,
        },
        {
            unicodeMin: 0x000800,
            unicodeMax: 0x00FFFF,
            // 1110 xxxx 10xx xxxx 10xx xxxx
            utf8Format: 0b111000001000000010000000,
        },
        {
            unicodeMin: 0x010000,
            unicodeMax: 0x10FFFF,
            // 1111 0xxx 10xx xxxx 10xx xxxx 10xx xxxx，
            utf8Format: 0b11110000100000001000000010000000,
        }
    ],
    UTF16Schema: [
        {
            unicodeMin: 0x000000,
            unicodeMax: 0x00FFFF,
        },
        {
            unicodeMin: 0x010000,
            unicodeMax: 0x10FFFF,
            // 1101 10xx xxxx xxxx
            highProxy: 0b1101100000000000,
            // 1101 11xx xxxx xxxx
            lowProxy: 0b1101110000000000,
        }
    ],
 
    // Unicode编码值 -> UTF-8编码值
    encodeUTF8(unicode) {
        let utf8code = 0, schema;
        if(unicode <= this.UTF8Schema[0].unicodeMax && unicode >= this.UTF8Schema[0].unicodeMin) {
            utf8code = unicode;
        }
        else if(unicode <= this.UTF8Schema[1].unicodeMax) {
            schema = this.UTF8Schema[1];
            const high5bits = unicode >>> 6 & 0x001F;
            const low6bits = unicode & 0x003F;
            // 位运算符优先级：非~ -> 左移<<、右移>>、无符号右移>>>  -> 与& -> 异或^ -> 或|
            utf8code = schema.utf8Format | high5bits << 8 | low6bits;
        }
        else if(unicode <= this.UTF8Schema[2].unicodeMax) {
            schema = this.UTF8Schema[2];
            const high4bits = unicode >>> 12 & 0x000F;
            const mid6bits = unicode >>> 6 & 0x003F;
            const low6bits = unicode & 0x003F;
            utf8code = schema.utf8Format | high4bits << 16 | mid6bits << 8 | low6bits;
        }
        else if(unicode <= this.UTF8Schema[3].unicodeMax) {
            schema = this.UTF8Schema[3];
            const high3bits = unicode >>> 18 & 0x000007;
            const mid6bits = unicode >>> 12 & 0x00003F;
            const next6bits = unicode >>> 6 & 0x00003F;
            const low6bits = unicode & 0x00003F;
            utf8code = (schema.utf8Format | high3bits << 24 | mid6bits << 16 | next6bits << 8 | low6bits) >>> 0;
        }
        else {
            console.error('Unicode编码超出0x00000000~0x0010FFFF范围，转换UTF-8失败')
        }
        return utf8code;
    },
    // UTF-8编码值 -> Unicode编码值
    decodeUTF8(utf8code) {
        let utf8Str = utf8code.toString(2), unicode = 0;
        const byteLength = Math.ceil(utf8Str.length / 8);
        if(byteLength === 1) {
            unicode = utf8code & 0x7F;
        } else if(byteLength === 2){
            const start = utf8code >>> 8 & 0x001F;
            const end = utf8code & 0x003F;
            unicode = start << 6 | end;
        } else if(byteLength === 3) {
            const start = utf8code >>> 16 & 0x00000F;
            const mid = utf8code >>> 8 & 0x00003F;
            const end = utf8code & 0x00003F;
            unicode = start << 12 | mid << 6 | end;
        } else if(byteLength === 4) {
            const start = utf8code >>> 24 & 0x00000007;
            const mid = utf8code >>> 16 & 0x0000003F;
            const next = utf8code >>> 8 & 0x0000003F;
            const end = utf8code & 0x0000003F;
            unicode = (start << 18 | mid << 12 | next << 6 | end) >>> 0;
        } else {
            console.error('UTF-8编码超出范围，转换失败');
        }
        return unicode;
    },
 
    // Unicode编码值 -> UTF-16编码值
    encodeUTF16(unicode) {
        let utf16code = 0;
        if(unicode <= this.UTF16Schema[0].unicodeMax && unicode >= this.UTF16Schema[0].unicodeMin) {
            utf16code = unicode;
        } else if(unicode <= this.UTF16Schema[1].unicodeMax){
            const schema = this.UTF16Schema[1];
            // 减去0x010000，得到0x000000~0x0FFFFF的数字
            const diffCode = unicode - schema.unicodeMin;
            // 取diffCode的高10位
            const high10bits = diffCode >>> 10 & 0x0003FF;
            // 取diffCode的低10位
            const low10bits = diffCode & 0x0003FF;
            // 将高10位拼接高位代理，得到高位的2字节
            const high2bytes = schema.highProxy | high10bits;
            // 将低10位拼接低位代理，得到低位的2字节
            const low2bytes = schema.lowProxy | low10bits;
            utf16code = (high2bytes << 16 >>> 0 | low2bytes) >>> 0;
        } else {
            console.error('Unicode编码超出0x00000000~0x0010FFFF范围，转换UTF-16失败')
        }
        return utf16code;
    },
    // UTF-16编码值 -> Unicode编码值
    decodeUTF16(utf16code) {
        let unicode = 0;
        if(utf16code <= this.UTF16Schema[0].unicodeMax && utf16code >= this.UTF16Schema[0].unicodeMin) {
            unicode = utf16code;
        } else {
            const schema = this.UTF16Schema[1];
            // 取高位的2字节
            const high2bytes = utf16code >>> 16 & 0xFFFF;
            // 取低位的2字节
            const low2bytes = utf16code & 0xFFFF;
            // 取高位的10个bits
            const high10bits = high2bytes & 0x03FF;
            // 取低位的10个bits
            const low10bits = low2bytes & 0x03FF;
            unicode = ((high10bits << 10 | low10bits) + schema.unicodeMin) >>> 0;
        }
        return unicode;
    }
}

export default Unicode;