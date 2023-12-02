const compareFn = (a, b) => {
    if(a < b) {
        return -1
    } else if(a > b) {
        return 1;
    } else {
        return 0;
    }
}
 
compareFn.LESS_THAN = -1;
compareFn.MORE_THAN = 1;
compareFn.EQ = 0;
 
export class Heap {
    constructor(compare = compareFn) {
        this.items = [];
        this.compare = compare;
    }
 
    insert(item) {
        if(item) {
            this.items.push(item);
            this.shiftUp(this.items.length - 1)
        }
    }
 
    extract() {
        if(this.isEmpty()) {
            return undefined;
        }
        const size = this.size();
        if(size === 1) {
            return this.items.shift();
        }
        const item = this.items[0];
        this.items[0] = this.items.pop();
        this.shiftDown(0);
        return item;
    }
 
    isEmpty() {
        return this.items.length === 0;
    }
 
    size() {
        return this.items.length;
    }
 
    min() {
        return this.items[0];
    }
 
    max() {
        return this.items[0];
    }
 
    swap(array, indexA, indexB) {
        const temp = array[indexA];
        array[indexA] = array[indexB];
        array[indexB] = temp;
    }
 
    getParentIndex(index) {
        return Math.floor((index - 1) / 2);
    }
 
    getLeftIndex(index) {
        return 2 * index + 1;
    }
 
    getRightIndex(index) {
        return 2 * index + 2;
    }
 
    toString() {
        return this.items.toString();
    }
}
 
class MaxHeap extends Heap {
    constructor(compareFn) {
        super(compareFn);
    }
 
    shiftUp(index) {
        let parent = this.getParentIndex(index);
        while(index > 0 && this.compare(this.items[index], this.items[parent]) === compareFn.MORE_THAN) {
             this.swap(this.items, index, parent);
             index = parent;
             parent = this.getParentIndex(index);
        }
    }
 
    shiftDown(index) {
        let element = index;
        const left = this.getLeftIndex(element);
        const right = this.getRightIndex(element);
        const size = this.size();
        if(left < size && right < size) {
            const leftCompareRes = this.compare(this.items[element], this.items[left]);
            const rightCompareRes = this.compare(this.items[element], this.items[right]);
            if(leftCompareRes === compareFn.LESS_THAN && rightCompareRes === compareFn.LESS_THAN) {
                if(this.compare(this.items[left], this.items[right]) === compareFn.MORE_THAN) {
                    element = left;
                } else {
                    element = right;
                }
            } else if(leftCompareRes === compareFn.LESS_THAN) {
                element = left;
            } else if(rightCompareRes === compareFn.LESS_THAN) {
                element = right;
            }
        } else if(left < size) {
            if(this.compare(this.items[element], this.items[left]) === compareFn.LESS_THAN) {
                element = left;
            }
        } else if(right < size) {
            if(this.compare(this.items[element], this.items[right]) === compareFn.LESS_THAN) {
                element = right;
            }
        }
        if(index !== element) {
            this.swap(this.items, index, element);
            this.shiftDown(element);
        }
    }
}
 
class MinHeap extends Heap {
    constructor() {
        super();
    }
 
    shiftUp(index) {
        const parent = this.getParentIndex(index);
        if(index > 0 && this.compare(this.items[index], this.items[parent]) === compareFn.LESS_THAN) {
            this.swap(this.items, index, parent);
            index = parent;
            this.shiftUp(index);
        }
    }
 
    shiftDown(index) {
        let element = index;
        const left = this.getLeftIndex(element);
        const right = this.getRightIndex(element);
        const size = this.size();
        if(left < size && right < size) {
            const leftCompareRes = this.compare(this.items[element], this.items[left]);
            const rightCompareRes = this.compare(this.items[element], this.items[right]);
            if(leftCompareRes === compareFn.MORE_THAN && rightCompareRes === compareFn.MORE_THAN) {
                if(this.compare(this.items[left], this.items[right]) === compareFn.LESS_THAN) {
                    element = left;
                } else {
                    element = right;
                }
            } else if(leftCompareRes === compareFn.MORE_THAN) {
                element = left;
            } else if(rightCompareRes === compareFn.MORE_THAN) {
                element = right;
            }
        } else if(left < size) {
            if(this.compare(this.items[element], this.items[left]) === compareFn.MORE_THAN) {
                element = left;
            }
        } else if(right < size) {
            if(this.compare(this.items[element], this.items[right]) === compareFn.MORE_THAN) {
                element = right;
            }
        }
        if(index !== element) {
            this.swap(this.items, index, element);
            this.shiftDown(element);
        }
    }
}
 
const maxHp = new MaxHeap();
 
maxHp.insert(55);
maxHp.insert(45);
maxHp.insert(35);
maxHp.insert(25);
maxHp.insert(15);
maxHp.insert(10);
maxHp.insert(20);
maxHp.insert(30);
maxHp.insert(40);
maxHp.insert(50);
maxHp.insert(60);
maxHp.insert(70);
maxHp.insert(80);
 
const minHp = new MinHeap();
 
minHp.insert(55);
minHp.insert(45);
minHp.insert(35);
minHp.insert(25);
minHp.insert(15);
minHp.insert(10);
minHp.insert(20);
minHp.insert(30);
minHp.insert(40);
minHp.insert(50);
minHp.insert(60);
minHp.insert(70);
minHp.insert(80);