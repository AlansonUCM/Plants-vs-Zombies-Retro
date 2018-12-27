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
    this.spManager = new SPManager(this.game, this.boardLayer, this.bulletPool, this.plantsLayer, this.zombieGroup, this.HUDLayer, this.sunGroup);

    //Creacion de zombies por oleadas
    //Oleada 1
    this.wave0.add(new ZombieComun(this.game, 1000, 200, this.spManager));    
    this.wave0.add(new ZombieComun(this.game, 1150, 200 + 86, this.spManager));
    this.wave0.add(new ZombieComun(this.game, 1100, 200, this.spManager));
    // this.wave0.add(new ZombieComun(this.game, 1000, 200 + 86 * 2, this.spManager));
    //Ordeno
    this.wave0.sort('y', Phaser.Group.SORT_ASCENDING);
    
    //Oleada 2
    this.wave1.add(new ZombieCubo(this.game, 1265, 200 + 86 * 2, this.spManager));
    this.wave1.add(new ZombieMini(this.game, 1000, 200, this.spManager));
    this.wave1.add(new ZombieComun(this.game, 1200, 200 + 86 * 2, this.spManager));
    // this.wave1.add(new ZombieComun(this.game, 1500, 200 + 86 * 3, this.spManager));
    this.wave1.add(new ZombieComun(this.game, 1250, 200, this.spManager));
    //Ordeno
    this.wave1.sort('y', Phaser.Group.SORT_ASCENDING);

    //Oleada 3    
    this.wave2.add(new ZombieComun(this.game, 1000, 200, this.spManager));
    this.wave2.add(new ZombieComun(this.game, 1400, 200, this.spManager));
    this.wave2.add(new ZombieComun(this.game, 1000, 200, this.spManager));
    this.wave2.add(new ZombieComun(this.game, 1150, 200, this.spManager));
    this.wave2.add(new ZombieComun(this.game, 1000, 200 + 86, this.spManager));
    this.wave2.add(new ZombieComun(this.game, 1100, 200 + 86, this.spManager));
    this.wave2.add(new ZombieCono(this.game, 1350, 200 + 86, this.spManager));
    this.wave2.add(new ZombieComun(this.game, 1400, 200 + 86, this.spManager));
    this.wave2.add(new ZombieCono(this.game, 1250, 200 + 86 * 2, this.spManager));
    this.wave2.add(new ZombieComun(this.game, 1050, 200 + 86 * 2, this.spManager));
    this.wave2.add(new ZombieComun(this.game, 1200, 200 + 86 * 2, this.spManager));
    this.wave2.add(new ZombieComun(this.game, 1300, 200 + 86 * 2, this.spManager));
    this.wave2.add(new ZombieCono(this.game, 1000, 200 + 86 * 3, this.spManager));
    this.wave2.add(new ZombieComun(this.game, 1150, 200 + 86 * 3, this.spManager));
    this.wave2.add(new ZombieComun(this.game, 1300, 200 + 86 * 3, this.spManager));
    this.wave2.add(new ZombieCono(this.game, 1450, 200 + 86 * 4, this.spManager));
    this.wave2.add(new ZombieComun(this.game, 1250, 200 + 86 * 4, this.spManager));
    this.wave2.add(new ZombieComun(this.game, 1100, 200 + 86 * 4, this.spManager));
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
