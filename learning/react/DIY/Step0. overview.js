const element = <h1 title='foo'>Hello</h1>;
// =>
element = React.createElement(
    'h1',
    { title: 'foo' },
    'Hello'
);

// =>
element = {
    type: 'h1',
    props: {
        title: 'foo',
        children: 'Hello',
    },
};

const container = document.getElementById('root');

ReactDOM.render(element, container);
// 经过以下步骤
let node = document.createElement(element.type);
node.title = element.props.title;

let textNode = document.createTextNode('');
textNode.nodeValue = element.props.children;

node.appendChild(textNode);

container.appendChild(node);