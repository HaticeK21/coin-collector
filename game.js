const player = document.getElementById("player");

let x = window.innerWidth / 2;
let y = window.innerHeight / 2;

const speed = 5;

const keys = {};

document.addEventListener("keydown", (event) => {
    keys[event.key] = true;
});

document.addEventListener("keyup", (event) => {
    keys[event.key] = false;
});

function gameLoop() {
    if (keys["ArrowUp"] || keys["w"]) {
        y -= speed;
    }

    if (keys["ArrowDown"] || keys["s"]) {
        y += speed;
    }

    if (keys["ArrowLeft"] || keys["a"]) {
        x -= speed;
    }

    if (keys["ArrowRight"] || keys["d"]) {
        x += speed;
    }

    x = Math.max(0, Math.min(window.innerWidth - 45, x));
    y = Math.max(0, Math.min(window.innerHeight - 45, y));

    player.style.left = x + "px";
    player.style.top = y + "px";

    requestAnimationFrame(gameLoop);
}

gameLoop();
