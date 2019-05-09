import React from 'react';


/**
 * 图片查看器组件
 *
 * PictureView Component API
 * 
 *  import PictureView from './PictureViewr';
 * 
 * Props
 *   Name            Type            Default             Description
 * --------------------------------------------------------------------------------
 * boundary    |    Boolean     |     true      |     设置图片拖动到边界时是否允许继续拖动
 * 
 * 
 */
export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            top: 0,//图片离顶部的距离
            left: 0,//图片左边界的距离
            scaleX: 1,//缩放X轴比例
            scaleY: 1,//缩放Y轴比例
            translateX: 0,//X轴移动距离
            translateY: 0,//Y轴移动距离
            originX: 0,// 放大X中心点
            originY: 0, // 放大Y中心点
            width: 0, //图片宽
            height: 0, //图片高
        }


        this.boundary = props.boundary === undefined ? true : props.boundary; //设置是否允许边界
    }
    scales = [1, 2, 3]; //缩放比例
    currentScale = 1; //当前比例
    currentScaleIndex = 0; //当前比例下标
    touch = false; //是否触摸
    touchTime = 0; //记录touch端是否双击 
    componentWillMount() {
        let { imgWidth, imgHeight } = this.getPictrueWidthAndHeight();
        this.setState({
            width: imgWidth,
            height: imgHeight
        });
    }

    componentDidMount() {
        this.screenChange();// 监听屏幕改变
        this.initPicture();

    }

    // 初始化图片宽高及显示位置
    initPicture() {
        let { visivbleWidth, visivbleHeight } = this.getVisivbleWidthAndHeight();
        let { imgWidth, imgHeight } = this.getPictrueWidthAndHeight();

        let WScale = visivbleWidth / imgWidth,
            HScale = visivbleHeight / imgHeight,
            minScale = WScale < HScale ? WScale : HScale,
            { width, height, } = this.state,
            top = (visivbleHeight - imgHeight) / 2,
            left = (visivbleWidth - imgWidth) / 2;

        // 图片超宽超高 或 宽高某项小于2倍
        if (minScale < 1 || minScale > 2) {
            width = imgWidth * minScale;
            height = imgHeight * minScale;
            top = (visivbleHeight - height) / 2;
            left = (visivbleWidth - width) / 2;
            this.currentScale = minScale;
        }

        // 初始化图片宽高，居中显示
        this.setState({
            width,
            height,
            top,
            left,
            originX: imgWidth / 2,
            originY: imgHeight / 2
        });

    }

    render() {
        const { width, height, top, left, translateX, translateY, originX, originY } = this.state;
        return <div className={'VisibleArea'}
            ref="visivbleArea"
            onMouseDown={this.touchStrat.bind(this)}
            onTouchStart={this.touchStrat.bind(this)}
            onTouchEnd={this.touchEnd.bind(this)}
            onMouseUp={this.touchEnd.bind(this)}
            onMouseMove={this.touchMove.bind(this)}
            onTouchMove={this.touchMove.bind(this)}
            onDoubleClick={this.doubleClick.bind(this)}
            style={{ position: 'absolute', width: '100%', height: '100%', background: '#000', overflow: 'hidden', top: '0' }}>

            <div className={'picView_big'}
                style={{ position: 'absolute', width: width, height: height, top: top, left: left, transform: `scale(${this.state.scaleX},${this.state.scaleY}) translate(${translateX}, ${translateY})`, transformOrigin: `${originX}px ${originY}px`, transition: 'transform 0.2s cubic-bezier(0.18, 0.89, 0.32, 1.28) 0s' }}>
                <img src={require('../../assets/images/3.jpg')} alt="" style={{ width: '100%', height: '100%', userSelect: 'none' }} draggable={false} />
                <div style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0 }}>
                    {/* <img src={require('../../assets/images/2.jpg')} alt="" style={{ width: '100%', height: '100%', userSelect: 'none' }} draggable={false} /> */}

                </div>
            </div>
        </div>

    }
    // 点击、触摸事件
    touchStrat(e) {
        this.props.onDrag(true);
        this.touch = true;

        // 模拟双击事件
        if (e.type === 'touchstart') {
            if (Date.now() - this.touchTime < 300) {
                this.doubleClick(e);
            }
            this.touchTime = Date.now();
        }

        console.log(e.type)
        const pos = this.getClientPos(e);
        this.x = pos.x + this.state.left * -1;
        this.y = pos.y + this.state.top * -1;

    }
    // 触摸结束，鼠标抬起事件
    touchEnd(e) {
        this.touch = false;
        this.props.onDrag(false);
    }

    // 移动事件
    touchMove(e) {
        if (!this.touch) return;
        this.setState(this.setPicturePos(e));
    }

    // 屏幕的宽度 - 图片的宽度 / 2 
    doubleClick(e) {
        if (++this.currentScaleIndex === this.scales.length) this.currentScaleIndex = 0;
        this.scale(this.scales[this.currentScaleIndex], this.setPicturePos(e));
    }

    // 缩放
    scale(magnification, { left, top }) {
        this.setState({
            left,
            top,
            scaleX: magnification,
            scaleY: magnification,
        });

    }
    // 设置图片显示的位置
    setPicturePos(e) {
        let { x, y } = this.getClientPos(e),
            left = (this.x - x) * -1,
            top = (this.y - y) * -1,
            { visivbleWidth, visivbleHeight } = this.getVisivbleWidthAndHeight(),
            scale = this.scales[this.currentScaleIndex],
            realWidth = this.state.width * scale,
            realHeight = this.state.height * scale;

        let minLeft = (visivbleWidth - realWidth) / 2,
            maxLeft = -minLeft,
            minTop = (visivbleHeight - realHeight) / 2,
            maxTop = -minTop,
            scaleWidth = (realWidth - this.state.width) / 2,
            scaleHeight = (realHeight - this.state.height) / 2;

        if (this.boundary) {
            // 可视区域宽度大于图片真实宽度 限制左右边界
            if (visivbleWidth > realWidth) {
                maxLeft = minLeft * 2 + scaleWidth
                minLeft = scaleWidth
                left = left <= minLeft ? minLeft : left >= maxLeft ? maxLeft : left;
            } else {
                left = left >= maxLeft ? maxLeft : left <= minLeft ? minLeft : left;
            }

            // 可视区域高度大于图片真实高度 限制上下边界
            if (visivbleHeight > realHeight) {
                maxTop = minTop * 2 + scaleHeight
                minTop = scaleHeight
                top = top <= minTop ? minTop : top >= maxTop ? maxTop : top;
            } else {
                maxTop = (realHeight - scaleHeight) / 2
                minTop = maxTop / 2;

                top = top >= maxTop ? maxTop : top <= minTop ? minTop : top;

            }
        }

        // 返回图片应该存在的位置
        return { top, left }

    }
    // 获取当前触达的坐标点
    getClientPos(e) {
        let x = e.clientX,
            y = e.clientY;
        if (e.type.indexOf('touch') > -1) {
            x = e.touches[0].pageX;
            y = e.touches[0].pageY;
        }
        return { x, y }
    }
    // 获取可显示区域的宽高
    getVisivbleWidthAndHeight() {
        let { visivbleArea } = this.refs;
        console.log(`可视区域：${visivbleArea.clientWidth} * ${visivbleArea.clientHeight}`)
        return {
            visivbleWidth: visivbleArea.clientWidth,
            visivbleHeight: visivbleArea.clientHeight
        }
    }

    // 获取图片的宽高
    getPictrueWidthAndHeight() {
        let imgWidth = 1000,
            imgHeight = 400;
        console.log(`图片尺寸：${imgWidth} * ${imgHeight}`)
        return {
            imgWidth,
            imgHeight
        }
    }
    // 窗口发生改变执行的回调
    resize() {
        this.initPicture();
    }
    // 监听窗口发生改变
    screenChange() {
        window.addEventListener('resize', () => { this.resize() });
    }
    componentWillUnmount() {
        // 销毁监听事件
        window.removeEventListener('resize', this.resize);
    }
}