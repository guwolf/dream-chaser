import { element, func } from "prop-types";

function MyButton() {
    return (
        <button>I'm a button</button>
    );
}

function Profile() {

    retrun (
        <img
            src='https://i.imgur.com/MK3eW3As.jpg'
            alt='Katherine Johnson'
        />
    );
}

React.createElement(
    'img',
    {
        'src': 'https://i.imgur.com/MK3eW3As.jpg',
        'atl': 'Katherine Johnson'
    },
    null,
);

element = {
    type: 'img',
    props: {
        src: 'https://i.imgur.com/MK3eW3As.jpg',
        alt: 'Katherine Johnson',
        children: null
    }
};

export function Gallery() {
    React.createElement(
        'section',
        null,
        React.createElement(
            'h1',
            null,
            'Amazing scientists'
        ),
        React.createElement(
            Profile,
            null
        ),
        React.createElement(
            Profile,
            null
        ),
        React.createElement(
            Profile,
            null
        ),
    );

    return (
        <section>
            <h1>Amazing scientists</h1>
            <Profile />
            <Profile />
            <Profile />
        </section>
    );
}

const person = {
    name: 'Gregorio Y. Zara',
    theme: {
      backgroundColor: 'black',
      color: 'pink'
    }
  };
  
export default function TodoList() {
    React.createElement(
        'div',
        {
            style: person.theme,
        },
        React.createElement(
            'img',
            {
                className: 'avatar',
                src: 'https://i.imgur.com/7vQD0fPs.jpg',
                alt: 'Gregorio Y. Zara'
            }
        ),
        React.createElement(
            'ul',
            null,
            React.createElement(
                'li',
                null,
                'Improve the videophone',
            ),
            React.createElement(
                'li',
                null,
                'Prepare aeronautics lectures',
            ),
            React.createElement(
                'li',
                null,
                'Work on the alcohol-fuelled engine',
            ),
        )
    );

    element = {
        type: 'div',
        props: {
            style: person.theme,
            children: [
                {
                    type: 'img',
                    props: {
                        className: 'avatar',
                        src: 'https://i.imgur.com/7vQD0fPs.jpg',
                        alt: 'Gregorio Y. Zara'
                    },
                },
                {
                    type: 'ul',
                    props: {
                        children: [
                            {
                                type: 'li',
                                props: {
                                    children: [
                                        'Prepare aeronautics lectures'
                                    ]
                                }
                            },
                            {
                                type: 'li',
                                props: {
                                    children: [
                                        'Work on the alcohol-fuelled engine',
                                    ]
                                }
                            }
                        ]
                    }
                }
            ]
        }
    }

    return (
      <div style={person.theme}>
        <h1>{person.name}'s Todos</h1>
        <img
          className="avatar"
          src="https://i.imgur.com/7vQD0fPs.jpg"
          alt="Gregorio Y. Zara"
        />
        <ul>
          <li>Improve the videophone</li>
          <li>Prepare aeronautics lectures</li>
          <li>Work on the alcohol-fuelled engine</li>
        </ul>
      </div>
    );
  };


function getImageUrl(person, size = 's') {
    return (
        'https://i.imgur.com/' +
        person.imageId + 
        size + 
        '.jpg'
    );
}

function Profile() {
    React.createElement(
        Card,
        null,
        React.createElement(
            Avatar,
            {
                size: 100,
                person: {
                    name: 'Katsuko Saruhashi',
                    imageId: 'YfeOqp2'
                }
            }
        )
    );

    element = {
        type: Card,
        props: {
            children: [
                {
                    type: Avatar,
                    props: {
                        size: 100,
                        person: {
                            name: 'Katsuko Saruhashi',
                            imageId: 'YfeOqp2'
                        }
                    }
                }
            ]
        }
    }

    (
        <div className="card">
            <img 
                className="avatar"
                src='url'
                alt='Katsuko Saruhashi'
                width='100'
                height='100'
            />
        </div>
    )



    return (
        <Card>
            <Avatar 
                size={100}
                person={{
                    name: 'Katsuko Saruhashi',
                    imageId: 'YfeOqp2'
                }}
            />
        </Card>
    );
}


function Avatar({ person, size }) {

    React.createElement(
        'img',
        {
            className: 'avatar',
            src: getImageUrl(person),
            alt: person.name,
            width: size,
            height: size
        }
    );

    element = {
        type: 'img',
        props: {
            className: 'avatar',
            src: getImageUrl(person),
            alt: person.name,
            width: size,
            height: size
        }
    };

    return (
        <img 
            className="avatar"
            src={getImageUrl(person)}
            alt={person.name}
            width={size}
            height={size}
        />
    )
}

function Card({ children }) {

    React.createElement(
        'div',
        {
            className: 'card'
        },
        ...children
    )

    element = {
        type: 'div',
        props: {
            className: 'card',
            children
        }
    };

    return (
        <div
            className="card"
        >
            { children }
        </div>
    );
}

export function Button() {
    function handleClick() {
        alert('你点击了我')
    }

    return (
        <button onClick={handleClick}>
            点我
        </button>
    )
}