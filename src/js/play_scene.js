'use strict';

  // Inicializacion
  var zombie;

  var PlayScene = {
  create: function () {
    var logo = this.game.add.sprite(
      this.game.world.centerX, this.game.world.centerY, 'logo');
    logo.anchor.setTo(0.5, 0.5);
    logo.scale.setTo(0.7);

    //Zombie en Pantalla
    zombie = new Zombie(this.game, this.game.world.centerX, this.game.world.centerY, "zombies");
    zombie.scale.setTo(0.5);
    // var walk = zombie.animations.add("walk");
    // zombie.animations.play("walk",30,true);
  },
  update: function (){
    zombie.x -= 55;
    // zombie.move(5);
  },
  render: function (){
  }
};


//CLASE ScreenObj
function ScreenObj (game, x, y, tag){
  Phaser.Sprite.apply(this,[game, x, y, tag]);
}
ScreenObj.prototype = Object.create(Phaser.Sprite.prototype);
ScreenObj.prototype.constructor = ScreenObj;

//CLASE Score
function Score (){
  ScreenObj.Sprite.apply(this,[]);
  this.count=0;
}
Score.prototype = Object.create(ScreenObj.prototype);
Score.prototype.constructor = Score;

//CLASE ProgressBar
function ProgressBar (){
  ScreenObj.Sprite.apply(this,[]);
  this.time = 0;
}
ProgressBar.prototype = Object.create(ScreenObj.prototype);
ProgressBar.prototype.constructor = ProgressBar;

//CLASE Button
function Button (){
  ScreenObj.Sprite.apply(this,[]);
  
}
Button.prototype = Object.create(ScreenObj.prototype);
Button.prototype.constructor =  Button;

//CLASE Sun
function Sun (){
  ScreenObj.Sprite.apply(this,[]);
  
}
Sun.prototype = Object.create(Button.prototype);
Sun.prototype.constructor =  Sun;

//CLASE Shovel
function Shovel (){
  ScreenObj.Sprite.apply(this,[]);
  
}
Shovel.prototype = Object.create(Button.prototype);
Shovel.prototype.constructor =  Shovel;

//CLASE Card
function Card (){
  ScreenObj.Sprite.apply(this,[]);  
}
Card.prototype = Object.create(Button.prototype);
Card.prototype.constructor =  Card;


//CLASE GameObject
function GameObject (game, x, y, tag){
  ScreenObj.apply(this, [game, x, y, tag]);
}
GameObject.prototype = Object.create(ScreenObj.prototype);
GameObject.prototype.constructor = GameObject;

//CLASE Character
function Character (game, x, y, tag){
  GameObject.apply(this, [game, x, y, tag]);
  this._name = name;
  this._life = 0;
  this._force = 0;
}
Character.prototype = Object.create(GameObject.prototype);
Character.prototype.constructor = Character;

//CLASE BULLET
function Bullet (vel,dam){
  GameObject.apply(this,[]);
  this._vel = vel;
  this._dam=dam;
}
Bullet.prototype = Object.create(GameObject.prototype);
Bullet.prototype.constructor = Bullet;


//CLASE PLANT
function Plant (game, x, y, tag){
  Character.apply(this,[game, x, y, tag]);
  
}
Plant.prototype = Object.create(Character.prototype);
Plant.prototype.constructor = Plant;

//Ejemplo LanzaGuisantes
function LanzaGuisantes(game, x, y, tag){
  Plant.apply(this,[game, x, y, tag]);
  //Atributos propios
  //----------------
  this._life = 3;
  this._force = 1;
  //----------------
}
LanzaGuisantes.prototype = Object.create(Plant.prototype);
LanzaGuisantes.prototype.constructor = LanzaGuisantes;

//CLASE ZOMBIE
function Zombie (game, x, y, tag){
  Character.apply(this,[game, x, y, tag]);
  this.game.add.sprite(100,100,tag);
}
Zombie.prototype = Object.create(Character.prototype);
Zombie.prototype.constructor = Zombie;
// Metodos en Zombies
Zombie.prototype.move = function (velocity) {
  this.x -= velocity;
}

//Ejemplo ZombieComun
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
ZombieComun.prototype.constructor = ZombieComun;

module.exports = PlayScene;
