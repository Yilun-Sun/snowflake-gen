
// var ctx = document.getElementById('canvas').getContext('2d');

// class Particle {
//     constructor (x, y, vx, vy, radius, ctx) {
//         this.x = x;
//         this.y = y;
//         this.vx = vx;
//         this.vy = vy;
//         this.ctx = ctx;
//         // this.sayName = function () { alert(this.name); };

//         this.radius = radius;
//     }

//     //   color: 'blue',
//     draw() {
//         this.ctx.beginPath();
//         this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
//         this.ctx.closePath();
//         this.ctx.fillStyle = this.color;
//         this.ctx.fill();
//     }
// }

function createParticle(x, y, vx, vy, radius, ctx) {
    var object = new Object()
    object.x = x;
    object.y = y;
    object.vx = vx;
    object.vy = vy;
    object.ctx = ctx;
    object.radius = radius;
    object.color = 'blue';


    object.draw = function () {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        this.ctx.closePath();
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        console.log('drawing particle');
    }

    return object;
}