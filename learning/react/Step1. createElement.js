const element = (
    <div id='foo'>
        <a>bar</a>
        <b />
    </div>
);

element = React.createElement(
    'div',
    { id: 'foo' },
    React.createElement(
        'a',
        null,
        'bar'
    ),
    React.createElement('b'),
);

const container = document.getElementById('root');

ReactDOM.render(element, container);

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

const Didact = {
    createElement,
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