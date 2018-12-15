
//Clase SunCounter
function SunCounter (game, parent,  x, y){ 
    Phaser.Group.call(this, game, parent,"SunCounter");
    //Sprite del contador
    this.im = this.game.add.sprite(x, y,'sunFrame',0,this);  
    //Puntos
    this.points = 50;
  
    //Texto
    this.text = game.add.text(x + 130, y + 32, "" + this.points, { font: "bold 32px Arial", fill: "#000000", align: "center" },this);
    this.text.anchor.setTo(0.5);
  }
  SunCounter.prototype = Object.create(Phaser.Group.prototype);
  SunCounter.constructor =  SunCounter;
  //Metodos
  SunCounter.prototype.updateCounter = function(){
    this.text.text = "" + this.points;
  }