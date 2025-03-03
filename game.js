const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 20,
    speed: 3
};

let keys = {};
window.addEventListener('keydown', (e) => keys[e.key] = true);
window.addEventListener('keyup', (e) => keys[e.key] = false);

function updatePlayer() {
    if (keys['w']) player.y -= player.speed;
    if (keys['s']) player.y += player.speed;
    if (keys['a']) player.x -= player.speed;
    if (keys['d']) player.x += player.speed;

    player.x = Math.max(0, Math.min(canvas.width, player.x));
    player.y = Math.max(0, Math.min(canvas.height, player.y));
}

function drawScene() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawPlayer() {
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.size, 0, Math.PI * 2);
    ctx.fill();
}

function drawFlashlight() {
    const flashlightRadius = 150;
    const mouseX = player.x + (canvas.width / 2 - player.x);
    const mouseY = player.y + (canvas.height / 2 - player.y);

    const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, flashlightRadius);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(mouseX, mouseY, flashlightRadius, 0, Math.PI * 2);
    ctx.fill();
}

function gameLoop() {
    updatePlayer();
    drawScene();
    drawFlashlight();
    drawPlayer();

    requestAnimationFrame(gameLoop);
}

window.addEventListener('mousemove', (e) => {
    player.facingX = e.clientX;
    player.facingY = e.clientY;
});

gameLoop();
