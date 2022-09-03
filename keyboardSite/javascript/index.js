const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.width = 1600;
canvas.height = 800;

const spriteHeight = 64;
const spriteWidth = 64;

const spriteSpeedX = 10;
const spriteSpeedY = 8;

context.fillRect(0, 0, canvas.width, canvas.height);

class Sprite {
    constructor({ position, velocity }) {
        this.position = position;
        this.velocity = velocity;
        this.height = spriteHeight;
        this.width = spriteWidth;
    }

    draw() {
        context.fillStyle = "red";
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw();

        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;

        // Prevent the character from going off the canvas

        if (this.position.x + this.velocity.x < 0) {
            this.position.x = 0;
        } else if (this.position.x + this.velocity.x > canvas.width - this.width) {
            this.position.x = canvas.width - this.width;
        }

        if (this.position.y + this.velocity.y < 0) {
            this.position.y = 0;
        } else if (this.position.y + this.velocity.y > canvas.height - this.height) {
            this.position.y = canvas.height - this.height;
        }

    }
}

const player = new Sprite({
    position: { x: (canvas.width / 2) - (spriteWidth / 2), y: (canvas.height / 2) - (spriteHeight / 2) },
    velocity: {
        x: 0,
        y: 0
    }
});

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    s: {
        pressed: false
    }
}

let lastKey;

function animate() {
    window.requestAnimationFrame(animate);
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
    player.update();

    player.velocity.x = 0;
    player.velocity.y = 0;

    if (keys.a.pressed && lastKey === "a") {
        player.velocity.x = -spriteSpeedX;
    } else if (keys.d.pressed && lastKey === "d") {
        player.velocity.x = spriteSpeedX;
    } else if (keys.w.pressed && lastKey === "w") {
        player.velocity.y = -spriteSpeedY;
    } else if (keys.s.pressed && lastKey === "s") {
        player.velocity.y = spriteSpeedY;
    }
}

animate();

window.addEventListener("keydown", (keyPressed) => {

    switch (keyPressed.key) {
        case "d":
            keys.d.pressed = true;
            lastKey = "d";
            break;
        case "a":
            keys.a.pressed = true;
            lastKey = "a";
            break;
        case "w":
            keys.w.pressed = true;
            lastKey = "w";
            break;  
        case "s":
            keys.s.pressed = true;
            lastKey = "s";
            break;
    }

});

window.addEventListener("keyup", (keyPressed) => {

    switch (keyPressed.key) {
        case "d":
            keys.d.pressed = false;
            break;
        case "a":
            keys.a.pressed = false;
            break;
        case "w":
            keys.w.pressed = false;
            break;
        case "s":
            keys.s.pressed = false;
            break;
    }

});