const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

context.fillRect(0, 0, canvas.width, canvas.height);

class Sprite {
    constructor({ position, velocity }) {
        this.position = position;
        this.velocity = velocity;
        this.height = 64;
        this.width = 64;
    }

    draw() {
        context.fillStyle = "red";
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw();

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0;
        }


    }
}

const player = new Sprite({
    position: { x: 512 - 32, y: 288 - 32 },
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
        player.velocity.x = -5;
    } else if (keys.d.pressed && lastKey === "d") {
        player.velocity.x = 5;
    } else if (keys.w.pressed && lastKey === "w") {
        player.velocity.y = -4;
    } else if (keys.s.pressed && lastKey === "s") {
        player.velocity.y = 4;
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