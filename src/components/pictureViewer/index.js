import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import PicViewer from './pictureView'
const styles = theme => ({
    paper: {
        background: '#000',
        color: 'white',
        height: '100%',
    },
    paperFullScreen: {
        backgroud: '#000'
    },
    AppBar: {
        background: 'none',
        position: 'fixed',
        boxShadow: 'none',
    },
    toolbar: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    icon: {
        margin: theme.spacing.unit * 2,
        cursor: 'pointer',
        justifyContent: 'space-between'
        // color: '#fff'
    },
    flex: {
        flex: 1,
    },

});

function Transition(props) {
    return <Slide {...props} />;
}

// 分块显示图片

// 1.初始一个默认框组件加载进来的时候 获取本次图片的宽高。
//      1.1 根据图片的宽高和本地屏幕宽高对比 ，显示一个合适的大小
// 1.1.1  宽和高对比，使用最大的值进行和屏幕比较 
// 2.根据图片


class FullScreenDialog extends React.Component {
    state = {
        open: true,
        imgDrag: false
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes = {} } = this.props;
        return (
            <Dialog
                classes={{ paper: classes.paper }}
                fullScreen open={this.state.open}
                onClose={this.handleClose}
                // onClick={this.handleClose}
                TransitionComponent={Transition}
            >
                <AppBar className={classes.AppBar} style={{ zIndex: this.state.imgDrag ? '-1' : '' }}>
                    <Toolbar className={classes.toolbar}>
                        <ArrowBackIos color="primary" onClick={this.handleClose} className={classes.icon} />
                        <IconButton color="primary" onClick={this.handleClose} className={classes.icon}>
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                {/* 下面是可以是新的组件 */}
                <PicViewer onDrag={this.onDrag.bind(this)} />
            </Dialog>
        );
    }
    onDrag(bool) {
        this.setState({
            imgDrag: bool
        })
    }

    // 获取屏幕的宽高
    getWindowWidthAndHeight() {

        console.log(window.height)
    }

}





FullScreenDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullScreenDialog);