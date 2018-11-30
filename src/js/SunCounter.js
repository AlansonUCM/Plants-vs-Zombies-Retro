import './CanvasObject.js'

//Clase SunCounter
function SunCounter (game, x, y){ 
    Phaser.Sprite.call(this, game, x, y, 'sunFrame');
    this.game.world.addChild(this);
  
    //Puntos
    this.points = 0;
  
    //Texto
    this.text = game.add.text(x + 130, y + 32, "" + this.points, { font: "bold 32px Arial", fill: "#000000", align: "center" });
    this.text.anchor.setTo(0.5);
  }
  SunCounter.prototype = Object.create(CanvasObject.prototype);
  SunCounter.constructor =  SunCounter;
  //Metodos
  SunCounter.prototype.updateCounter = function(){
    this.text.text = "" + this.points;
  }