import React from "react";
import { withTheme } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
// #F6AA00
// 3C3C3C
// AFAFAF

const Footer = props => {
	return (
		<div>
			<h3>{props.name}</h3>
		</div>
	);
};


export default withTheme()(Footer);

// withStyles(classes,theme)  //关联主题（样式类名，主题）(组件)