//CLASE BULLET
function Bullet (game, x, y, tag,vel,dam){
    GameObject.apply(this,[game, x, y, tag]);
   
    this.sfx=this.game.add.audio('hit');
    this.sfx.volume=0.2;
    this._vel = vel;
    this._dam = dam;
  }
  Bullet.prototype = Object.create(GameObject.prototype);
  Bullet.constructor = Bullet;
  
  Bullet.prototype.move = function () {
    this.x += this._vel * this.game.time.elapsedMS/1000;
  }
  
  
  Bullet.prototype.Oncollision = function () {
    this.sfx.play();
    this.kill();
  }
  
  Bullet.prototype.relocate=function(dam,vel,x,y) {
    this.reset(x,y);
    this._dam = dam;
    this._vel = vel;
  }