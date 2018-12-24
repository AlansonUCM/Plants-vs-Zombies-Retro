
//Clase MouseChanger
function MouseChanger(game, parent){
    Phaser.Sprite.call(this, game, 0, 0, 'void');
    parent.addChild(this);
  
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
    if(this.key != 'void' && !this.game.isPaused) {
        this.x = this.game.input.mouse.event.x;
        this.y = this.game.input.mouse.event.y;
    }
  }

  MouseChanger.prototype.changeSprite = function(_tag, _frameNum){
    this.loadTexture(_tag, _frameNum);
    this.move();
  }
  
  MouseChanger.prototype.clearCursor = function (){
    this.changeSprite('void');
  }