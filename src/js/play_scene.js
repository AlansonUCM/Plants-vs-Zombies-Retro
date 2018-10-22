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
    this.planta=new LanzaGuisantes(this.game,500,300,'plants');
    this.planta.anchor.setTo(0.5,1);

    zombie = new Zombie(this.game, 800, 300-100, "zombies", 0);
   // this.game.world.addChild(zombie)
    zombie.scale.setTo(1.8);
    
   


  },
  update: function (){
    zombie.move(1);
    this.planta.animations.play('try');
  },
  render: function (){
  }
};


//CLASE ScreenObj
function ScreenObj (game, x, y, tag){
  Phaser.Sprite.call(this,game, x, y, tag);

  this.game.world.addChild(this);

}
ScreenObj.prototype = Object.create(Phaser.Sprite.prototype);
ScreenObj.constructor = ScreenObj;

//CLASE Score
function Score (game, x, y, tag){
  ScreenObj.Sprite.apply(this,[game, x, y, tag]);
  this.count=0;
}
Score.prototype = Object.create(ScreenObj.prototype);
Score.constructor = Score;

//CLASE ProgressBar
function ProgressBar (game, x, y, tag){
  ScreenObj.Sprite.apply(this,[game, x, y, tag]);
  this.time = 0;
}
ProgressBar.prototype = Object.create(ScreenObj.prototype);
ProgressBar.constructor = ProgressBar;

//CLASE Button
function Button (game, x, y, tag){
  ScreenObj.Sprite.apply(this,[game, x, y, tag]);
  this.game.physics.arcade.enable(this)
}
Button.prototype = Object.create(ScreenObj.prototype);
Button.constructor =  Button;

//CLASE Sun
function Sun (game, x, y, tag){
  ScreenObj.Sprite.apply(this,[game, x, y, tag]);
  
}
Sun.prototype = Object.create(Button.prototype);
Sun.constructor =  Sun;

//CLASE Shovel
function Shovel (game, x, y, tag){
  ScreenObj.Sprite.apply(this,[game, x, y, tag]);
  
}
Shovel.prototype = Object.create(Button.prototype);
Shovel.constructor =  Shovel;

//CLASE Card
function Card (game, x, y, tag){
  ScreenObj.Sprite.apply(this,[game, x, y, tag]);  
}
Card.prototype = Object.create(Button.prototype);
Card.constructor =  Card;


//CLASE GameObject
function GameObject (game, x, y, tag ){
  ScreenObj.apply(this, [game, x, y, tag]);
  this.game.physics.arcade.enable(this)
}
GameObject.prototype = Object.create(ScreenObj.prototype);
GameObject.constructor = GameObject;

//CLASE Character
function Character (game, x, y, tag){
  GameObject.apply(this, [game, x, y, tag]);
  this._name = name;
  this._life = 0;
  this._force = 0;
}
Character.prototype = Object.create(GameObject.prototype);
Character.constructor = Character;

//CLASE BULLET
function Bullet (game, x, y, tag,vel,dam){
  GameObject.apply(this,[game, x, y, tag]);
  this._vel = vel;
  this._dam=dam;
}
Bullet.prototype = Object.create(GameObject.prototype);
Bullet.constructor = Bullet;


//CLASE PLANT
function Plant (game, x, y, tag){
  Character.apply(this,[game, x, y, tag]);
  
}
Plant.prototype = Object.create(Character.prototype);
Plant.constructor = Plant;

//Ejemplo LanzaGuisantes
function LanzaGuisantes(game, x, y, tag){
  Plant.apply(this,[game, x, y, tag]);
  //Atributos propios
  //----------------
  this.animations.add('try',[0,1,0],5,true);
  this._life = 3;
  this._force = 1;
  //----------------
}
LanzaGuisantes.prototype = Object.create(Plant.prototype);
LanzaGuisantes.constructor = LanzaGuisantes;

//CLASE ZOMBIE
function Zombie (game, x, y, tag){
  Character.apply(this,[game, x, y, tag]);
  //this.game.add.sprite(100,100,tag);
  this.animations.add('move',[0,1,0]);
  this.animations.play('move',5,true);
}
Zombie.prototype = Object.create(Character.prototype);
Zombie.constructor = Zombie;
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
ZombieComun.constructor = ZombieComun;

module.exports = PlayScene;
