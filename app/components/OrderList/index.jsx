import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import Item from './Item'

import './style.less'

class List extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        const submitComment = this.props.submitComment;
        return (
            <div className="list-container">
                {this.props.data.map((item, index) => {
                    return <Item key={index} data={item} submitComment={submitComment}/>
                })}
            </div>
        )
    }
}

export default List