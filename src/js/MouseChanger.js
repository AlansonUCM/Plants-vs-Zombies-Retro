
//Clase MouseChanger
function MouseChanger(game, x, y, tag){
    Phaser.Sprite.call(this, game, x, y, tag);
    this.game.world.addChild(this);
  
    this.x = this.game.input.mouse.event.x;
    this.y = this.game.input.mouse.event.y;
  
    this.alpha = 0.6;
    this.anchor.setTo(0.5);
  
    this.game.input.addMoveCallback(this.move, this);
  }
  MouseChanger.prototype = Object.create(Phaser.Sprite.prototype);
  MouseChanger.constructor = MouseChanger;
  
  //Metodos
  MouseChanger.prototype.move = function (pointer, x, y, click){
    if(this.key != '__default') {
        this.x = this.game.input.mouse.event.x;
        this.y = this.game.input.mouse.event.y;
    }
    
    //Solo si queremos que el cursor por defecto desaparezca
    // if(this.game.canvas.style.cursor != "none")
    //   this.game.canvas.style.cursor = "none";
  }
  MouseChanger.prototype.changeSprite = function(_tag, _frameNum){
    this.loadTexture(_tag, _frameNum);
  }
  MouseChanger.prototype.clearCursor = function (){
    this.changeSprite(undefined);
  }