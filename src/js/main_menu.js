'use strict';

var MainMenu = {
  create: function () {
    this.game.add.sprite(0, 0, 'menuBG');
    var logo = this.game.add.sprite(-50, 0, 'pixelLogo');
    logo.scale.setTo(0.35);  
  
    //this.game.camera.flash(0x000000, 1000);
    this.game.stage.backgroundColor = '#ffffff'

    this.startButton = new StartButton(this.game,this.game.world.centerX, this.game.world.centerY + 75);
    this.startButton.scale.setTo(1.2);
  } 
};

//CLASE StartButton
function StartButton (game, x, y){
    Phaser.Button.apply(this,[game, x, y, 'boton', this.onInputUp, , 1, 0, 2]);
    this.game.world.addChild(this);
    //Escala y ancla
    this.anchor.setTo(0.5);

    var text = this.game.add.text(0, 2, 'Empezar',{ font: "bold 21px Arial", fill: "#fff", align: "center" });
    text.anchor.setTo(0.5);
    this.addChild(text);

    //Florituras
    this.onInputUp.add(this.up, this);
}
StartButton.prototype = Object.create(Phaser.Button.prototype);
StartButton.constructor = StartButton;
//Metodos
StartButton.prototype.up = function(){
  this.game.state.start('play');
}

module.exports = MainMenu;