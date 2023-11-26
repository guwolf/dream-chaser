class Potion {
    // 初始化药水数量
    constructor(potionNum) {
        // 药水数量
        this.potionNum = potionNum;
        // 已贴标签的药水列表
        this.labeledPotionList = [];
        // 已贴标签装混合液瓶子列表
        this.labledBottleList = [];
        // 药水和装混合液瓶子的的关联（每个瓶子装了哪些药水）
        this.mixedLiquidList = new Map();
        // 记录投喂的小白鼠
        this.mouseList = {};
        this.deadMouseList = [];
        // 实验结果
        this.result = {};
    }
 
    /**
     * Step 1：对药水进行贴标签（编号）
     * 第1瓶药水：1
     * 第2瓶药水：2
     * ......
     * 第N瓶药水：N
     */
    labelPotion() {
        for(let i = 1; i <= this.potionNum; i++) {
            this.labeledPotionList.push(i);
        }
    }
 
    /**
     * Step 2：对混合液空瓶子贴标签（编号）
     * 第1个混合液空瓶子：0b00000001
     * 第2个混合液空瓶子：0b00000010
     * 第3个混合液空瓶子：0b00000100
     * ......
     */
    labelBottle() {
        const potionNum = this.labeledPotionList.length;
        // 2^药水数量 > potionNum
        const bottleNum = potionNum.toString(2).length;
        for(let i = 1; i <= bottleNum; i++) {
            this.labledBottleList.push(0x01 << (i-1));
        }
    }
 
    // Step 3：制作混合液：将药水按规则倒入装混合液的瓶子中
    makeMixedLiquid() {
        for(let i = 0; i < this.labledBottleList.length; i++) {
            // 遍历装混合液的空瓶子
            const bottle = this.labledBottleList[i];
            const pouredPotionList = []
            for(let j = 0; j < this.labeledPotionList.length; j++) {
                // 遍历药水
                const potion = this.labeledPotionList[j];
                // 药水编号的二进制位和空瓶子编号的二进制位进行位与，不等于0就倒入该bottle瓶子中
                if(potion & bottle) {
                    pouredPotionList.push(potion);
                }
            }
            // 关联瓶子和倒入哪些药水
            this.mixedLiquidList.set(bottle, pouredPotionList);
        }
   }
 
   // Step 4：投喂小白鼠混合液（1只小白鼠投喂1瓶混合液）
   feedMouses() {
        let mouse = 1; // 第几只小白鼠
        for(const [ bottle ] of this.mixedLiquidList) {
            this.mouseList[mouse] = {
                alive: true, // 刚投喂时标记活的
                bottle, // 标记投喂哪一瓶混合液
            };
            mouse++;
        }
        // 记录使用小白鼠数量
        this.mouseList.length = mouse - 1; // 多加了1次，减去1
   }
 
    // Step 5：记录实验结果（死亡的小白鼠）
    recordDeadMouse = (mouses) => {
        if(!Array.isArray(mouses)) {
            mouses = [ mouses ];
        }
        for(let i = 0; i < mouses.length; i++) {
            this.mouseList[mouses[i]].alive = false;
        }
        this.deadMouseList = [];
        Object.keys(this.mouseList).forEach(mouse => {
           if(mouse !== 'length' && !this.mouseList[mouse].alive) {
                this.deadMouseList.push(mouse);
           } 
        });
    }
 
    // Step 6：得出结论：哪瓶药水有毒，共用了几只小白鼠
    conclusion = () => {
        // mouseNum-哪一瓶药水有毒，初始值设为0；mouseNum-记录共用多少只老鼠，初始值为0
        let potion = 0, mouseNum = 0;
        Object.keys(this.mouseList).forEach((mouse) => {
            if(mouse !== 'length') {
                if(!this.mouseList[mouse].alive) {
                    // 对有毒混合液瓶子编号进行位或操作，即得到有毒药水的编号
                    potion |= this.mouseList[mouse].bottle;
                }
            } else {
                mouseNum = this.mouseList.length
            }
        });
        this.result = { 
            potion,
            mouseNum
        };
    }
 
    initTask() {
        this.clear();
        this.labelPotion();
        this.labelBottle();
        this.makeMixedLiquid();
        this.feedMouses();
        return this;
    }
 
    getPotionNum() {
        return this.potionNum;
    }
 
    setPotionNum(num) {
        this.potionNum = num;
    }
 
    printList(list, bits) {
        for(let i = 0; i < list.length; i++) {
            const item = list[i];
            console.log(`${item}：`, `0b${this.padding0(item.toString(2), bits)}`);
        }
    }
 
    printLabeledPotionList() {
        console.log('药水编号：')
        const bits = this.potionNum.toString(2).length;
        this.printList(this.labeledPotionList, bits);
    }
 
    printLabledBottleList() {
        console.log('混合液瓶子编号：')
        const bits = this.potionNum.toString(2).length;
        this.printList(this.labledBottleList, bits);
    }
 
    padding0(str, length) {
        while(str.length < length) {
            str = '0' + str;
        }
        return str;
    }
 
    clear() {
        this.labeledPotionList = [];
        this.labledBottleList = [];
        this.mixedLiquidList = new Map();
        this.mouseList = {};
        this.result = {};
    }
}
 
