'use strict';

  // Inicializacion
  var zombie;
  var plants = [];
  var card;

  var PlayScene = {
  create: function () {
    var logo = this.game.add.sprite(
      this.game.world.centerX, this.game.world.centerY, 'logo');
    logo.anchor.setTo(0.5, 0.5);
    logo.scale.setTo(0.7);
    
    //Agregamos input del raton 
    //this.game.input.mouse.capture = true;

    //Zombie en Pantalla
    // this.planta=new LanzaGuisantes(this.game,500,300,'plants');
    // this.planta.anchor.setTo(0.5,1);

    this.zombie = new Zombie(this.game, 800, 300-100, "zombies");
    this.zombie.scale.setTo(1.8);
    
    card = new Card(this.game,0,64,"plants",LanzaGuisantes);

  },
  
  update: function (){
    this.zombie.move(1);
    //this.card.checkInput();


    //Movimiento de las plantas
    // for(let i = 0; i < plants.length; i++)
    //   plants[i].move();


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
  this.count = 0;
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

//CLASE Sun
function Sun (game, x, y, tag){
  Phaser.Button.apply(this,[game, x, y, tag]);
  
}
Sun.prototype = Object.create(Phaser.Button.prototype);
Sun.constructor =  Sun;

//CLASE Shovel
function Shovel (game, x, y, tag){
  Phaser.Button.Sprite.apply(this,[game, x, y, tag]);
  
}
Shovel.prototype = Object.create(Phaser.Button.prototype);
Shovel.constructor =  Shovel;

//CLASE Card
function Card (game, x, y, tag, funcionPlanta){
  Phaser.Button.apply(this,[game, x, y, tag,this.onClick,,1,0,]);
  this.game.world.addChild(this);
  this.createPlant = funcionPlanta;
  this.game.input.onDown.add(this.onClick,this);
}
Card.prototype = Object.create(Phaser.Button.prototype);
Card.constructor =  Card;
//Metodos
Card.prototype.onClick = function(){
  if(this.input.pointerOver()){
    plants.push(new this.createPlant(this.game, this.x,this.y,'plants'));
  }
}



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
  this._dam = dam;
}
Bullet.prototype = Object.create(GameObject.prototype);
Bullet.constructor = Bullet;


//CLASE PLANT
function Plant (game, x, y, tag){
  Character.apply(this,[game, x, y, tag]);
  //this.events.onInputDown.add(this.onDown,this);
  this.inputEnabled = true;
  this.input.enableDrag(true);
  this.input.enableSnap(64, 64, true, true);
  this.events.onDragStop.add(this.onDragStop, this);
}
Plant.prototype = Object.create(Character.prototype);
Plant.constructor = Plant;
//Metodos
Plant.prototype.canBePlaced = function() {
  return true;
}
Plant.prototype.placePlant = function(){  
}
Plant.prototype.onDragStop = function(){
  if(this.canBePlaced()){
    this.placePlant();
    this.input.enableSnap(64, 64, false, false);
    this.inputEnabled = false;
    this.input.enableDrag(false);
  }
  else{
    this.input.enableSnap(64, 64, false, false);
    this.inputEnabled = false;
    this.input.enableDrag(false);
    this.kill();
  }
}


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
