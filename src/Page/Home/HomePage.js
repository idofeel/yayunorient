import React, { Component } from 'react';
import Banner from './banner';
import Footer from '../../components/footer';
import Backdrop from '@material-ui/core/Backdrop';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const tutorialSteps = [
	{
		imgPath: require('../../assets/images/1.jpg'),
	},
	{
		imgPath: require('../../assets/images/2.jpg'),
	},
	{
		imgPath: require('../../assets/images/3.jpg'),
	},
	{
		imgPath: require('../../assets/images/4.jpg'),
	}, {
		imgPath: require('../../assets/images/5.jpg'),
	}
];

const styles = {
	root: {
		background: '#F5F5E6', //全局背景
		borderRadius: 3,
		border: 0,
		color: 'white',
		boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
	}
};
class Home extends Component {

	render() {
		const { classes } = this.props;
		return (
			<div id="App">
				<Footer name="头部" />
				<Banner swiperList={tutorialSteps} />
				<Footer name="页脚" />
				<Backdrop open={true} transitionDuration={10} classes={{
					root: classes.root, // class name, e.g. `classes-nesting-root-x`
				}}></Backdrop>
			</div >
		);
	}
}

Home.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);;
