'use strict';

  var PlayScene = {
  create: function () {
    var logo = this.game.add.sprite(
      this.game.world.centerX, this.game.world.centerY, 'logo');
    logo.anchor.setTo(0.5, 0.5);
  }
};

//CLASE PLANT
function Plant (name, life){
  Sprite.apply(this,[]);
  this._name = name;
  this._life = life;
}
Plant.prototype = Object.create(Sprite.prototype);
Plant.prototype.constructor = Plant;

//Ejemplo LanzaGuisantes
function LanzaGuisantes(name, life){
  Plant.apply(this,[name, life]);
  //Atributos propios
  //----------------
  //----------------
}
LanzaGuisantes.prototype = Object.create(Plant.prototype);
LanzaGuisantes.prototype.constructor = LanzaGuisantes;

//CLASE ZOMBIE
function Zombie (name, life){
  Sprite.apply(this,[]);
  this._name = name;
  this._life = life;
}
Zombie.prototype = Object.create(Sprite.prototype);
Zombie.prototype.constructor = Plant;

//Ejemplo ZombieComun
function ZombieComun(name, life){
  Zombie.apply(this,[name, life]);
  //Atributos propios
  //----------------
  //----------------
}
ZombieComun.prototype = Object.create(Zombie.prototype);
ZombieComun.prototype.constructor = ZombieComun;

module.exports = PlayScene;
