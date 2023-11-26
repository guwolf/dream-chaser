class BitMask {
    constructor(mapData) {
        this.bits = 0;
        this.mapData = mapData;
    }
 
    add(bit) {
        this.bits |= this.mapData[bit];
    }
 
    delete(bit) {
        this.bits &= ~this.mapData[bit];
    }
 
    clear() {
        this.bits = 0;
    }
 
    has(bit) {
        return (this.bits & this.mapData[bit]) === this.mapData[bit];
    }
}

const permission = {
    create: 1 << 0, // 0b0001
    update: 1 << 1, // 0b0010
    read: 1 << 2, // 0b0100
    delete: 1 << 3, // 0b1000
};
 
const bm = new BitMask(permission);
 
console.log(`未添加create权限，权限状态为：${bm.has('create')}`);
bm.add('create');
console.log(`添加create权限后，权限状态为：${bm.has('create')}`);
 
console.log(`未添加update权限，权限状态为：${bm.has('update')}`);
bm.add('update');
console.log(`添加update权限后，权限状态为：${bm.has('update')}`);
 
bm.delete('update');
console.log(`删除update权限后，权限状态为：${bm.has('update')}`);
 
bm.clear();
console.log(`清除所有权限后，create权限状态为：${bm.has('create')}`);
console.log(`清除所有权限后，update权限状态为：${bm.has('update')}`);