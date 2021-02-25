import * as TWGL from '../twgl.js/dist/4.x/twgl-full.module';

let lastTick; // time (in milliseconds) of the last tick.
let delta; // milliseconds inbetween frames.

let assets; // object for images, and sounds used by the game.

let gameCanvasWidth = 640; // width (in pixels) of the canvas
let gameCanvasHeight = 480; // height (in pixels) of the canvas

let TIVw = 16; // tiles in viewport width
let TIVh; // tiles in viewport height;
let tileWidth; // tile's pixel width 

let player; // player object
let cam; // cam object

let world; // array of all blocks in the world.

const gl = document.getElementById("c").getContext("webgl");

function setup() {
    // init();
    lastTick = performance.now();
    run()
}

function run() {
    delta = (performance.now() - lastTick) / 1000;
    lastTick = performance.now();

    update(delta);
    render();
    requestAnimationFrame(run);
}

function init() {
    console.log(TWGL)
}

function update(delta) {
}

function render() {
    console.log(TWGL.resizeCanvasToDisplaySize(gl.canvas));
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.clearColor(0,0,0,255)
    gl.clear(gl.COLOR_BUFFER_BIT)
    // image(assets.background,0,0,640,480);
    // world.render();
    // player.render();
}

function loadAssets() {
}

function loadBlockAssets() {
}

setup();