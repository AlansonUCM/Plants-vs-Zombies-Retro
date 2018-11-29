'use strict';

var MainMenu = require('./main_menu.js');
var PlayScene = require('./play_scene.js');


var BootScene = {
  preload: function () {
    // load here assets required for the loading screen
    this.game.load.image('preloader_bar', 'images/preloader_bar.png');
  },

  create: function () {
    this.game.state.start('preloader');
  }
};


var PreloaderScene = {
  preload: function () {
    this.loadingBar = this.game.add.sprite(0, 240, 'preloader_bar');
    this.loadingBar.anchor.setTo(0, 0.5);
    this.load.setPreloadSprite(this.loadingBar);

    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // TODO: load here the assets for the game
    this.game.load.image('logo', 'images/logo.png');

    //Sprites de botones
    this.game.load.image('shovel', 'images/palaSuelta.png');
    this.game.load.spritesheet('shovelFrame', 'images/palaFrame.png', 64, 64, 4);
    
    //Sprites plantas
    //LanzaGuisantes
    this.game.load.spritesheet('lanzaGuisantes','images/lanzaGuisantes.png',64,64,3);
    this.game.load.image('lanzaGuisantesFrame', 'images/lanzaGuisantesFrame.png');
    //GiraSol
    this.game.load.spritesheet('giraSol', 'images/giraSol.png', 64, 64, 3);
    this.game.load.image('giraSolFrame', 'images/giraSolFrame.png');
    //CherryBoom
    this.game.load.image('cherryBoom', 'images/cherryBoom.png');
    this.game.load.image('cherryBoomFrame', 'images/cherryBoomFrame.png');    
    //Nuez
    this.game.load.spritesheet('nuez','images/nuez.png',64,64,3);
    this.game.load.image('nuezFrame', 'images/nuezFrame.png');

    // Carga de los zombies
    this.game.load.spritesheet("zombies", "images/firstZombie.png",46,56,2);

    this.game.load.image('frame', 'images/frame.png');
    this.game.load.image('bullet', 'images/BasicBullet.png');
    //Soles y contador
    this.game.load.image('sunFrame', 'images/sunCounterFrame.png');
    this.game.load.image('sun', 'images/sun2.png');
    
  },

  create: function () {
    this.game.state.start('mainMenu');
  }
};


window.onload = function () {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

  game.state.add('boot', BootScene);
  game.state.add('preloader', PreloaderScene);
  game.state.add('mainMenu', MainMenu);
  game.state.add('play', PlayScene);

  game.state.start('boot');
};
