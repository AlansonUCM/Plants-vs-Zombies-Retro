'use strict';

  // Inicializacion
  var cardSelector;
  var board;

  var PlayScene = {
  create: function () {
    // var logo = this.game.add.sprite(
    //   this.game.world.centerX, this.game.world.centerY, 'logo');
    // logo.anchor.setTo(0.5, 0.5);
    // logo.scale.setTo(0.7);


    this.game.stage.backgroundColor = '#ffffff'

    cardSelector = new CardSelector(this.game, 0, 75, 128, 5,[],[])
    board = new Board(this.game, 100, 128, 5, 5, 100);
    // board.desableBoard();
  },
  
  update: function (){
    // this.zombie.move(1);

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
  Phaser.Button.apply(this,[game, x, y, tag, this.onClick, , 1, 0, 1]);
  this.game.world.addChild(this);
  this.isSelected = false;
  this.selectedPlant = funcionPlanta;
  this.game.input.onUp.add(this.onClick, this);
}
Card.prototype = Object.create(Phaser.Button.prototype);
Card.constructor = Card;
//Metodos
Card.prototype.onClick = function(){
  if(this.input.pointerOver()){
    this.select();
    board.selectedPlant = this.selectedPlant;
    // this.inputEnabled = false;
    // plants.push(new this.createPlant(this.game, this.x,this.y,'plants'));
  }
}
Card.prototype.select = function(){
  cardSelector.deSelectAll();
  this.isSelected = true;
  this.inputEnabled = false;
  this.freezeFrames = true;
  board.selectedPlant = this.selectedPlant;
  board.ableBoard();
  console.log("Card selected");
}
Card.prototype.deSelect = function(){
  this.isSelected = false; 
  this.freezeFrames = false;
  this.inputEnabled = true;
  board.selectedPlant = null;
  console.log("Card deselected");
}

//Clase CardSelector
function CardSelector (game, xPos, yPos, yOffset, numCards,tagsArray,plantsArray){
  this.cards = [];
  for(let i = 0; i < numCards; i++)
    this.cards.push(new Card(game, xPos, yPos * i + yOffset, "plants", LanzaGuisantes));
}
CardSelector.constructor = CardSelector;
//Metodos de CardSelector
CardSelector.prototype.deSelectAll = function(){
  for(let i = 0; i < this.cards.length; i++)
    this.cards[i].deSelect();
}



//Clase Box
function Box (game, xPos, yPos){
  Phaser.Button.apply(this,[game, xPos, yPos, 'frame', this.onClick]);
  this.game.world.addChild(this);
  this.scale.setTo(0.5);
  this.alpha = 0.3;

  this.plantPlaced = false;

  this.x = xPos;
  this.y = yPos;

  //this.inputEnabled = false;
}
Box.prototype = Object.create(Phaser.Button.prototype);
Box.constructor = Box;
//Metodos
Box.prototype.onClick = function(){
  console.log("casilla clickada");
  if(this.plantPlaced){
    console.log('lugar ya plantado');
    //board.desableBoard();
    board.selectedPlant = null;
    cardSelector.deSelectAll();
  }
  else if(!this.plantPlaced && board.selectedPlant != null){
    //Habra que retocar para que dependiendo de la planta use un sprite u otro
    board.plants.push(new board.selectedPlant(this.game, this.x,this.y,'plants'));
    this.plantPlaced = true;
    //board.desableBoard();
  }
  else{
    board.selectedPlant = null;
    cardSelector.deSelectAll();
  }

}

//CLASE Board
function Board (game, xPos, yPos,numXBoxes, numYBoxes, boxTam){
  this.boxes = [];
  this.plants = [];

  this.selectedPlant = function(){};

  for(let i = 0; i < numXBoxes; i++){
    this.boxes.push([]);
    for(let j = 0;j < numYBoxes; j++)
      this.boxes[i].push(new Box(game, xPos + boxTam* i, yPos + boxTam* j));
  }
}
Board.constructor = Board;
//Metodos
Board.prototype.desableBoard = function (){
  for(let i = 0; i < this.boxes.length; i++)
    this.boxes[i].inputEnabled = false;
  
  this.selectedPlant = null;
  console.log('tablero desabilitado');
}
Board.prototype.ableBoard = function (){
  for(let i = 0; i < this.boxes.length; i++)
    this.boxes[i].inputEnabled = true;
  console.log("Tablero preparado para posicionar planta")
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
