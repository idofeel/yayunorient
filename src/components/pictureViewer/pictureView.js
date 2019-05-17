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


const style = {
    visivbleArea: {
        position: 'relative',
        // margin: '20px',
        flex: 1,
        overflow: 'hidden'
    },
    pictureArea: {
        position: 'absolute',
        overflow: 'hidden',
        transition: 'transform 0.2s cubic-bezier(0.18, 0.89, 0.32, 1.28) 0s'
    }

}
const imgs = require('../../assets/images/3.jpg')
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
            rows: []
        }


        this.boundary = props.boundary === undefined ? false : props.boundary; //设置是否允许边界
    }
    scales = [1, 2,2, 3]; //缩放比例
    currentScale = 1; //当前比例
    currentScaleIndex = 0; //当前比例下标
    touch = false; //是否触摸
    touchTime = 0; //记录touch端是否双击 
    visivbleWidth = 0;
    visivbleHeight = 0;
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
        visivbleWidth = visivbleWidth % 2 != 0 ? visivbleWidth - 1 : visivbleWidth;
        visivbleWidth = visivbleHeight % 2 != 0 ? visivbleHeight - 1 : visivbleHeight;

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
            originX: this.currentScale * imgWidth / 2,
            originY: this.currentScale * imgHeight / 2,
            rows: this.visivbleMatrix(1, { width, height }),
        });

    }

    render() {
        const { width, height, top, left, translateX, translateY, originX, originY, scaleX, scaleY } = this.state;

        const pictrueStyle = {
            width,
            height,
            top,
            left,
            transform: `scale(${scaleX},${scaleY}) translate(${translateX}, ${translateY})`,
            transformOrigin: `${originX}px ${originY}px`,
        };
        return (
            <div ref="visivbleArea" style={{ ...style.visivbleArea }} 
                onMouseMove={this.touchMove.bind(this)} 
                onTouchEnd={this.touchEnd.bind(this)} 
                onMouseUp={this.touchEnd.bind(this)} 
                onTouchMove={this.touchMove.bind(this)}
                >
                <div ref="imgContainer" onMouseDown={this.touchStrat.bind(this)}
                    onTouchStart={this.touchStrat.bind(this)}
                    onDoubleClick={this.doubleClick.bind(this)} style={{ ...style.pictureArea, ...pictrueStyle }}>
                    {/* 缩略图 */}
                    <img src={require('../../assets/images/2.jpg')} alt="" style={{ width: '100%', height: '100%', userSelect: 'none' }} draggable={false} />
                    {/* 真实图片按比例加载区域图片*/}
                    {/* <div style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0 }}>
                        <div style={{ ...imgStyle, background: `url(${imgs}) ` }} ></div>
                    </div> */}
                    {this.renderPictureBlock()}
                </div>

            </div>);

    }
    renderPictureBlock() {
        let imgStyle = {
            display: 'block',
            userSelect: 'none',
            overflow: 'hidden',
            float: 'left',
            fontSize: 0,
            border: 'none',
            margin: 0,
            padding: 0,
            background: '#000',
            verticalAlign: 'middle',
            position: 'absolute',
        };
        const distance = index => this.state.rows[0].w / this.state.scaleX * index;
        // console.log(this.state.rows)
        return this.scales.map((item, index) =>
            <div className={`scalebox${item}${index}`} key={index} hidden={item !== this.state.scaleX} style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0 }}>
                {this.state.rows.map((v, i) =>
                    <div key={i} style={{ ...imgStyle, left: distance(i), top: 0, width: v.w / this.state.scaleX, height: v.h / this.state.scaleY }}>
                        <img src={require('../../assets/images/3.jpg')} alt="" style={{ position: 'relative', left: -distance(i) + 'px', width: this.state.width, height: this.state.height }} draggable={false} /></div>
                )}
            </div>
        );

    }
    // 点击、触摸事件
    touchStrat(e) {
        this.touch = true;
        // 模拟双击事件
        if (e.type === 'touchstart') {
            if (Date.now() - this.touchTime < 300) {
                this.doubleClick(e);
            }
            this.touchTime = Date.now();
        }
        const pos = this.getClientPos(e);
        // console.log(pos)
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
        this.props.onDrag(true);
        this.setState(this.setPicturePos(e));
    }

    // 双击事件
    doubleClick(e) {
        const scale = this.scales[this.currentScaleIndex];
        
        const ImgBounding = this.refs.imgContainer.getBoundingClientRect()
        // ImgBounding
        // 
        let { x, y } = this.getClientPos(e),originX,originY;

        if(ImgBounding.x<0)originX = (-ImgBounding.x+x)/scale;

        
        // console.log(x) //280
        // let realWidth = this.state.width * magnification;
        // console.log(magnification)

        console.log('ImgBounding',x,y)

        if (++this.currentScaleIndex === this.scales.length) this.currentScaleIndex = 0;

        const nextScale = this.scales[this.currentScaleIndex];
        const origin = {originX:(-ImgBounding.x+x)/scale,originY:(-ImgBounding.y+y)/scale}
        
        console.log(this.visivbleHeight,nextScale)
        // this.scale(this.scales[this.currentScaleIndex], e);
        // let position = this.setPicturePos(e, origin);
            this.setState({
                // ...position,
                ...origin,
                scaleX: nextScale,
                scaleY: nextScale,
                rows: this.visivbleMatrix(nextScale),
            },function(){
                if(this.currentScaleIndex === 0) this.initPicture();
            })
    
       

    }

    // // 等比例缩放（比例，）
    // scale(magnification, e) {
    





    //     // this.state.width/

    //     // let touchPicPos = realWidth / ImgBounding.x
    //     // console.log(this.state.width/ x ) 
    //     // let { left, top } = this.setPicturePos(e, origin);
    //     this.setState({
    //         // left, top,
    //         scaleX: magnification,
    //         scaleY: magnification,
    //         rows: this.visivbleMatrix(magnification),
    //         // ...origin
    //     }, function () {

    //         // console.log(this.refs.imgContainer.getBoundingClientRect())

    //     });

    // }

    // 设置图片显示的位置
    setPicturePos(e, origin = {}) {
        let { x, y } = this.getClientPos(e),
            left = (this.x - x) * -1,
            top = (this.y - y) * -1,
            { visivbleWidth, visivbleHeight } = this,
            scale = this.scales[this.currentScaleIndex],
            realWidth = this.state.width * scale, //实际显示的宽度
            realHeight = this.state.height * scale,
            originX = origin.originX || this.state.originX,
            originY = origin.originY || this.state.originY;
        // 鼠标点击的中心作为计算
        // 获取剩余的宽度 图片真实显示的宽度 - 图片初始默认的高度 
        let minLeft = originX * scale - originX,
            minTop = originY * scale - originY,
            maxTop = -(realHeight - visivbleHeight - minTop),
            maxLeft = -(realWidth - visivbleWidth - minLeft);
        // console.log(minLeft, realWidth - this.state.width)
        // console.log('左边最小距离:' + x, this.state.originX * scale - this.state.originX)
        // console.log(this.state.width - originX,originXs)
        // left + visivbleWidth = realWidth
        // left = realWidth - visivbleWidth;

        // 左边大小this.state.originX * scale 
        // 右边大小 this.state.width - 左边大小
        let leftArea = this.state.originX * scale;

        // console.log(this.state.originX)

        // console.log(this.state.originX * scale + (this.state.width - this.state.originX * scale))
        // left = realWidth - this.state.width - originX+originXs
        // console.log(realWidth, this.state.originX * scale - this.state.originX)
        // console.log(this.state.width - x + x);
        // console.log('左边最小距离:' + (this.state.originX * scale - this.state.originX), (this.state.width - this.state.originX) * scale)
        if (this.boundary) {
            // 可视区域宽度大于图片真实宽度 限制左右边界
            if (visivbleWidth > realWidth) {
                left = left <= minLeft ? minLeft : left >= maxLeft ? maxLeft : left;
            } else {
                // console.log(maxLeft,minLeft)
                left = left <= maxLeft ? maxLeft : left >= minLeft ? minLeft : left;
            }
            // 可视区域高度大于图片真实高度 限制上下边界
            if (visivbleHeight > realHeight) {
                top = top <= minTop ? minTop : top >= maxTop ? maxTop : top;
            } else {
                top = top <= maxTop ? maxTop : top >= minTop ? minTop : top;
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
        // console.log(`可视区域：${visivbleArea.clientWidth} * ${visivbleArea.clientHeight}`)
        return {
            visivbleWidth: visivbleArea.clientWidth,
            visivbleHeight: visivbleArea.clientHeight
        }
    }

    // 获取图片的宽高
    getPictrueWidthAndHeight() {
        let imgWidth = 1000,
            imgHeight = 400;
        // console.log(`图片尺寸：${imgWidth} * ${imgHeight}`)
        return {
            imgWidth,
            imgHeight
        }
    }
    // 可显示区域的矩阵
    visivbleMatrix(scale, picWh) {
        let { width, height } = picWh || this.state;
        width *= scale;
        height *= scale;
        // let matrix = [];

        let row = Math.floor(width / 100),
            lastRow = width % 100,
            cols = height * scale / 100;
        let matrix = [];
        for (let i = 0; i < row; i++) {
            matrix[i] = { w: 100, h: 100 };
        }
        matrix[matrix.length] = { w: lastRow, h: 100 };

        // console.log(matrix)
        return matrix


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