import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Radio from '@material-ui/core/Radio';
import Lens from '@material-ui/icons/Lens';
import PanoramaFishEye from '@material-ui/icons/PanoramaFishEye';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const styles = theme => ({
    root: {
        maxWidth: '100%',
        width: '100%',
        flexGrow: 1,
        position: 'relative'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        height: 50,
        paddingLeft: theme.spacing.unit * 4,
        backgroundColor: theme.palette.background.default,
    },
    img: {
        // height: 255,
        display: 'block',
        maxWidth: '100%',
        overflow: 'hidden',
        width: '100%',
    },
    dot: {
        position: 'absolute',
        bottom: '0',
        left: '0',
        width: '100%',
        textAlign: 'center'
        // background: 'RGBA(0,0,0,.5)'
    },
    icon: {
        margin: theme.spacing.unit,
        fontSize: 10,
    },
    radio: {
        padding: 0
    }
});

class Swiper extends React.Component {
    tutorialSteps = this.props.swiperList || [];
    state = {
        activeStep: 0, //当前index
    };

    handleNext = () => {
        this.setState(prevState => ({
            activeStep: prevState.activeStep + 1,
        }));
    };

    handleBack = () => {
        this.setState(prevState => ({
            activeStep: prevState.activeStep - 1,
        }));
    };

    handleStepChange = activeStep => {
        this.setState({ activeStep });
    };

    render() {
        const { classes, theme } = this.props;
        const { activeStep } = this.state;
        const maxSteps = this.tutorialSteps.length;
        if (!maxSteps) return null;
        return (
            <div className={classes.root}>
                <AutoPlaySwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={activeStep}
                    autoplay={true}
                    interval={5000}
                    onChangeIndex={this.handleStepChange}
                    enableMouseEvents
                >
                    {this.tutorialSteps.map((step, index) => (
                        <div key={index}>
                            {Math.abs(activeStep - index) <= 2 ? (
                                <img className={classes.img} src={step.imgPath} alt={step.label} />
                            ) : null}
                        </div>
                    ))}
                </AutoPlaySwipeableViews>
                <div className={classes.dot}>
                    {this.tutorialSteps.map((step, index) => (
                        <Radio
                            key={index}
                            checked={this.state.activeStep === index}
                            onChange={this.handleStepChange.bind(this, index)}
                            value={index}
                            className={classes.radio}
                            color="primary"
                            checkedIcon={
                                <Lens className={classes.icon} />
                            }
                            icon={
                                <PanoramaFishEye className={classes.icon} />
                            }
                        // disabled={this.state.activeStep === 0 || this.state.activeStep === this.tutorialSteps.length-1}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

Swiper.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};
export default withStyles(styles, { withTheme: true })(Swiper);