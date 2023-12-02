class Node {
    constructor(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }
}
 
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
 
export class BinarySearchTree {
    constructor(compare = compareFn) {
        this.compare = compare;
        this.root = null;
    }
    /**
     * @description: 
     * @param {*} key
     * @return {*}
     */
    insert(key) {
        const node = new Node(key);
        if(!this.root) {
            this.root = node;
            return true;
        } else {
            return this.insetNode(node, this.root)
        }
    }
    /**
     * @description: 
     * @param {*} node
     * @param {*} parent
     * @return {*}
     */    
    insetNode(node, parent) {
        const compareRes = this.compare(node.key, parent.key);
        if(compareRes === compareFn.LESS_THAN) {
            if(!parent.left) {
                parent.left = node;
                return true;
            } else {
                return this.insetNode(node, parent.left);
            }
        } else if(compareRes === compareFn.MORE_THAN) {
            if(!parent.right) {
                parent.right = node;
                return true;
            } else {
                return this.insetNode(node, parent.right);
            }
        } else {
            return false;
        }
    }
    /**
     * @description: 
     * @param {*} key
     * @return {*}
     */
    remove(key) {
        if(!this.root) {
            return null;
        }
        const node = this.root;
        if(this.compare(key, node.key) === compareFn.EQ) {
            this.root = null;
            return node;
        }
        const res = this.removeNode(key, node);
        return res.deletedNode;
    }
 
    removeNode(key, current) {
        const compareRes = this.compare(key, current.key);
        if(compareRes === compareFn.LESS_THAN) {
            if(!current.left) {
                return null;
            } else {
                const res = this.removeNode(key, current.left);
                if(res.needLinked) {
                    current.left = res.linkedNode;
                }                
                return {deletedNode: res.deletedNode };
            }
        } else if(compareRes === compareFn.MORE_THAN) {
            if(!current.right) {
                return null;
            } else {
                const res = this.removeNode(key, current.right);
                if(res.needLinked) {
                    current.right = res.linkedNode;
                }                
                return {deletedNode: res.deletedNode };
            }
        } else {
            const left = current.left;
            const right = current.right;
            if(!left && !right) {
                return {deletedNode: current, linkedNode: null, needLinked: true};
            } else if(left && !right) {
                return {deletedNode: current, linkedNode: left, needLinked: true};
            } else if(!left && right) {
                return {deletedNode: current, linkedNode: right, needLinked: true};
            } else {
                const tempNode = {...current};
                const minNode = this.findMinNode(right);
                current.key = minNode.key;
                const res = this.removeNode(minNode.key, right);
                if(res.needLinked) {
                    current.right = res.linkedNode;
                }
                return { deletedNode: tempNode };
            }
        }
    }
 
    deepth() {
        if(!this.root) {
            return null;
        }
        return this.searchDeepth(this.root);
    }
 
    searchDeepth(current) {
        if(!current.left && !current.right) {
            return 0;
        }
        if(current.left && !current.right) {
            return this.searchDeepth(current.left) + 1;
        } else if(!current.left && current.right) {
            return this.searchDeepth(current.right) + 1;
        } else if(current.left && current.right) {
            return Math.max(this.searchDeepth(current.left), this.searchDeepth(current.right)) + 1;
        }
    }
 
    find(key) {
        return this.findNode(key, this.root)
    }
 
    findNode(key, current) {
        if(!current) {
            return null;
        }
        const compareRes = this.compare(key, current.key);
        if(compareRes === compareFn.LESS_THAN) {
            return this.findNode(key, current.left);
        } else if(compareRes === compareFn.MORE_THAN) {
            return this.findNode(key, current.right);
        } else {
            return current;
        }
    }
 
    findMinNode(current) {
        if(!current){
            return null;
        }
        while(current.left) {
            current = current.left;
        }
        return current;
    }
 
    max() {
        if(!this.root) {
            return undefined;
        }
        let current = this.root;
        while(current.right) {
            current = current.right;
        }
        return current.key;
    }
 
    min() {
        if(!this.root) {
            return undefined;
        }
        let current = this.root;
        while(current.left) {
            current = current.left;
        }
        return current.key;
    }
 
    inorder() {
        const keys = [];
        this.inorderTraverse(this.root, keys);
        console.log(keys.toString());
    }
 
    inorderTraverse(current, keys) {
        if(!current) {
            return false;
        }
        this.inorderTraverse(current.left, keys);
        keys.push(current.key);
        this.inorderTraverse(current.right, keys);
    }
 
    preorder() {
        const keys = [];
        this.preorderTraverse(this.root, keys);
        console.log(keys.toString());
    }
 
    preorderTraverse(current, keys) {
        if(!current) {
            return false;
        }
        keys.push(current.key);
        this.preorderTraverse(current.left, keys);
        this.preorderTraverse(current.right, keys);
    }
 
    postorder() {
        const keys = [];
        this.postorderTraverse(this.root, keys);
        console.log(keys.toString());
    }
 
    postorderTraverse(current, keys) {
        if(!current) {
            return false;
        }
        this.postorderTraverse(current.left, keys);
        this.postorderTraverse(current.right, keys);
        keys.push(current.key);
    }
}
 
const bst = new BinarySearchTree();
 
bst.insert(200);
 
bst.insert(100);
bst.insert(300);
 
bst.insert(50);
bst.insert(150);
 
bst.insert(250);
bst.insert(350);
 
bst.insert(25);
bst.insert(75);
 
bst.insert(125);
bst.insert(175);
 
bst.insert(225);
bst.insert(275);
 
bst.insert(325);
bst.insert(375);
 
bst.postorder();
bst.preorder();
bst.inorder();
 
bst.deepth();
 
bst.remove(250);
 
bst.inorder();
bst.deepth();
 
bst.max();
bst.min();