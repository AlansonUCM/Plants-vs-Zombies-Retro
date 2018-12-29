'use strict';

var MainMenu = {
  create: function () {
    this.game.add.sprite(0, 0, 'menuBG');
    var logo = this.game.add.sprite(-50, 0, 'pixelLogo');
    logo.scale.setTo(0.35);  
  
    //this.game.camera.flash(0x000000, 1000);
    this.game.stage.backgroundColor = '#ffffff'

    this.startButton = new TextButton(this.game,this.game.world.centerX, this.game.world.centerY + 75, 'Empezar',newGame);
    this.startButton.scale.setTo(1.2);

    if(this.game.levelIndex > 0){
      this.botonContinue = new TextButton(this.game,this.game.world.centerX, this.game.world.centerY + 150, 'Continuar', reanudar);
      this.botonContinue.scale.setTo(1.2);
    }
  } 
};

//CLASE StartButton
function TextButton (game, x, y, text, callBack){
    Phaser.Button.apply(this,[game, x, y, 'boton', this.onInputUp, , 1, 0, 2]);
    this.game.world.addChild(this);
    //Escala y ancla
    this.anchor.setTo(0.5);

    var text = this.game.add.text(0, 2, text,{ font: "bold 21px Arial", fill: "#fff", align: "center" });
    text.anchor.setTo(0.5);
    this.addChild(text);

    //Florituras
    this.onInputUp.add(callBack, this);
}
TextButton.prototype = Object.create(Phaser.Button.prototype);
TextButton.constructor = TextButton;

//CallBack
function reanudar(){
  this.game.state.start('play');
}

function newGame(){
  this.game.levelIndex = 0;
  this.game.state.start('play');
}

module.exports = MainMenu;