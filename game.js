const player = document.getElementById("player");
const scoreText = document.getElementById("coins");

let x = window.innerWidth / 2;
let y = window.innerHeight / 2;
let coins = 0;

const speed = 5;
const keys = {};

const coinList = [];

document.addEventListener("keydown", (event) => {
    keys[event.key] = true;
});

document.addEventListener("keyup", (event) => {
    keys[event.key] = false;
});

function createCoin() {
    const coin = document.createElement("div");

    coin.className = "coin";

    coin.style.left =
        Math.random() * (window.innerWidth - 40) + "px";

    coin.style.top =
        Math.random() * (window.innerHeight - 40) + "px";

    document.getElementById("game").appendChild(coin);

    coinList.push(coin);
}

for (let i = 0; i < 10; i++) {
    createCoin();
}

function checkCoinCollision() {
    const playerRect = player.getBoundingClientRect();

    coinList.forEach((coin, index) => {
        const coinRect = coin.getBoundingClientRect();

        const collision =
            playerRect.left < coinRect.right &&
            playerRect.right > coinRect.left &&
            playerRect.top < coinRect.bottom &&
            playerRect.bottom > coinRect.top;

        if (collision) {
            coin.remove();
            coinList.splice(index, 1);

            coins++;
            scoreText.textContent = coins;

            setTimeout(createCoin, 1000);
        }
    });
}

function gameLoop() {

    if (keys["ArrowUp"] || keys["w"]) y -= speed;
    if (keys["ArrowDown"] || keys["s"]) y += speed;
    if (keys["ArrowLeft"] || keys["a"]) x -= speed;
    if (keys["ArrowRight"] || keys["d"]) x += speed;

    x = Math.max(0, Math.min(window.innerWidth - 45, x));
    y = Math.max(0, Math.min(window.innerHeight - 45, y));

    player.style.left = x + "px";
    player.style.top = y + "px";

    checkCoinCollision();

    requestAnimationFrame(gameLoop);
}

gameLoop();
