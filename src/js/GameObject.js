

//CLASE GameObject
function GameObject (game, x, y, tag ){
    CanvasObject.apply(this, [game, x, y, tag]);
    this.game.physics.arcade.enable(this);
  }
  GameObject.prototype = Object.create(CanvasObject.prototype);
  GameObject.constructor = GameObject;