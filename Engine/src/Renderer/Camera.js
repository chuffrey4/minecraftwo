export default class Camera {
    Camera() {
        this.xOffset = 0;
        this.yOffset = 0;
    }

    update() {
        this.xOffset = round(-(player.location.x*tileWidth-(gameCanvasWidth/2-player.width*tileWidth/2)));
        this.yOffset = round(-(-player.location.y*tileWidth-(gameCanvasHeight/2-player.height*tileWidth/2)));
    }
}