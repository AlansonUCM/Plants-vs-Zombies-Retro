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
    this.x += this._vel * this.game.time.elapsedMS/1000;
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