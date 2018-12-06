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

    this.bulletPool = [];
    this.sunPool = [];
    
    //Zombie en Pantalla
    this.zombie =this.game.add.group();
   
    this.spManager = new SPManager(this.game, this.bulletPool, this.sunPool, 4, this.zombie);
    this.zombie.add(new Zombie(this.game, 800, 300-100, "zombies", 1, 30, 1,this.spManager));
    this.zombie.getChildAt(0).scale.setTo(1.8); 

    //Cursor Changer
    this.game.cursor = new MouseChanger(this.game, 0, 0, undefined);

    //Menu de Pausa
    this.pauseMenu = new PauseMenu(this.game, this.spManager);
    this.game.isPaused = false;
    
    //this.input.keyboard.addKey(Phaser.Keyboard.ESC).onDown.add(this.pauseMenu.pauseGame,this.pauseMenu);
  },
  
  update: function (){
    if(!this.game.isPaused){
      //Update de los Zombies
      for(let j = 0; j < this.zombie.length; j++)
      this.zombie.getChildAt(j).updateZombie();
      

      //Update de las Plantas
      for(let i =0;i<this.spManager.board.plants.length;i++)
        this.spManager.board.plants[i].shoot(this.bulletPool);

      //Update de las Bullets
      for(let i = 0; i < this.bulletPool.length; i++)
        this.bulletPool[i].move();;

      //Update de SPManager
      this.spManager.updateSPM();

      //Temporal (se comprobará cada zombie con cada planta de su fila)
      //Colision de Bullets con Zombies
      for(let i = 0; i < this.bulletPool.length; i++) {
        for(let j = 0; j < this.zombie.length; j++)
          this.game.physics.arcade.collide(this.bulletPool[i], this.zombie.getChildAt(j), function bulletCollision(obj1, obj2) {    
            obj2.takeDamage(obj1._dam);
            obj1.Oncollision();      
          });
      }

      //Temporal (se comprobará cada zombie con cada planta de su fila)
      //Colision de Zombies con Plants
      for(let i = 0; i < this.zombie.length; i++) {
        var zomb = this.zombie.getChildAt(i);
        var col = false;
        for(let j = 0; j < this.spManager.board.plants.length; j++) {
          col = this.game.physics.arcade.collide(zomb, this.spManager.board.plants[j], function zombieAttackPlant(obj1, obj2) { 
            if(obj1.x > obj2.x + obj1.width / 2) {
              var dam = obj1.attack();
              var obj2IsDead = obj2.takeDamage(dam);
              obj1.isAttacking = !obj2IsDead;
            }
          });
        }
        if(!col && zomb.isAttacking)
          zomb.isAttacking = false;
      }   
    }
  },

  paused: function (){
    //Para cerciorar que esta pausado por codigo
    if(!this.game.isPaused)
      this.pauseMenu.pauseGame();
  },
};


module.exports = PlayScene;
