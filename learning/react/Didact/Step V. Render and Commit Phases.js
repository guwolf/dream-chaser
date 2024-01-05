
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

function isProperty(propName) {
    return propName !== 'children';
}

function createDom(fiber) {

}

// 计算完所有节点，再以递归的方式将内存中节点append到DOM中
function commitRoot() {
    commitWork(wipRoot.child);
    wipRoot = null;
}

// 有个问题是每次render后再提交，都是重新替换整个DOM树，有点多此一举
function commitWork(fiber) {
    if(!fiber) {
        return;
    }
    const domParent = fiber.parent.dom;
    domParent.appendChild(fiber.dom);
    commitWork(fiber.child);
    commitWork(fiber.sibling);
}

function render(element, container) {
    wipRoot = {
        dom: container,
        props: {
            children: [ element ]
        },
    };
    // 调用ReactDOM.render生成Fiber根节点
    nextUnitOfWork = wipRoot;
}

// 将工作拆分成工作单元（当前在执行的Fiber节点），在有限时间计算
let nextUnitOfWork = null;
// 在进程中工作的Fiber根节点
let wipRoot = null;

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
    if(!fiber.dom) {
        fiber.dom = createDom(fiber)
    }

    // TODO create new fibers
    const elements = fiber.props.children;
    let index = 0;
    let prevSibling = null;

    while(index < elements.length) {
        const element = elements[index];

        const newFiber = {
            type: element.type,
            props: element.props,
            parent: fiber,
            dom: null,
        };

        if(index === 0) {
            fiber.child = newFiber;
        } else {
            prevSibling.sibling = newFiber;
        }
        // 用来连接下一个同胞Fiber节点
        prevSibling = newFiber;
        index++;
    }

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

const Didact = {
    createElement,
    render
}

// const element = Didact.createElement(
//     'div',
//     {
//         id: 'foo',
//     },
//     Didact.createElement(
//         'a',
//         null,
//         'bar'
//     ),
//     Didact.createElement(
//         'b',
//     )
// );

/** @jsx Didact.createElement */
const element = (
    <div id="foo">
        <a>bar</a>
        <b />
    </div>
);

const container = document.getElementById('root');

Didact.render(element, container);

