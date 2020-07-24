let canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let balls = prompt("Enter Number of Balls: ", "1000");

if(balls == null) {
    balls = 800;
}

let c = canvas.getContext('2d');

let mouse = {
    x: undefined,
    y: undefined
};

let maxRadius = 50;

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
});

function Circle(x, y, dx, dy, radius, red, green, blue) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.red = red;
    this.green = green;
    this.blue = blue;

    this.draw = function () {
        c.beginPath();
        c.fillStyle = `rgb(${red},${green},${blue})`;
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = `rgb(${red},${green},${blue})`;
        c.fill();
        c.stroke();
    }

    this.update = function () {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        this.x += this.dx;

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.y += this.dy;

        this.draw();

        if ((mouse.x - this.x < 50) && (mouse.x - this.x > -50) && (mouse.y - this.y < 50) && (mouse.y - this.y > -50)) {
            if (this.radius < maxRadius) {
                this.radius += 1;
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }
    }

}

let circleArray = [];

function init() {
    circleArray = [];

    for (let i = 0; i < balls; i++) {
        let radius = Math.random() * 3 + 1;
        let x = Math.random() * (innerWidth - radius * 2) + radius;
        let y = Math.random() * (innerHeight - radius * 2) + radius;
        let dx = Math.random() - 0.5;
        let dy = Math.random() - 0.5;
        let red = Math.random() * 255;
        let green = Math.random() * 255;
        let blue = Math.random() * 255;

        circleArray.push(new Circle(x, y, dx, dy, radius, red, green, blue));
    }

}


function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();

    }

}

animate();
init();