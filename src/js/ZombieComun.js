
//ZombieComun
function ZombieComun(game, x, y, spManager){
    Zombie.apply(this,[game, x, y, 'zombieComun', 200, 100, 14, 1, spManager]);

  }
  ZombieComun.prototype = Object.create(Zombie.prototype);
  ZombieComun.constructor = ZombieComun;