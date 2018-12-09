//CLASE CanvasObject
function CanvasObject (game, x, y, tag){
    Phaser.Sprite.call(this,game, x, y, tag);
    //this.game.world.addChild(this);
  }
  CanvasObject.prototype = Object.create(Phaser.Sprite.prototype);
  CanvasObject.constructor = CanvasObject;