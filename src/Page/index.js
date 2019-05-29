
import React from 'react';
import { Carousel } from 'antd';
import './index.css'

class HomeBanner extends React.Component {

    render() {
        return <Carousel autoplay>
            <div>
                <img src={require('../assets/images/3.jpg')} />
            </div>
            <div>
                <h3>2</h3>
            </div>
            <div>
                <h3>3</h3>
            </div>
            <div>
                <h3>4</h3>
            </div>
        </Carousel>
    }
}
export default HomeBanner;