//CLASE BULLET
function Bullet (game, x, y, tag,vel,dam, _effect = null){
    GameObject.apply(this,[game, x, y, tag]);
    this.anchor.setTo(0.5,0);
   
    this.sfx=this.game.add.audio('hit');
    this.sfx.volume=0.2;
    this._vel = vel;
    this._dam = dam;
    this.effect = _effect;
  }
  Bullet.prototype = Object.create(GameObject.prototype);
  Bullet.constructor = Bullet;
  
  Bullet.prototype.move = function () {
    if(this.alive){
      this.x += this._vel * this.game.time.elapsedMS/1000;
      //Si esta fuera de pantalla/mundo se mata
      if(this.x > this.game.world._width){
        this.kill();
        console.log('Bala ha muerto fuera del campo de vision');
      }
    }
  }
  
  
  Bullet.prototype.Oncollision = function () {
    this.sfx.play();
    this.kill();

    return this.effect;
  }
  
  Bullet.prototype.relocate=function(dam,vel,x,y) {
    this.reset(x,y);
    this._dam = dam;
    this._vel = vel;
  }