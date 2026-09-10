const game = document.getElementById("game");
const player = document.getElementById("player");
const scoreText = document.getElementById("coins");

let x = window.innerWidth / 2 - 30;
let y = window.innerHeight / 2 - 35;
let coins = 0;

const speed = 5;
const keys = {};
const coinList = [];

// Klavye
document.addEventListener("keydown", (event) => {
    keys[event.key] = true;
});

document.addEventListener("keyup", (event) => {
    keys[event.key] = false;
});

// Coin oluştur
function createCoin() {
    const coin = document.createElement("div");
    coin.className = "coin";

    const maxX = Math.max(10, window.innerWidth - 45);
    const maxY = Math.max(80, window.innerHeight - 150);

    coin.style.left = Math.random() * maxX + "px";
    coin.style.top = 70 + Math.random() * (maxY - 70) + "px";

    game.appendChild(coin);
    coinList.push(coin);
}

// Başlangıçta 10 coin
for (let i = 0; i < 10; i++) {
    createCoin();
}

// Coin toplama
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

// Telefon tuşları
function setupButton(id, key) {
    const button = document.getElementById(id);

    button.addEventListener("pointerdown", (event) => {
        event.preventDefault();
        keys[key] = true;
    });

    button.addEventListener("pointerup", (event) => {
        event.preventDefault();
        keys[key] = false;
    });

    button.addEventListener("pointercancel", () => {
        keys[key] = false;
    });

    button.addEventListener("pointerleave", () => {
        keys[key] = false;
    });
}

setupButton("up", "ArrowUp");
setupButton("down", "ArrowDown");
setupButton("left", "ArrowLeft");
setupButton("right", "ArrowRight");

// Oyun döngüsü
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

    const maxX = window.innerWidth - 60;
    const maxY = window.innerHeight - 70;

    x = Math.max(0, Math.min(maxX, x));
    y = Math.max(0, Math.min(maxY, y));

    player.style.left = x + "px";
    player.style.top = y + "px";

    checkCoinCollision();

    requestAnimationFrame(gameLoop);
}

gameLoop();
