
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

