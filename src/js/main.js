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

    //Sprites plantas
    this.game.load.spritesheet('plants','images/lanzaGuisantes.png',64,64,3);
    this.game.load.spritesheet('giraSol', 'images/giraSol.png', 64, 64, 3);
    // Carga de los zombies
    this.game.load.spritesheet("zombies", "images/firstZombie.png",46,56,2);

    this.game.load.image('frame', 'images/frame.png');
    this.game.load.image('bullet', 'images/BasicBullet.png');
    this.game.load.image('sun', 'images/sun.png');
    
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
