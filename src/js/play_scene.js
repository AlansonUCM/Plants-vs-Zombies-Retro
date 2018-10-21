'use strict';

  var PlayScene = {
  create: function () {
    var logo = this.game.add.sprite(
      this.game.world.centerX, this.game.world.centerY, 'logo');
    logo.anchor.setTo(0.5, 0.5);
    logo.scale.setTo(0.7, 0.7);
  }
};
//CLASE ScreenObj
function ScreenObj (xPant,yPant){
  Phaser.Sprite.apply(this,[]);
  this._xPant = xPant;
  this._yPant = yPant;
}
ScreenObj.prototype = Object.create( Phaser.Sprite.prototype);
ScreenObj.prototype.constructor = ScreenObj;

//CLASE Score
function Score (xPant,yPant){
  ScreenObj.Sprite.apply(this,[xPant,yPant]);
  this.count=0;
}
Score.prototype = Object.create(ScreenObj.prototype);
Score.prototype.constructor = Score;

//CLASE ProgressBar
function ProgressBar (xPant,yPant){
  ScreenObj.Sprite.apply(this,[xPant,yPant]);
  this.time=0;
}
ProgressBar.prototype = Object.create(ScreenObj.prototype);
ProgressBar.prototype.constructor = ProgressBar;

//CLASE Button
function Button (xPant,yPant){
  ScreenObj.Sprite.apply(this,[xPant,yPant]);
  
}
Button.prototype = Object.create(ScreenObj.prototype);
Button.prototype.constructor =  Button;

//CLASE Sun
function Sun (xPant,yPant){
  ScreenObj.Sprite.apply(this,[xPant,yPant]);
  
}
Sun.prototype = Object.create(Button.prototype);
Sun.prototype.constructor =  Sun;

//CLASE Shovel
function Shovel (xPant,yPant){
  ScreenObj.Sprite.apply(this,[xPant,yPant]);
  
}
Shovel.prototype = Object.create(Button.prototype);
Shovel.prototype.constructor =  Shovel;

//CLASE Card
function Card (xPant,yPant){
  ScreenObj.Sprite.apply(this,[xPant,yPant]);
  
}
Card.prototype = Object.create(Button.prototype);
Card.prototype.constructor =  Card;



//CLASE GameObject
function GameObject (xT,yT,xPant,yPant){
  ScreenObj.apply(this,[xPant,yPant]);
  this._xT = xT;
  this._yT = yT;
}
GameObject.prototype = Object.create(ScreenObj.prototype);
GameObject.prototype.constructor = GameObject;

//CLASE Character
function Character (name,xT,yT,xPant,yPant){
  GameObject.apply(this,[xT,yT,xPant,yPant]);
  this._name = name;
  this._life = 0;
  this._force = 0;
}
Character.prototype = Object.create(GameObject.prototype);
Character.prototype.constructor = Character;

//CLASE BULLET
function Bullet (vel,dam,xT,yT,xPant,yPant){
  GameObject.apply(this,[xT,yT,xPant,yPant]);
  this._vel = vel;
  this._dam=dam;
}
Bullet.prototype = Object.create(GameObject.prototype);
Bullet.prototype.constructor = Bullet;


//CLASE PLANT
function Plant (name ,xT,yT,xPant,yPant){
  Character.apply(this,[name,xT,yT,xPant,yPant]);
  
}
Plant.prototype = Object.create(Character.prototype);
Plant.prototype.constructor = Plant;

//Ejemplo LanzaGuisantes
function LanzaGuisantes(name,xT,yT,xPant,yPant){
  Plant.apply(this,[name,xT,yT,xPant,yPant]);
  //Atributos propios
  //----------------
  this._life=3;
  this._force=1;
  //----------------
}
LanzaGuisantes.prototype = Object.create(Plant.prototype);
LanzaGuisantes.prototype.constructor = LanzaGuisantes;

//CLASE ZOMBIE
function Zombie (name,xT,yT,xPant,yPant){
  Character.apply(this,[name,xT,yT,xPant,yPant]);
}
Zombie.prototype = Object.create(Character.prototype);
Zombie.prototype.constructor = Zombie;

//Ejemplo ZombieComun
function ZombieComun(name,xT,yT,xPant,yPant){
  Zombie.apply(this,[name,xT,yT,xPant,yPant]);
  //Atributos propios
  //----------------
  this._life=12;
  this._force=1;
  //----------------
}
ZombieComun.prototype = Object.create(Zombie.prototype);
ZombieComun.prototype.constructor = ZombieComun;

module.exports = PlayScene;
