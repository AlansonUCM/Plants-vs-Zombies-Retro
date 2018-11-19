'use strict';

var MainMenu = {
    preload: function () {
        this.game.load.image('logo', 'images/logo.png');
        this.game.load.image('startButton', 'images/startButton.png');
    },
    
    create: function () {
    var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    logo.anchor.setTo(0.5);
    logo.scale.setTo(0.7);

    this.game.stage.backgroundColor = '#ffffff'

    this.button = new StartButton(this.game,this.game.world.centerX, this.game.world.centerY, 'startButton');
    } 
};

//CLASE StartButton
function StartButton (game, x, y, tag){
    Phaser.Button.apply(this,[game, x, y, tag, this.onInputUp, , 0, 0, 0]);
    this.game.world.addChild(this);
    //Escala y ancla
    this.anchor.setTo(0.5);
    this.scale.setTo(0.30);
    //Florituras
    this.onInputOver.add(this.over, this);
    this.onInputOut.add(this.out, this);
    this.onInputUp.add(this.up, this);
    this.onInputDown.add(this.down,this);
  }
  StartButton.prototype = Object.create(Phaser.Button.prototype);
  StartButton.constructor = StartButton;
  //Metodos
  StartButton.prototype.down = function(){
    if(this.input.pointerOver()){
        this.scale.setTo(0.40);
    }
  }
  StartButton.prototype.over = function(){
    if(this.input.pointerOver()){
        this.scale.setTo(0.35);
    }
  }
  StartButton.prototype.out = function(){
        this.scale.setTo(0.30);
  }
  StartButton.prototype.up = function(){
    if(this.input.pointerOver()){
        this.game.state.start('play');
    }
  }

module.exports = MainMenu;