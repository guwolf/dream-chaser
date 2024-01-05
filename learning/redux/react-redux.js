import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class Provider extends PureComponent {
    // Provider的props仅含store和children
    static propTypes = {
        store: PropTypes.object,
        children: PropTypes.any,
    }

    static childContextTypes = {
        store: PropTypes.object,
    };

    // 用props中的store来设置context
    getChildContext() {
        return {
            store: this.props.store
        }
    }

    render() {
        return (
            <div>{this.props.children}</div>
        )
    }
}

export const connect = (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {

    class Connect extends PureComponent {
        static contextTypes = {
            store: PropTypes.object,
        };

        constructor(props) {
            super(props);
            this.state = {
                allProps: {}
            };
        }

        componentWillMount() {
            const { store } = this.context;
            this._updateProps();
            store.subscribe(() => this._updateProps());
        }

        _updateProps() {
            const { store } = this.context;
            const stateProps = mapStateToProps(store.getState(), this.props);
            const dispatchProps = mapDispatchToProps(store.dispatch, this.props);
            this.setState({
                allProps: {
                    ...stateProps, // 从store的state取状态数据
                    ...dispatchProps, // 需要更新store的state的方法，从这里传入dispatch
                    ...this.props // 透传给WrappedComponent
                }
            });
        }

        render() {
            return (
                <WrappedComponent { ...this.state.allProps } />
            )
        }

    }

    return Connect;
}

// // state是从store取出来的，props是传给高阶组件Connect的props
// const mapStateToProps = (state, props) => {
//     return {
//         lang: state.lang
//     };
// }

// // dispatch是从store取出来的，props是传给高阶组件Connect的props
// const mapDispatchToProps = (dispatch, props) => {
//     return {
//         onChangeLang: (lang) => {
//             dispatch({ type: 'UPDATE_LANG', lang })
//         }
//     }
// }