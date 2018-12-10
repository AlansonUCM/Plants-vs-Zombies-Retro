(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
    this.game.load.image('void', 'images/void.png');
    this.game.load.image('logo', 'images/logo.png');

    //Fondo
    this.game.load.image('backGround', 'images/levelGround.png');

    //Sprites de botones
    this.game.load.image('shovel', 'images/palaSuelta.png');
    this.game.load.image('shovelFrame', 'images/palaFrame.png');
    
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
    this.game.load.spritesheet("zombieComun", "images/zombieComun.png",46,52,2);
    this.game.load.spritesheet("zombieCono", "images/zombieCono.png",46,67,4);
    this.game.load.image('cono', 'images/cono.png');

    //Fondo/Casillas
    this.game.load.image('casilla', 'images/casilla.png');

    //Balas
    this.game.load.image('lanzaGuisantesBala', 'images/balaLanzaGuisantes.png');    
    this.game.load.image('hielaGuisantesBala', 'images/balaHielaGuisantes.png');
    //Soles y contador
    this.game.load.image('sunFrame', 'images/sunCounterFrame.png');
    this.game.load.image('sun', 'images/sun2.png');
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
    preload: function () {
        this.game.load.image('logo', 'images/logo.png');
        this.game.load.image('startButton', 'images/startButton.png');
    },
    
    create: function () {
    var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    logo.anchor.setTo(0.5);
    logo.scale.setTo(0.7);
    
    
    this.game.camera.flash(0x000000, 1000);
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
    this.scale.setTo(0.40);
  }
  StartButton.prototype.over = function(){
    this.scale.setTo(0.35);
  }
  StartButton.prototype.out = function(){
    this.scale.setTo(0.30);
  }
  StartButton.prototype.up = function(){
    this.game.state.start('play');
  }

module.exports = MainMenu;
},{}],3:[function(require,module,exports){
'use strict';

  var PlayScene = {
  create: function () {
    // var logo = this.game.add.sprite(
    //   this.game.world.centerX, this.game.world.centerY, 'logo');
    // logo.anchor.setTo(0.5, 0.5);
    // logo.scale.setTo(0.7);
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

    this.cursorLayer = this.game.add.group(undefined,"CursorChanger");
    this.pauseMenuLayer = this.game.add.group(undefined, "PauseMenu");

    
    this.music=this.game.add.audio('music');
    this.music.loop=true;    
    this.music.play();
    this.music.volume=0.2;
   
    //Creacion de oleadas
    this.wave = this.game.add.group(this.zombieGroup, "VoidWave");
    this.wave0 = this.game.add.group(this.zombieGroup, "Wave 0");
    this.wave1 = this.game.add.group(this.zombieGroup, "Wave 1");
    this.wave2 = this.game.add.group(this.zombieGroup, "Wave 2");

    //Fondo
    this.game.add.sprite(0,0,'backGround',0,this.boardLayer);

    //Logica del juego
    this.spManager = new SPManager(this.game, this.boardLayer, this.bulletPool, this.plantsLayer, this.zombieGroup, this.HUDLayer, this.sunGroup, 4);

    //Creacion de zombies por oleadas
    //Oleada 1
    this.wave0.add(new ZombieComun(this.game, 1000, 200, this.spManager));    
    this.wave0.add(new ZombieComun(this.game, 1150, 200 + 86, this.spManager));
    this.wave0.add(new ZombieComun(this.game, 1100, 200, this.spManager));
    this.wave0.add(new ZombieComun(this.game, 1000, 200 + 86 * 2, this.spManager));
    //Ordeno
    this.wave0.sort('y', Phaser.Group.SORT_ASCENDING);
    
    //Oleada 2
    this.wave1.add(new ZombieCono(this.game, 1000, 200 + 86 * 2, this.spManager));
    this.wave1.add(new ZombieCono(this.game, 1000, 200, this.spManager));
    this.wave1.add(new ZombieComun(this.game, 1200, 200 + 86 * 2, this.spManager));
    this.wave1.add(new ZombieComun(this.game, 1500, 200 + 86 * 3, this.spManager));
    this.wave1.add(new ZombieComun(this.game, 1250, 200, this.spManager));
    //Ordeno
    this.wave1.sort('y', Phaser.Group.SORT_ASCENDING);

    //Oleada 3    
    this.wave2.add(new ZombieCono(this.game, 1000, 200 + 86 * 3, this.spManager));
    this.wave2.add(new ZombieCono(this.game, 1350, 200 + 86, this.spManager));
    this.wave2.add(new ZombieCono(this.game, 1600, 200 + 86 * 4, this.spManager));
    this.wave2.add(new ZombieCono(this.game, 1250, 200 + 86 * 2, this.spManager));
    this.wave2.add(new ZombieComun(this.game, 1000, 200, this.spManager));
    this.wave2.add(new ZombieComun(this.game, 1400, 200 + 86 * 2, this.spManager));
    this.wave2.add(new ZombieComun(this.game, 1400, 200, this.spManager));
    //Ordeno
    this.wave2.sort('y', Phaser.Group.SORT_ASCENDING);


    //Cursor Changer
    this.game.cursor = new MouseChanger(this.game, 0, 0, undefined, this.cursorLayer);

    //Menu de Pausa
    this.pauseMenu = new PauseMenu(this.game, this.spManager);
    this.pauseMenuLayer.add(this.pauseMenu);
    this.game.isPaused = false;
    
    //this.input.keyboard.addKey(Phaser.Keyboard.ESC).onDown.add(this.pauseMenu.pauseGame,this.pauseMenu);
  },
  
  update: function (){
    if(!this.game.isPaused && 0 < this.zombieGroup.length){
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
  // render: function(){
  //   for(let i = 0; i< this.zombieGroup.getChildAt(0).length; i++){
  //     this.game.debug.body(this.zombieGroup.getChildAt(0).getChildAt(i));
  //   }
  //   for(let i = 0; i < this.plantsLayer.length;i++){
  //     var plant = this.plantsLayer.getChildAt(i);
  //     this.game.debug.body(plant);
  //     if(plant.children.length > 0){
  //       this.game.debug.body(plant.getChildAt(0));
  //     }
  //   }
  // },

  paused: function (){
    //Para cerciorar que esta pausado por codigo
    if(!this.game.isPaused)
      this.pauseMenu.pauseGame();
  },
};


module.exports = PlayScene;

},{}]},{},[1]);
