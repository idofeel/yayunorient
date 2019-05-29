import React from 'react';
import { Modal, Button, Icon } from 'antd';
import Picvew from './picview';
import './index.less';


/**
 * 带modal的查看器
 */

class ModalPic extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: true
        }
    }
    render() {
        return <Modal
            footer={null}
            visible={this.state.visible}
            onOk={this.hideModal.bind(this)}
            onCancel={this.hideModal.bind(this)}
            okButtonProps={null}
            maskClosable={false}
            width={this.props.width || "100%"}
            wrapClassName={this.props.wrapClassName || "modalWarp"}
            className="modalpic"
            style={this.props.style}
            bodyStyle={{ height: '100%', padding: 0 }}
            cancelButtonProps={<Icon type="left" />}
        >
            <Picvew
                uri={this.props.uri}
                options={this.props.options}
            />
        </Modal>
    }

    hideModal() {
        this.setState({
            visible: false
        })
    }

}
export default ModalPic;