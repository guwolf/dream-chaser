
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

function render(element, container) {
    const dom = element.type === 'TEXT_ELEMENT' 
        ? document.createTextNode('') : document.createElement(element.type);

    Object.keys(element.props)
        .filter(isProperty)
        .forEach(propName => {
            dom.propName = element.props[propName]
        });

    element.props.children.forEach(child => {
        render(child, dom);
    });

    container.appendChild(dom);
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

// 执行计算下一个工作单元
function performUnitOfWork(nextUnitOfWork) {

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

