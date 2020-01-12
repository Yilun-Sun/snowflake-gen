import React from 'react';

// function outlinedRect(props) {
//     const { ctx, x, y, width, height } = props;
//     ctx.rect(x, y, width, height);
//     ctx.stroke();
// }

// function filledRect(props) {
//     const { ctx, x, y, width, height, color } = props;
//     ctx.fillStyle = color;
//     ctx.fillRect(x, y, width, height);
// }

function filledCircle(props) {
    const { ctx, x, y, radius, color } = props;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}


let width = 800;
let height = 800;
let prevX = 0;
let prevY = 0;

let symmetry = 6;
let angle = 360 / symmetry;

const radius = 5;
const flakeNum = 100;
const randomRange = 30;

// function storeCoordinate(xVal, yVal, array) {
//     array.push({ x: xVal, y: yVal });
// }

var coords = [];

// to loop through coordinate values
// for (var i = 0; i < coords.length; i++) {
//     var x = coords[i].x;
//     var y = coords[i].y;
// } 


var canvasElementOffsetLeft;
var canvasElementOffsetTop;

// TODO:
// 可以有内部空心设置

function randomNum() {
    const min = -randomRange;
    const max = randomRange;
    let rand = min + Math.random() * (max - min);
    // rand = Math.round(rand);
    return rand;
}

function noCollision(tempX, tempY, ejectAngle, distance) {

    for (var i = 0; i < coords.length; i++) {
        var x = coords[i].x;
        var y = coords[i].y;

        if ((tempX - x) * (tempX - x) + (tempY - y) * (tempY - y) < 4 * (radius) * (radius)) {
            return false;
        }
        // const ctx = document.getElementById('canvas').getContext('2d');
        // var c = ctx.getImageData(Math.cos(ejectAngle) * (distance - radius), Math.sin(ejectAngle) * (distance - radius), 1, 1).data;

        // if (255 == c[0] &&
        //     255 == c[1] &&
        //     255 == c[2]) {
        //     return false;
        // }
    }

    return true;
}

function randomNormalDistribution() {
    var u = 0.0, v = 0.0, w = 0.0, c = 0.0;
    do {
        //获得两个（-1,1）的独立随机变量
        u = Math.random() * 2 - 1.0;
        v = Math.random() * 2 - 1.0;
        w = u * u + v * v;
    } while (w == 0.0 || w >= 1.0)
    //这里就是 Box-Muller转换
    c = Math.sqrt((-2 * Math.log(w)) / w);
    //返回2个标准正态分布的随机数，封装进一个数组返回
    //当然，因为这个函数运行较快，也可以扔掉一个
    //return [u*c,v*c];
    return u * c;
}

class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        // let isMouseDown = false;
    }

    componentDidMount() {
        this.updateCanvas();
        this.drawCoordinateLine();

        var canvasElement = document.getElementById("canvas");
        canvasElementOffsetLeft = canvasElement.offsetLeft;
        canvasElementOffsetTop = canvasElement.offsetTop;

        this.generatSnowflake();
    }
    componentDidUpdate() {
        this.updateCanvas();
    }
    updateCanvas() {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.translate(width / 2, height / 2);
        ctx.clearRect(0, 0, 800, 800);

        filledCircle({ ctx, x: 0, y: 0, radius: 400, color: "#2C2C2C" });
    }
    drawCoordinateLine() {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.strokeStyle = "#FFFFFB";

        for (let i = 0; i < 3; i++) {
            const coorLength = height / 20;
            for (let t = 0; t < 20; t += 2) {
                ctx.moveTo(0, height - coorLength * (t + 11.5));
                ctx.lineTo(0, height - coorLength * (t + 10.5));
            }

            ctx.stroke();
            ctx.rotate(Math.PI * 2 / symmetry);
        }

        ctx.rotate(Math.PI);
    }

    drawSymmetryFlakes(tempX, tempY) {

        const ctx = this.refs.canvas.getContext('2d');
        ctx.strokeStyle = "#FFFFFF";

        // for (let i = 0; i < 6; i++) {
        //     filledCircle({ ctx, x: tempX, y: tempY, radius: radius, color: "#2C2C2C" });
        //     ctx.scale(-1, 1);
        //     filledCircle({ ctx, x: tempX, y: tempY, radius: radius, color: "#2C2C2C" });
        //     ctx.scale(-1, 1);
        //     ctx.rotate(Math.PI * 2 / symmetry);
        // }


    }

    standardNormalRand() {
        const X = (Math.random - 0.5) * 2;  // (-1, 1)
        const Y = Math.random / 2;
        if (Y < 1 / ((Math.PI * Math.PI) * Math.pow(Math.E, X * X / 2)))
            return X;
        return randomNum();
    }


    generatSnowflake() {
        const ctx = this.refs.canvas.getContext('2d');

        for (let i = 0; i < flakeNum; i++) {
            // TODO:
            // create Normal distribution
            // const ejectAngle = randomNum() + 90;
            const ejectAngle = (2 * Math.PI) * (randomNum() + 90) / 360;
            // const ejectAngle = 90 / 360 * (2 * Math.PI);

            let distance = 300;
            let tempX = Math.cos(ejectAngle) * distance;
            let tempY = Math.sin(ejectAngle) * distance;

            while (distance >= 0 && noCollision(tempX, tempY, ejectAngle, distance)) {
                distance -= 1;
                tempX = Math.cos(ejectAngle) * distance;
                tempY = Math.sin(ejectAngle) * distance;

            }
            console.log(i + ' ' + ejectAngle + ' ' + tempX + ' ' + tempY);
            this.drawSymmetryFlakes(tempX, tempY);
            // filledCircle({ ctx, x: tempX, y: tempY, radius: radius, color: "#2C2C2C" });
            coords.push({ x: tempX, y: tempY });
        }
    }




    handleMouseDown = (event) => {
        console.log('mouse down');

        this.isMouseDown = true;

        prevX = event.pageX - canvasElementOffsetLeft - width / 2;
        prevY = event.pageY - canvasElementOffsetTop - height / 2;
    }

    handleMouseUp = (event) => {
        console.log('mouse up');

        this.isMouseDown = false;
    }

    handleMouseMove = (event) => {
        // var x = event.clientX - width / 2;
        // var y = event.clientY - height / 2;

        var x = event.pageX - canvasElementOffsetLeft - width / 2;
        var y = event.pageY - canvasElementOffsetTop - height / 2;



        if (x > width / 2 - 10 || x < - width / 2 + 10 || y > height / 2 - 10 || y < - height / 2 + 10) {
            this.isMouseDown = false;
        }

        const ctx = this.refs.canvas.getContext('2d');
        if (this.isMouseDown) {

            for (let i = 0; i < 6; i++) {

                ctx.beginPath();
                ctx.moveTo(prevX, prevY);
                ctx.lineTo(x, y);
                ctx.stroke();
                ctx.closePath();
                ctx.scale(-1, 1);
                ctx.beginPath();
                ctx.moveTo(prevX, prevY);
                ctx.lineTo(x, y);
                ctx.stroke();
                ctx.closePath();
                ctx.scale(-1, 1);

                ctx.rotate(angle * Math.PI / 180);
            }

            prevX = x;
            prevY = y;
        }
    }

    render() {
        return (
            // <canvas id='canvas' onMouseUp={this.handleMouseUp} onMouseDown={this.handleMouseDown} onMouseMove={this.handleMouseMove} ref="canvas" width={width} height={height} />
            <canvas id='canvas' ref="canvas" width={width} height={height} />

        );
    }
}

export default Canvas;