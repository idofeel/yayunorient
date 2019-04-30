import React from 'react';
import Button from '@material-ui/core/Button';


export default class Home extends React.Component {
    render() {
        return (
            <div>
                <Button variant="text" color="primary" onClick={e => {this.props.history.goBack()}}>回到home</Button>
                <Button variant="text" color="primary" onClick={e => {this.props.history.replace('/detail')}}>replace</Button>
            </div>
        )
    }
}
