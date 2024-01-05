
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

const Didact = {
    createElement,
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

ReactDOM.render(element, container);

// const node = document.createElement(element.type);
// node.title = element.props.title;

// const text = document.createTextNode('');
// text.nodeValue = element.props.children;

// node.appendChild(text);
// container.appendChild(node);