
//ZombieComun
function ZombieComun(game, x, y, spManager){
    Zombie.apply(this,[game, x, y, 'zombieComun', 12, 1, 30, 1, spManager]);

  }
  ZombieComun.prototype = Object.create(Zombie.prototype);
  ZombieComun.constructor = ZombieComun;