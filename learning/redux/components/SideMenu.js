import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class SideMenu extends PureComponent {
    // 1. 定义静态变量contextTypes声明context中状态对应的类型
    static contextTypes = {
        lang: PropTypes.string,
    }

    constructor(props) {
        super(props);
    }

    // 2. 通过this.context取出context
    render() {
        return (
            <div lang={this.context.lang}>
                
            </div>
        )
    }
}