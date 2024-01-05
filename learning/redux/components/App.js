import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import SideMenu from './SideMenu';
import Content from './Context';

class App extends PureComponent {
    // 1. 定义静态变量childContextTypes声明context中状态对应的类型
    static childContextTypes = {
        lang: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {
            lang: 'zh_CN',
        };
    }

    // 2. 通过getChildContext返回值设置context
    getChildContext() {
        return {
            lang: this.state.lang,
        };
    }

    render() {
        return (
            <div>
                <SideMenu />
                <Content />
            </div>
        );
    }
}

