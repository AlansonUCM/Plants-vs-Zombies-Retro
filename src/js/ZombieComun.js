
//ZombieComun
function ZombieComun(game, x, y, tag){
    Zombie.apply(this,[game, x, y, tag]);
    //Atributos propios
    //----------------
    this._life = 12;
    this._force = 1;
    this._vel = 50;
    //----------------
  }
  ZombieComun.prototype = Object.create(Zombie.prototype);
  ZombieComun.constructor = ZombieComun;