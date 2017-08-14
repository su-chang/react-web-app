import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import OrderListComponent from '../../../components/OrderList'
import { getOrderListData,postComment } from '../../../fetch/user/orderlist'

class OrderList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            data: []
        }
    }
    render() {
        return (
            <div className="order-list-container">
                <h2>您的订单</h2>
                {
                    this.state.data.length
                        ? <OrderListComponent data={this.state.data} submitComment={this.submitComment.bind(this)}/>
                        : <div>{/* loading */}</div>
                }
            </div>
        )
    }

    componentDidMount() {
        const username = this.props.username;
        if(username) {
            this.loadOrderListData(username)
        }
    }
    // 获取首页数据
    loadOrderListData(username) {
        const result = getOrderListData(username);

        result.then(res => {
            return res.json()
        }).then(json => {
            this.setState({
                data: json
            })
        }).catch(ex => {
            if (__DEV__) {
                console.error('首页”猜你喜欢“获取数据报错, ', ex.message)
            }
        })
    }

    // 提交评价
    submitComment(id , value, callback) {
        const result = postComment(id, value);
        result.then(res => {
            return res.json();
        }).then(json => {
            if (json.errno === 0) {
                // 已经评价，修改状态
                callback();
            }
        })
    }
 }

export default OrderList
