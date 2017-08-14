import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {getInfoData} from '../../../fetch/detail/detail'
import BuyAndStore from '../../../components/BuyAndStore'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { hashHistory } from 'react-router'
import * as storeActionsFromOtherFile from '../../../redux/actions/store'

class Buy extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            isStore: false
        }
    }

    render() {
        return (
            <div>
                {
                    <BuyAndStore
                        isStore={this.state.isStore}
                        buyHandle={this.buyHandle.bind(this)}
                        storeHandle={this.storeHandle.bind(this)}/>
                }
            </div>
        )
    }

    componentDidMount() {
        this.checkStoreState();
    }

    // 检查是否已经被收藏
    checkStoreState() {
        const id = this.props.id;
        const store = this.props.store;

        store.some(item => {
            if(item.id === id) {
                this.setState({
                    isStore: true
                })
            }
            return true;
        })
    }

    // 购买事件
    buyHandle() {
        // 验证登录
        const loginFlag = this.loginCheck();

        if(!loginFlag) {
            return ;
        }

        // 购买流程


        hashHistory.push('User');
    }

    // 收藏事件
    storeHandle() {
        // 验证登录
        const loginFlag = this.loginCheck();

        if(!loginFlag) {
            return ;
        }

        const id = this.props.id;
        const storeActions = this.props.storeActions;
        if(this.state.isStore) {
            // 已被收藏，点击时应该执行取消操作
            storeActions.remove({id: id});
        } else {
            // 未被收藏，点击时应该执行收藏操作
            storeActions.add({id: id});
        }

        // 修改状态
        this.setState({
            isStore: !this.state.isStore
        })
    }
    // 登录检测
    loginCheck() {
        let id = this.props.id;
        const userinfo = this.props.userinfo;

        if(!userinfo.username) {
            hashHistory.push('/login/' + encodeURIComponent('/detail/' + id));
            return false;
        } else {
            return true;
        }
    }

}

// -------------------redux react 绑定--------------------

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo,
        store: state.store
    }
}

function mapDispatchToProps(dispatch) {
    return {
        storeActions: bindActionCreators(storeActionsFromOtherFile, dispatch),
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Buy)