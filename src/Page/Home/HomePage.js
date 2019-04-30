import React, { Component } from 'react';
// import logo from '../../logo.svg';
import Banner from './banner';
import Footer from '../../components/footer';
import Button from '@material-ui/core/Button';

const tutorialSteps = [
  {
    imgPath:
      'http://kan.027cgb.com/620546/1.jpg',
  },
  {
    imgPath:
      'http://kan.027cgb.com/620546/2.jpg',
  },
  {
    imgPath:
      'http://kan.027cgb.com/620546/3.jpg',
  },
  {
    imgPath:
      'http://kan.027cgb.com/620546/4.jpg',
  }, {
    imgPath:
      'http://kan.027cgb.com/620546/5.jpg',
  }
];


class Home extends Component {
  render() {
    return (
      <div className="App">
        <Footer name="头部" />
        <Banner swiperList={tutorialSteps} />
        <Button variant="contained" color="primary">123131</Button>
        <Footer name="页脚" />
      </div>
    );
  }

}



export default Home;
