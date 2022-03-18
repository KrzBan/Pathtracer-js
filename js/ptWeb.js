const canvas = document.getElementById('mainCanvas');

const DEFAULT_WIDTH = 1280;
const DEFAULT_HEIGHT = 720;

let ctx;
let imageData;

let accumulatedData;
let renderPassCnt = 0;
// --------Auto Init Script--------
init();

function init() {
    ctx = canvas.getContext('2d');

    canvasResize(DEFAULT_WIDTH, DEFAULT_HEIGHT);

    indexElementsCheck();
}

function drawScene() {
    ++renderPassCnt;
    const colorArray = renderPass(canvas.width, canvas.height);

    for (let i = 0; i < colorArray.length; ++i) {
        const id = 4 * i;
        accumulatedData[id + 0] += colorArray[i].x;
        accumulatedData[id + 1] += colorArray[i].y;
        accumulatedData[id + 2] += colorArray[i].z;
        accumulatedData[id + 3] += 1;

        imageData.data[id + 0] = accumulatedData[id + 0] / renderPassCnt * 255;
        imageData.data[id + 1] = accumulatedData[id + 1] / renderPassCnt * 255;
        imageData.data[id + 2] = accumulatedData[id + 2] / renderPassCnt * 255;
        imageData.data[id + 3] = accumulatedData[id + 3] / renderPassCnt * 255;
    }

    ctx.putImageData(imageData, 0, 0);
}

function indexElementsCheck() {
    if (canvas === undefined) {
        throw new Error("Canvas is undefined");
    }
    if (ctx === undefined) {
        throw new Error("Context2d is undefined");
    }
    if (imageData === undefined) {
        throw new Error("ImageData is undefined");
    }
}

function canvasResize(width, height) {
    canvas.width = width;
    canvas.height = height;

    imageData = ctx.createImageData(width, height);

    accumulatedData = Array(width * height * 4).fill(0);
}