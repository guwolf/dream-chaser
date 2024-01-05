
function createElement(type, props, ...children) {
    return {
        type,
        props: {
            ...props,
            children: children.map(child => {
                typeof child === 'object' 
                ? child 
                : createTextElement(child)
            }),
        },
    }
}

function createTextElement(text) {
    return {
        type: 'TEXT_ELEMENT',
        props: {
            nodeValue: text,
            children: [],
        }
    }
}

function createDom(fiber) {

}

function render(element, container) {
    nextUnitOfWork = {
        dom: container,
        props: {
            children: [element]
        }
    }

    const dom = element.type === 'TEXT_ELEMENT' 
        ? document.createTextNode('') 
        : document.createElement(element.type);

    Object.keys(element.props)
        .filter(key => key !== 'children')
        .forEach(name => {
            dom[name] = element.props[name];
        });

    element.props.children.forEach(child => {
        render(child, dom);
    });

    container.appendChild(dom);
}

let nextUnitOfWork = null;

function workLoop(deadline) {
    let shouldYield = false;
    while(nextUnitOfWork && !shouldYield) {
        nextUnitOfWork = performUnitOfWork(
            nextUnitOfWork
        );
        shouldYield = deadline.timeRemaining() < 1;
    }
    requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);

function performUnitOfWork(fiber) {
    // TODO add dom node
    // TODO create new fibers
    // TODO return next unit of work
    if(!fiber.dom) {
        fiber.dom = createDom(fiber);
    }

    if(fiber.parent) {
        fiber.parent.dom.appendChild(fiber.dom);
    }

    const elements = fiber.props.children;
    let index = 0, prevSibling = null;

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

        prevSibling = newFiber;
        index++;
    }

    // 遍历规则 子 -> 兄弟 -> 叔叔
    if(fiber.child) {
        return fiber.child;
    }

    let nextFiber = fiber;
    while(nextFiber) {
        if(nextFiber.sibling) {
            return nextFiber.sibling
        }
        nextFiber = nextFiber.parent;
    }
}

const Didact = {
    createElement,
    render,
}

element = Didact.createElement(
    'div',
    { id: 'foo' },
    Didact.createElement(
        'a',
        null,
        'bar'
    ),
    Didact.createElement('b'),
);

/** @jsx Didact.createElement */
element = (
    <div id='foo'>
        <a>bar</a>
        <b />
    </div>
);

const container = document.getElementById('root');
Didact.render(element, container);