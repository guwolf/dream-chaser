
import React from 'react';
import { createRoot } from 'react-dom/client';

import { Provider, connect } from './react-redux';
import createStore from './redux';

import Content from './components/Content';

export const reducer = (state, action) => {
    if(!state) {
        return {
            menu: {
                text: 'menu',
                color: 'red',
            },
        }
    }

    switch(action.type) {
        case 'UPDATE_MENU_TEXT':
            return {
                ...state,
                menu: {
                    ...state.menu,
                    text: action.text,
                }
            };
        case 'UPDATE_MENU_COLOR':
            return {
                ...state,
                menu: {
                    ...state.menu,
                    color: action.color,
                }
            };
        default:
            return state;
    }
}

// Demo 1
const store = createStore(reducer);

store.subscribe(() => console.log('demo') );

const action = {
    type: 'UPDATE_MENU_COLOR',
    color: 'blue'
};

store.dispatch(action);

// 打印当前状态
console.dir(store.getState());

const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);




import React from 'react';

class Content extends PureComponent {
    // 2. 通过this.context取出context
    render() {
        return (
            <div lang={this.props.lang} onClick={() => this.props.onChangeLang('zh_CN')}>

            </div>
        )
    }
}

// state是从store取出来的，props是传给高阶组件Connect的props
const mapStateToProps = (state, props) => {
    return {
        lang: state.lang
    };
}

// dispatch是从store取出来的，props是传给高阶组件Connect的props
const mapDispatchToProps = (dispatch, props) => {
    return {
        onChangeLang: (lang) => {
            dispatch({ type: 'UPDATE_LANG', lang })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);
