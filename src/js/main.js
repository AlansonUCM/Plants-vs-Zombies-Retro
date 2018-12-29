'use strict';

var MainMenu = require('./main_menu.js');
var PlayScene = require('./play_scene.js');


var BootScene = {
  preload: function () {
    // load here assets required for the loading screen
    this.game.load.image('preloader_bar', 'images/progressBar2.png');
    this.game.load.image('logo', 'images/logo.png');
    this.game.load.image('menuBG', 'images/menuBG.png');
    
  },

  create: function () {
    this.game.state.start('preloader');
  }
};


var PreloaderScene = {
  preload: function () {
    this.bg = this.game.add.sprite(0, 0,'menuBG');
    this.loadingBar = this.game.add.sprite(240, this.game.world.centerY, 'preloader_bar');
    this.loadingBar.anchor.setTo(0, 0.5);
    this.load.setPreloadSprite(this.loadingBar);

    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // TODO: load here the assets for the game
    this.game.load.image('void', 'images/void.png');

    //Fondo
    this.game.load.image('backGround', 'images/bg.png');
    this.game.load.image('pixelLogo','images/logoPixel.png');

    //Sprites de botones
    this.game.load.image('shovel', 'images/palaSuelta.png');
    this.game.load.spritesheet('shovelFrame', 'images/palaFrame.png', 108, 54, 2);
    
    //Sprites plantas
    //LanzaGuisantes
    this.game.load.spritesheet('lanzaGuisantes','images/lanzaGuisantes.png',64,64,3);
    this.game.load.image('lanzaGuisantesFrame', 'images/lanzaGuisantesFrame.png');
    //GiraSol
    this.game.load.spritesheet('giraSol', 'images/giraSol.png', 64, 64, 3);
    this.game.load.image('giraSolFrame', 'images/giraSolFrame.png');
    //CherryBoom
    this.game.load.image('cherryBoom', 'images/cherryBoom.png');
    this.game.load.spritesheet('cherryBoomBOOMBOOM','images/cherryBoomBOOMBOOM.png',256,256,10);
    this.game.load.image('cherryBoomFrame', 'images/cherryBoomFrame.png');    
    //Nuez
    this.game.load.spritesheet('nuez','images/nuez.png',64,64,9);
    this.game.load.image('nuezFrame', 'images/nuezFrame.png');
    //HielaGuisantes
    this.game.load.spritesheet('hielaGuisantes','images/hielaGuisantes.png',64,64,3);
    this.game.load.image('hielaGuisantesFrame', 'images/hielaGuisantesFrame.png');

    // Carga de los zombies
    this.game.load.spritesheet("zombieComun", "images/zombieComun.png",46,52,4);
    this.game.load.spritesheet("zombieCono", "images/zombieCono.png",46,67,8);
    this.game.load.spritesheet("zombieCubo", "images/zombieCubo.png",46,67,8);
    this.game.load.spritesheet("zombiePuerta", "images/zombies Puerta.png",46,67,8);
    this.game.load.spritesheet("miniZombie", "images/minizombie.png",24,35,5);
    this.game.load.image('cono', 'images/cono.png');

    //Fondo/Casillas
    this.game.load.image('casilla', 'images/casilla.png');

    //Balas
    this.game.load.image('lanzaGuisantesBala', 'images/balaLanzaGuisantes.png');    
    this.game.load.image('hielaGuisantesBala', 'images/balaHielaGuisantes.png');
    //Soles y contador
    this.game.load.image('sunFrame', 'images/sunCounterFrame.png');
    this.game.load.image('sun', 'images/sun2.png');
    //ProgressBar
    this.game.load.image('progressBar', 'images/progressBar.png');
    this.game.load.image('progressBar2', 'images/progressBar2.png');
    this.game.load.image('progressFrame', 'images/progressFrame.png');
    this.game.load.image('flag', 'images/flag.png');
    this.game.load.image('head', 'images/head.png');
    //MenuDePausa
    //PauseButton
    this.game.load.image('pauseMenu', 'images/pauseMenu.png');
    this.game.load.spritesheet('pause', 'images/pause.png', 54, 54, 6);
    this.game.load.spritesheet('sliderBoton', 'images/sliderButton.png',28,36,3);
    this.game.load.image('sliderBar', 'images/sliderBar.png');    
    this.game.load.spritesheet('boton', 'images/button.png',140,44,3);
    

    this.game.load.audio('shoot','sounds/shoot .mp3');

    this.game.load.audio('hit','sounds/golpe a zombie(casi seguro).mp3');
    this.game.load.audio('bite','sounds/zombie eating plant.mp3');
    this.game.load.audio('plantar','sounds/plantar.mp3');
    this.game.load.audio('sun','sounds/points.mp3');
    this.game.load.audio('explosion','sounds/explosion(1).mp3');
    this.game.load.audio('shovel','sounds/shovel.mp3');

    this.game.load.audio('music','sounds/music-8-bit-style.mp3');

    this.game.levelIndex = 0;
  
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
