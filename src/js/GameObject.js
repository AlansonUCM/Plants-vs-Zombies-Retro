

//CLASE GameObject
function GameObject (game, x, y, tag ){
    CanvasObject.apply(this, [game, x, y, tag]);
    this.game.physics.arcade.enable(this);
    
    this.anchor.setTo(0.5, 1);
  }
  GameObject.prototype = Object.create(CanvasObject.prototype);
  GameObject.constructor = GameObject;