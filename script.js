const canvas = document.getElementById("canvas");
const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");
const sizeEl = document.getElementById("size");
const colorEl = document.getElementById("color");
const clearEl = document.getElementById("clear");
const eraserEl = document.getElementById("eraser");
const brushEl = document.getElementById("brush");

const ctx = canvas.getContext("2d");

let size = 10;
let color = "black";
let x,y;

let isPressed = false;
let drawMode = true;

canvas.addEventListener("mousedown", (e) => {
    isPressed = true;
    x = e.offsetX;
    y = e.offsetY;
    // if(drawMode) {
        drawCircle(x, y);
    // } else {
    //     ctx.clearRect(x - size / 2, y - size / 2, x + size / 2, y + size / 2);
    // }
});

canvas.addEventListener("mouseup", (e) => {
    isPressed = false;
    x = undefined;
    y = undefined;
});

canvas.addEventListener("mousemove", (e) => {
    const x2 = e.offsetX;
    const y2 = e.offsetY;

    if(isPressed && drawMode) {
        
        drawCircle(x2, y2);
        drawLine(x, y, x2, y2);

        x = x2;
        y = y2;

    } else if(isPressed && drawMode === false) {
        drawCircle(x2, y2);
        drawLine(x, y, x2, y2);
        x = x2;
        y = y2;
    }
});

function drawCircle(x,y) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2, true);
    ctx.fillStyle = color;
    ctx.fill();
};

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = size * 2;
    ctx.stroke();
};

function updateSizeOnScreen() {
    sizeEl.innerText = size;
};

colorEl.addEventListener("change", (e) => color = e.target.value);

increaseBtn.addEventListener("click", () => {
    size += 5;
    size > 50 ? size = 50 : size = size;
    updateSizeOnScreen();
});

decreaseBtn.addEventListener("click", () => {
    size -= 5;
    size < 5 ? size = 5 : size = size;
    updateSizeOnScreen();
});

eraserEl.addEventListener("click", () => {
    if(drawMode === true) {
        drawMode = false;
        brushEl.classList.remove("active");
        eraserEl.classList.add("active");
    } 
    color = "#f5f5f5";
});

brushEl.addEventListener("click", () => {
    if(drawMode === false) {
        drawMode = true;
        color = colorEl.value;
        brushEl.classList.add("active");
        eraserEl.classList.remove("active");
    }
});

clearEl.addEventListener("click", () => ctx.clearRect(0, 0, canvas.width, canvas.height));
