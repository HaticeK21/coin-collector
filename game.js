const player = document.getElementById("player");
const scoreText = document.getElementById("coins");

let x = window.innerWidth / 2;
let y = window.innerHeight / 2;
let coins = 0;
const speed = 5;

const keys = {};
const coinList = [];

document.addEventListener("keydown", (e) => {
    keys[e.key] = true;
});

document.addEventListener("keyup", (e) => {
    keys[e.key] = false;
});

function createCoin() {
    const coin = document.createElement("div");
    coin.className = "coin";

    coin.style.left =
        Math.random() * (window.innerWidth - 50) + "px";

    coin.style.top =
        Math.random() * (window.innerHeight - 100) + "px";

    document.getElementById("game").appendChild(coin);
    coinList.push(coin);
}

for (let i = 0; i < 10; i++) {
    createCoin();
}

function checkCoinCollision() {
    const playerRect = player.getBoundingClientRect();

    for (let i = coinList.length - 1; i >= 0; i--) {
        const coin = coinList[i];
        const coinRect = coin.getBoundingClientRect();

        if (
            playerRect.left < coinRect.right &&
            playerRect.right > coinRect.left &&
            playerRect.top < coinRect.bottom &&
            playerRect.bottom > coinRect.top
        ) {
            coin.remove();
            coinList.splice(i, 1);

            coins++;
            scoreText.textContent = coins;

            setTimeout(createCoin, 700);
        }
    }
}

function movePlayer(key) {
    keys[key] = true;
}

function stopPlayer(key) {
    keys[key] = false;
}

function setupButton(id, key) {
    const button = document.getElementById(id);

    button.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        movePlayer(key);
    });

    button.addEventListener("pointerup", (e) => {
        e.preventDefault();
        stopPlayer(key);
    });

    button.addEventListener("pointercancel", () => {
        stopPlayer(key);
    });

    button.addEventListener("pointerleave", () => {
        stopPlayer(key);
    });
}

setupButton("up", "ArrowUp");
setupButton("down", "ArrowDown");
setupButton("left", "ArrowLeft");
setupButton("right", "ArrowRight");

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

    checkCoinCollision();

    requestAnimationFrame(gameLoop);
}

gameLoop();
