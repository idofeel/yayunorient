import React from 'react';
import { Modal, Button } from 'antd';
import ModalPic from '../../components/pictureview/';
class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: true
        }

    }

    render() {
        return <ModalPic
            options={{ bounding: true }}
        />
    }

    hideModal() {
        this.setState({
            visible: false
        })
    }

}
export default Home;