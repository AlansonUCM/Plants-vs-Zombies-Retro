import './Character.js'

//CLASE ZOMBIE
function Zombie (game, x, y, tag, _damage, _velocity, _attacksPerSec){
    Character.apply(this,[game, x, y, tag]);
    //this.game.add.sprite(100,100,tag);
    this._life = 12;
    this.damage = _damage; 
    this.attacksPerSec = _attacksPerSec;
    this.isAttacking = false;
    this.velocity = _velocity;
    this.timeCount = 0;
  
    this.animations.add('move',[0,1,0]);
    this.animations.play('move',5,true);
  }
  Zombie.prototype = Object.create(Character.prototype);
  Zombie.constructor = Zombie;
  
  // Metodos en Zombies
  Zombie.prototype.move = function () {
    this.x -= this.velocity * this.game.time.elapsedMS/1000;
  }
  Zombie.prototype.takeDamage = function (damage) {
    this._life -= damage;
    if(this._life <= 0)
      this.kill();
  }
  Zombie.prototype.attack = function () {
    this.isAttacking = true;
    if(this.timeCount > 1000 / this.attacksPerSec){    
      this.timeCount += this.game.time.elapsedMS;
      return this.damage;
    }
    else{
      this.timeCount += this.game.time.elapsed;
      return 0;
    } 
  }
  Zombie.prototype.updateZombie = function(_velocity){
    if(!this.isAttacking){
      if(this.timeCount > 0)
        this.timeCount = 0;
      this.move(_velocity);
    }else{
      //Animacion de atacar
      //------------
      console.log("Zombie parado para ataca");
    }
  }