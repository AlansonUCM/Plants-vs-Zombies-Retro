
//CLASE ZOMBIE
function Zombie (game, x, y, tag, _life, _damage, _velocity, _attacksPerSec,spManager){
    Character.apply(this,[game, x, y, tag]);
    //this.game.add.sprite(100,100,tag);


    this.life = _life;
    this.damage = _damage; 
    this.attacksPerSec = _attacksPerSec;
    this.isAttacking = false;
    this.velocity = _velocity;

    this.fx = null;

    this.timeCount = 1000;
    this.sfx = this.game.add.audio('bite');
    this.sfx.volume = 0.5;
    this.manager=spManager;

    //BoxCollider ajustes
    this.body.setSize(this.width/2, this.height/2, 0, this.height/2 - 10);
    this.scale.setTo(1.8);

    this.animations.add('move',[0,1,0]);
    this.animations.play('move',5,true);
    this.soundCount=0;
  }
  Zombie.prototype = Object.create(Character.prototype);
  Zombie.constructor = Zombie;
  
  // Metodos en Zombies
  Zombie.prototype.move = function () {
    this.x -= this.velocity * this.game.time.elapsedMS/1000;
  }

  Zombie.prototype.takeEffect = function(_fx){
    //Si ya tiene un efecto, se lo quita para ponerle el nuevo
    if (this.fx != null){
      this.fx.timer.destroy();
      this.fx.deactivate(this);
    }
    this.fx = _fx;
    this.fx.activate(this);

    this.fx.timer = this.game.time.create(true)
    this.fx.timer.repeat(this.fx.effectTime, 1, this.fx.deactivate,this.fx, this);
    this.fx.timer.start();
  }

  Zombie.prototype.takeDamage = function (damage) {
    this.life -= damage;
    if(this.life <= 0)
      this.manager.zombies.getChildAt(0).remove(this,true);
    
    return !this.alive;
  }
  Zombie.prototype.attack = function () {
    this.isAttacking = true;
    if(this.timeCount > 1000 / this.attacksPerSec){  
      if(this.soundCount==0)
      { 
      this.sfx.play(); 
      this.soundCount=1;
      }
      else
      this.soundCount=0;
      this.timeCount = 0;
      
      return this.damage;
    }
    this.timeCount += this.game.time.elapsedMS;
    return 0;
    
  }
  Zombie.prototype.updateZombie = function(){
    if(!this.isAttacking){
      if(this.timeCount > 0)
        this.timeCount = 0;
      this.move(this.velocity);
    }
  }