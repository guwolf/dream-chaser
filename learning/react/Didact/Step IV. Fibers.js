
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

function render(element, container) {
    nextUnitOfWork = {
        dom: container,
        props: {
            children: [ element ]
        },
    };
}

// 将工作拆分成工作单元，在有限时间计算
let nextUnitOfWork = null;

function workLoop(deadline) {
    let shouldYield = false;
    while(nextUnitOfWork && !shouldYield) {
        nextUnitOfWork = performUnitOfWork(
            nextUnitOfWork
        );
        shouldYield = deadline.timeRemaining() < 1
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
    // 直接将DOM appendChild会让用户看到不完整的UI
    if(fiber.parent) {
        fiber.parent.dom.appendChild(fiber.dom);
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

