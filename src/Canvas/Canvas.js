import React from 'react';


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

let symmetry = 6;

const radius = 3;
const randomRange = 30;
const speed = 2;

var particleNum = 500;

var particles = [];

var canvasElementOffsetLeft;
var canvasElementOffsetTop;

// TODO:
// 1. 可以有内部空心设置
// 2. 设置角度范围
// 3. 粒子样式
// 4. 保存按钮



var currentParticle;

// function randomNum() {
//     const min = -randomRange;
//     const max = randomRange;
//     let rand = min + Math.random() * (max - min);
//     return rand;
// }

function randomSquareDistribution() {

    let u = Math.random() * 2 - 1.0;

    if (u >= 0)
        return u * u;
    else
        return - u * u;
}

function noCollision(particle) {
    for (let i = 0; i < particles.length; i++) {
        const distance = Math.sqrt((particle.x - particles[i].x) * (particle.x - particles[i].x) + (particle.y - particles[i].y) * (particle.y - particles[i].y));

        if (distance < 2 * radius) {
            return false;
        }
    }

    return true;
}

function createParticle(x, y, vx, vy, radius, ctx) {
    var object = new Object();
    object.x = x;
    object.y = y;
    object.vx = vx;
    object.vy = vy;
    object.ctx = ctx;
    object.radius = radius;

    // let isFinished = false;

    object.setCoords = function (newX, newY) {
        this.x = newX;
        this.y = newY;
    }

    object.draw = function () {
        while (this.y < 0 && noCollision(object)) {
            this.x += this.vx;
            this.y += this.vy;
        }
        // move follow the speed direction
        if (this.y < 0 && noCollision(object)) {
        }
        else {
            if (!this.isFinished) {
                this.isFinished = true;

                drawSymmetryFlakes(object);
            }
            else {
                // create new particle
                if (particleNum > 0) {
                    particleNum--;
                    let speedX = randomSquareDistribution();
                    let speedY = Math.sqrt(4 - speedX * speedX);
                    var particle1 = createParticle(speedX * 500 / Math.sqrt(3), -500, - speedX * speed, speedY * speed, radius, ctx);
                    currentParticle = particle1;
                }
                else if (particleNum === 0) {
                    console.log('Generating complete');
                }
            }
        }
    }

    object.show = function () {
        filledCircle({ ctx: this.ctx, x: this.x, y: this.y, radius: this.radius, color: "#FFFFFF" });
    }

    return object;
}

function drawCoordinateLine() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext('2d');

    filledCircle({ ctx, x: 0, y: 0, radius: 400 - 5, color: "#2C2C2C" });

    ctx.strokeStyle = "#FFFFFB";
}

function draw() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext('2d');
    ctx.clearRect(-400, -400, 800, 800);
    drawCoordinateLine();

    // show finished particles
    for (let i = 0; i < particles.length; i++) {
        particles[i].show();
    }

    currentParticle.draw();

    var raf = window.requestAnimationFrame(draw);
}

function drawSymmetryFlakes(particle) {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = "#FFFFFF";

    const tempX = particle.x;
    const tempY = particle.y;
    const distance = Math.sqrt(particle.x * particle.x + particle.y * particle.y);


    let tempAngle = Math.atan2(tempY, tempX);

    for (let i = 0; i < 6; i++) {
        var particle3 = createParticle(distance * Math.cos(tempAngle), distance * Math.sin(tempAngle), 0, 0, radius, ctx);

        // particle1.isFinished = true;
        particles.push(particle3);

        var particle4 = createParticle(- distance * Math.cos(tempAngle), distance * Math.sin(tempAngle), 0, 0, radius, ctx);

        particles.push(particle4);

        tempAngle += Math.PI * 2 / symmetry

    }
}

class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.updateCanvas();

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

    generatSnowflake() {
        const ctx = this.refs.canvas.getContext('2d');

        particleNum--;
        var particle1 = createParticle(-500, -500, speed, speed, radius, ctx);
        currentParticle = particle1;

        draw();
    }

    render() {
        return (
            <canvas id='canvas' ref="canvas" width={width} height={height} />
        );
    }
}

export default Canvas;