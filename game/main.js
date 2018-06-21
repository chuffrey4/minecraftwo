var lastTick; // time (in milliseconds) of the last tick.
var delta; // milliseconds inbetween frames.

var assets; // object for images, and sounds used by the game.

var gameCanvasWidth = 640; // width (in pixels) of the canvas
var gameCanvasHeight = 480; // height (in pixels) of the canvas

var TIVw = 16; // tiles in view width
var TIVh; // tiles in view height;
var tileWidth; // tile's pixel width 

var player; // player object
var camera; // camera object

var world; // array of all blocks in the world.

var chunkWidth = 24;
var chunkHeight = 16;

var noiseDifferentiator;

function setup() {
    var canvas = createCanvas(gameCanvasWidth,gameCanvasHeight);
    canvas.parent("gamecontainer");
    init();
    noSmooth();
}

function draw() {
    noSmooth(); // pixelated effect for textures
    stroke(0);
    noStroke();
    fill(0);
    delta = (performance.now() - lastTick)/1000;
    lastTick = performance.now();
    background(0);
    
    update(delta);
    render();
    
    fill(255,0,0);
    textAlign(RIGHT,TOP);
    textSize(12);
    text(round(1/delta) + " FpS",gameCanvasWidth,0);
}

function init() {
    tileWidth = gameCanvasWidth/TIVw;
    TIVh = gameCanvasHeight/tileWidth;
    noiseDifferentiator = random(100000000);
    
    loadAssets();
    
    player = new Player();
    camera = new Camera();
    world = new World();
    
    world.generateWorld();
}

function update(delta) {
    world.update(delta);
    player.update(delta);
    camera.update();
}

function render() {
    image(assets.background,0,0,640,480);
    world.render();
    player.render();
}

function loadAssets() {
    assets = [];
    assets.background = loadImage("game/assets/misc/background.jpeg");
    assets.blocks = [];
    loadBlockAssets();
    assets.items = [];
}

function loadBlockAssets() {
    for (var i=1;i<blockNames.length;i++) { // start at 1 to skip air, because lack of texture for AIR, cmon...
        assets.blocks[i] = loadImage("game/assets/blocks/"+blockNames[i]+".png");
    }
}

// Camera Class
function Camera() {
    this.xOffset = 0;
    this.yOffset = 0;
}

Camera.prototype.update = function () {
    this.xOffset = round(-(player.location.x*tileWidth-(gameCanvasWidth/2-player.width*tileWidth/2)));
    this.yOffset = round(-(-player.location.y*tileWidth-(gameCanvasHeight/2-player.height*tileWidth/2)));
}


// Player Class
function Player() {
    this.location = createVector(0,0);
    this.width = 1;
    this.height = 2;
}

Player.prototype.update = function (delta) {
    if (keyIsDown(65)||keyIsDown(37)) {
        this.location.add(-4*delta,0);
    }
    if (keyIsDown(68)||keyIsDown(39)) {
        this.location.add(4*delta,0);
    }    
    if (keyIsDown(83)||keyIsDown(40)) {
        this.location.add(0,-4*delta);
    }
    if (keyIsDown(87)||keyIsDown(38)) {
        this.location.add(0,4*delta);
    }
}

Player.prototype.render = function () {
    fill(0,255,0);
    rect((player.location.x*tileWidth)+camera.xOffset,(-player.location.y*tileWidth)+camera.yOffset,tileWidth*player.width,tileWidth*player.height);
}

function World() {
    this.chunks = [];
    this.generateWorld();
}

World.prototype.generateWorld = function () {
    var chunkLocation = this.getPlayerChunkLocation();
    if (this.chunks[chunkLocation]==undefined||this.chunks[chunkLocation]==null) this.chunks[chunkLocation] = this.generateChunk(chunkLocation);
}

World.prototype.getPlayerChunkLocation = function () {
    return floor(player.location.x/chunkWidth);
}

World.prototype.generateChunk = function (chunkLocation) {
    var chunk = [];
    chunk.location = chunkLocation;
    chunk.blocks = [];
    var xOffset = chunk.location*chunkWidth;
    for (var y=0;y<chunkHeight;y++) {
        for (var x=0;x<chunkWidth;x++) {
            if (y==0) {
                chunk.blocks[y*chunkWidth+x] = getBlockIdByName("bedrock");
                continue;
            }
            var grassLevel = round(noise(noiseDifferentiator,(x+xOffset)*0.5)*4+11);
            var stoneLevel = round(noise(noiseDifferentiator,(x+xOffset)*0.25)*3+7);
            if (y==grassLevel) {
                chunk.blocks[y*chunkWidth+x] = getBlockIdByName("grass");
                continue;
            }
            if (y<grassLevel&&y>stoneLevel) {
                chunk.blocks[y*chunkWidth+x] = getBlockIdByName("dirt");
                continue;
            }
            if (y<=stoneLevel&&y>0) {
                chunk.blocks[y*chunkWidth+x] = getBlockIdByName("stone");
                continue;
            }
            chunk.blocks[y*chunkWidth+x] = getBlockIdByName("air");
        }
    }
    return chunk;
    
}

World.prototype.update = function (delta) {
    this.generateWorld();
}

World.prototype.render = function () {
    this.renderChunk(this.chunks[this.getPlayerChunkLocation()]);
}

World.prototype.renderBlocks = function () {
    
}

World.prototype.renderChunk = function (chunk) {
    var blocks = chunk.blocks;
    var xOffset = chunk.location*chunkWidth;
    for (var x=0;x<chunkWidth;x++) {
        for (var y=0;y<chunkHeight;y++) {
            if (blocks[y*chunkWidth+x]!=0) {
                fill(127,0,127);
                image(assets.blocks[blocks[y*chunkWidth+x]],(x+xOffset)*tileWidth+camera.xOffset,((-y-1)*tileWidth)+camera.yOffset,tileWidth,tileWidth);
            }
        }
    }
}