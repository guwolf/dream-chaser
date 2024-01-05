
function createElement(type, props, ...children) {
    return {
        type,
        props: {
            ...props,
            children: children.map(child => {
                typeof child === 'object' ? child : createTextElement(child)
            })
        }
    };
}

function createTextElement(text) {
    return {
        type: 'TEXT_ELEMENT',
        props: {
            nodeValue: text,
            children: []
        }
    }
}

function createDom(fiber) {
    const dom = fiber.type === 'TEXT_ELEMENT' 
        ? document.createTextNode('') : document.createElement(fiber.type);
    Object.keys(fiber.props)
        .filter(isProperty)
        .forEach(propName => {
            dom.propName = fiber.props[propName]
        });
    return dom;
}

const isEvent = key => key.startWith('on');
const isProperty = key => key !== 'children' && !isEvent(key);
const isNew = (prev, next) => key => prev[key] !== next[key];
const isGone = (prev, next) => key => !(key in next);

function updateDom(dom, prevProps, nextProps) {
    // Remove old or changed event listeners
    Object.keys(prevProps)
        .filter(isEvent)
        .filter(key => !(key in nextProps) || isNew(prevProps, nextProps)(key))
        .forEach(name => {
            const eventType = name.toLowerCase().substring(2);
            dom.removeEventListener(eventType, prevProps[name])
        });

    // Remove old properties
    Object.keys(prevProps)
        .filter(isProperty)
        .filter(isGone(prevProps, nextProps))
        .forEach(name => dom[name] = '');
    
    // Set new or changed properties
    Object.keys(nextProps)
        .filter(isProperty)
        .filter(isNew(prevProps, nextProps))
        .forEach(name => {
            dom[name] = nextProps[name];
        });

    // Add event listeners
    Object.keys(nextProps)
        .filter(isEvent)
        .filter(isNew(prevProps, nextProps))
        .forEach(name => {
            const eventType = name.toLowerCase().substring(2);
            dom.addEventListener(eventType,nextProps[name]);
        });
}

// 计算完所有节点，再以递归的方式将内存中节点append到DOM中
function commitRoot() {
    deletions.forEach(commitWork);
    commitWork(wipRoot.child);
    currentRoot = wipRoot;
    wipRoot = null;
}

// 有个问题是每次render后再提交，都是重新替换整个DOM树，有点多此一举
function commitWork(fiber) {
    if(!fiber) {
        return;
    }
    // 父节点可能是函数组件，没有dom，需要继承往上找parent
    let domParentFiber = fiber.parent;
    while(!domParentFiber.dom) {
        domParentFiber = domParentFiber.parent;
    }
    const domParent = domParentFiber.dom;

    if(fiber.effectTag === 'PLACEMENT'&&
        fiber.dom !== null
    ) {
        domParent.appendChild(fiber.dom);    
    } else if(fiber.effectTag === 'UPDATE' &&
        fiber.dom !== null
    ) {
        updateDom(
            fiber.dom,
            fiber.alternate.props,
            fiber.props,
        );
    } else if(fiber.effectTag === 'DELETION') {
        commitDeletion(fiber, domParent);
    }
    domParent.appendChild(fiber.dom);
    commitWork(fiber.child);
    commitWork(fiber.sibling);
}

function commitDeletion(fiber, domParent) {
    if(fiber.dom) {
        domParent.removeChild(fiber.dom);
    } else {
        commitDeletion(fiber.child, domParent);
    }
}

function render(element, container) {
    wipRoot = {
        dom: container,
        props: {
            children: [ element ]
        },
        alternate: currentRoot,
    };
    deletions = [];
    // 调用ReactDOM.render生成Fiber根节点
    nextUnitOfWork = wipRoot;
}

// 将工作拆分成工作单元（当前在执行的Fiber节点），在有限时间计算
let nextUnitOfWork = null;
// 当前DOM对应的Fiber根节点
let currentRoot = null;
// 在进程中工作的Fiber根节点
let wipRoot = null;
let deletions = null;

function workLoop(deadline) {
    let shouldYield = false;
    while(nextUnitOfWork && !shouldYield) {
        nextUnitOfWork = performUnitOfWork(
            nextUnitOfWork
        );
        shouldYield = deadline.timeRemaining() < 1
    }

    // 计算完所有节点，将Fiber树提交到DOM
    if(!nextUnitOfWork && wipRoot) {
        commitRoot();
    }

    requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);

// 执行计算下一个工作单元（1. 创建DOM节点 -> 2. 构建Fiber节点 -> 3. 返回下一个Fiber节点）
function performUnitOfWork(fiber) {
    // TODO add dom node
    const isFunctionComponent = fiber.type instanceof Function;
    if(isFunctionComponent) {
        updateFunctionComponent(fiber);
    } else {
        updateHostComponent(fiber);
    }

    // if(!fiber.dom) {
    //     fiber.dom = createDom(fiber)
    // }

    // // TODO create new fibers
    // const elements = fiber.props.children;
    // reconcileChildren(fiber, elements);

    // TODO return next unit of work（深度优先）
    // 1. 优先处理child节点
    if(fiber.child) {
        return fiber.child;
    }
    // 2. 没有child节点，则处理sibling节点
    let nextFiber = fiber;
    while(nextFiber) {
        if(nextFiber.sibling) {
            return nextFiber.sibling;
        }
        // 3. 没有sibling节点，往parent的sibling（即uncle）查找
        nextFiber = nextFiber.parent;
    }
}

// 运行函数获取children
function updateFunctionComponent(fiber) {
    const children = [ fiber.type(fiber.props) ];
    reconcileChildren(fiber, children);
}

function updateHostComponent(fiber) {
    if(!fiber.dom) {
        fiber.dom = createDom(fiber);
    }
    reconcileChildren(fiber, fiber.props.children);
}

function reconcileChildren(wipFiber, elements) {
    let index = 0;
    // 将老Fiber的child取出来，wipFiber和currentFiber之间进行比较
    let oldFiber = wipFiber.alternate && wipFiber.alternate.child;
    let prevSibling = null;

    while(
        index < elements.length || 
        oldFiber != null
    ) {
        const element = elements[index];
        const newFiber = null;

        // 两个同一位置的Fiber元素类型是一样
        const sameType = 
            oldFiber && 
            element && 
            element.type === oldFiber.type;
        // UPDATE：wipFiber和currentFiber一样
        if(sameType) {
            // TODO update the node
            newFiber = {
                type: oldFiber.type,
                props: element.props,
                dom: oldFiber.dom,
                parent: wipFiber,
                alternate: oldFiber,
                effectTag: 'UPDATE',
            }
        }
        // ADD：wipFiber有，但和currentFiber不一样
        if(element && !sameType) {
            // TODO add this node
            newFiber = {
                type: element.type,
                props: element.props,
                dom: null,
                parent: wipFiber,
                alternate: null,
                effectTag: 'PLACEMENT',
            }
        }
        // DELETE：wipFiber没，currentFiber有，则删除currentFiber
        if(oldFiber && !sameType) {
            // TODO delete the oldFiber's node
            oldFiber.effectTag = 'DELETION';
            deletions.push(oldFiber);
        }

        // 移到下currentFiber
        if(oldFiber) {
            oldFiber = oldFiber.sibling;
        }

        if(index === 0) {
            wipFiber.child = newFiber;
        } else {
            prevSibling.sibling = newFiber;
        }
        // 用来连接下一个同胞Fiber节点
        prevSibling = newFiber;
        index++;
    }
}

const Didact = {
    createElement,
    render
}

/** @jsx Didact.createElement */
function App(props) {
    return <h1>Hi {props.name}</h1>
}

// function App(props) {
//     return Didact.createElement(
//       "h1",
//       null,
//       "Hi ",
//       props.name
//     );
// }

const element = <App name='foo' />;
// const element = Didact.createElement(App, {
//     name: "foo",
// });
// const element = {
//     type: App,
//     props: {
//         name: 'foo'
//     }
// }
// 1. fiber没有DOM节点；2. children来自函数的返回值，而不是props.children。

const container = document.getElementById('root');

Didact.render(element, container);

