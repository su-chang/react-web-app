import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userInfoActionsFromOtherFile from '../../redux/actions/userinfo'
import { hashHistory } from 'react-router'
import Header from '../../components/Header'
import LoginComponent from '../../components/Login'

class Login extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            checking: true
        }
    }
    render() {
        return (
            <div>
                <Header title="登录"/>
                {
                    this.state.checking
                    ? <div>{/* 等待*/}</div>
                    : <LoginComponent loginHandle={this.loginHandle.bind(this)}/>
                }
            </div>
        )
    }

    componentDidMount() {
        this.doCheck();
    }

    // 登录成功后的处理
    loginHandle(username) {
        const actions = this.props.userInfoActions;
        let userinfo = this.props.userinfo;
        userinfo.username = username;
        actions.update(userinfo);

        const router = this.props.params.router;

        if(router) {
            hashHistory.push(router);
        } else {
            this.goUserPage();
        }
    }

    doCheck() {
        const userinfo = this.props.userinfo;
        if(userinfo.username) {
            // 已登录
            this.goUserPage();
        } else {
            // 未登录
            this.setState({
                checking: false
            })
        }
    }

    goUserPage() {
        hashHistory.push('/User');
    }
}


// -------------------redux react 绑定--------------------

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch),
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)
