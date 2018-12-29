(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"./main_menu.js":2,"./play_scene.js":3}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
'use strict';

var PlayScene = {
  create: function () {
    this.game.camera.flash(0x000000, 1000);

    this.game.world.setBounds(-20, -20, this.game.width+40, this.game.height+40);
    
    this.game.stage.backgroundColor = '#ffffff';  

    //Layers/Grupos
    this.boardLayer = this.game.add.group(undefined ,"BoardLayer");
    this.plantsLayer = this.game.add.group(undefined,"PlantsLayer");    
    this.bulletPool = this.game.add.group(undefined, "BulletLayer");
    //Guisantes
    this.peaPool = this.game.add.group(this.bulletPool, "GuisantesNormales");
    //GuisantesHielo
    this.frozenPeaPool = this.game.add.group(this.bulletPool, "GuisantesHelados");
    this.zombieGroup =this.game.add.group(undefined, "ZombiesGroup");    
    this.HUDLayer = this.game.add.group(undefined , "HUDLayer"); 
    this.sunGroup = this.game.add.group(undefined, "SunGroup"); 
    this.upperLayer = this.game.add.group(undefined, 'UpperLayer');

    this.cursorLayer = this.game.add.group(undefined,"CursorChanger");
    this.pauseMenuLayer = this.game.add.group(undefined, "PauseMenu");

    //Musica
    this.music=this.game.add.audio('music');
    this.music.loop=true;    
    this.music.play();
    this.music.volume = 0.2;

    //Fondo
    var bg = this.game.add.sprite(-60, 0,'backGround',0,this.boardLayer);

    //Logica del juego
    this.spManager = new SPManager(this.game, this.boardLayer, this.bulletPool, this.plantsLayer, this.zombieGroup, this.HUDLayer, this.sunGroup, this.upperLayer, this.game.levelIndex);

    //Cursor Changer
    this.game.cursor = new MouseChanger(this.game, this.cursorLayer);

    //Menu de Pausa
    this.pauseMenu = new PauseMenu(this.game, this.spManager);
    this.pauseMenuLayer.add(this.pauseMenu);
    this.game.isPaused = false;
    
    //this.input.keyboard.addKey(Phaser.Keyboard.ESC).onDown.add(this.pauseMenu.pauseGame,this.pauseMenu);
  },

  update: function (){
    if(!this.game.isPaused){
      //Update de los Zombies
      for(let j = 0; j < this.zombieGroup.getChildAt(0).length; j++)
      this.zombieGroup.getChildAt(0).getChildAt(j).updateZombie();
      

      //Update de las Bullets
      for(let i = 0; i < this.bulletPool.length; i++){
        var bulletType = this.bulletPool.getChildAt(i);
        for(let j = 0; j < bulletType.length; j++){
          bulletType.getChildAt(j).move();
        }
      }

      //Temporal (se comprobará cada zombie con cada planta de su fila)
      //Colision de Bullets con Zombies
      for(let i = 0; i < this.bulletPool.length; i++) {
        var bulletType = this.bulletPool.getChildAt(i);
        for(let t = 0; t < bulletType.length; t++){          
          var bullet = bulletType.getChildAt(t);
          for(let j = 0; j < this.zombieGroup.getChildAt(0).length; j++)
          this.game.physics.arcade.collide(bullet, this.zombieGroup.getChildAt(0).getChildAt(j), function bulletCollision(obj1, obj2) {    
            var fx = obj1.Oncollision();
            t--;
            if(fx != null){
              obj2.takeEffect(fx);
            }   
            var isDead = obj2.takeDamage(obj1._dam); 
            if(isDead)
              j--;
          });
        }
        
      }

      //Temporal (se comprobará cada zombie con cada planta de su fila)
      //Colision de Zombies con Plants
      for(let i = 0; i < this.zombieGroup.getChildAt(0).length; i++) {
        var zomb = this.zombieGroup.getChildAt(0).getChildAt(i);
        var col = false;
        for(let j = 0; j < this.plantsLayer.length && !col; j++) {
          var plant = this.plantsLayer.getChildAt(j);
          col = this.game.physics.arcade.collide(zomb, plant, function zombieAttackPlant(obj1, obj2) { 
            if(obj1.x > obj2.x + obj1.width / 2) {
              var dam = obj1.attack();
              var obj2IsDead = obj2.takeDamage(dam);
              obj1.isAttacking = !obj2IsDead;
              if(obj2IsDead)
                j--;
            }
          });
        }
        if(!col && zomb.isAttacking)
          zomb.isAttacking = false;
      }      
      
      //Update de las Plantas
      for(let i =0;i<this.plantsLayer.length;i++)
        this.plantsLayer.getChildAt(i).shoot();
      
      //Update de SPManager
      this.spManager.updateSPM();
    }
  },
  
  paused: function (){
    //Para cerciorar que esta pausado por codigo
    if(!this.game.isPaused)
      this.pauseMenu.pauseGame();
  },
};

module.exports = PlayScene;

},{}]},{},[1]);
