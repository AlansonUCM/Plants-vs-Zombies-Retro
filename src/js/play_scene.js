'use strict';

  var PlayScene = {
  create: function () {
    // var logo = this.game.add.sprite(
    //   this.game.world.centerX, this.game.world.centerY, 'logo');
    // logo.anchor.setTo(0.5, 0.5);
    // logo.scale.setTo(0.7);

    this.game.stage.backgroundColor = '#ffffff'

    this.cardSelector = new CardSelector(this.game, 0, 75, 128, 5,[],[]);
    this.board = new Board(this.game, 100, 128, 5, 5, 100);

    this.bulletPool = [];
    
    //Zombie en Pantalla
    this.zombie = new Zombie(this.game, 800, 300-100, "zombies", 1, 1);
    this.zombie.scale.setTo(1.8);    

    //Metodos de orden e interaccion entre cardSelector y Board
    this.game.deSelectAllCards = function(){
      this.state.getCurrentState().cardSelector.deSelectAll();
      this.state.getCurrentState().board.selectedPlant = null;
    }

    this.game.disableBoard = function(){
      this.state.getCurrentState().board.disableBoard();
    }

    this.game.ableBoard = function(){
      this.state.getCurrentState().board.ableBoard();
    }

    this.game.setSelectedPlant = function(plantRef){
      this.state.getCurrentState().board.selectedPlant = plantRef;
    }

    this.game.getSelectedPlant = function(){
      return this.state.getCurrentState().board.selectedPlant;
    }
    this.game.placePlant = function(newPlant){
      this.state.getCurrentState().board.plants.push(newPlant);
    }
  },
  
  update: function (){
    //Update de los Zombies
    this.zombie.updateZombie(50);

    //Update de las Plantas
    for(let i =0;i<this.board.plants.length;i++)
      this.board.plants[i].shoot();

    //Update de las Bullets
    for(let i = 0; i < this.bulletPool.length; i++)
      this.bulletPool[i].move();

    //Temporal (se comprobará cada zombie con cada planta de su fila)
    //Colision de Bullets con Zombies
    for(let i = 0; i < this.bulletPool.length; i++)      
      this.game.physics.arcade.collide(this.bulletPool[i],this.zombie,function bulletCollision(obj1,obj2) {    
        obj2.takeDamage(obj1._dam);
        obj1.Oncollision();
    });

    //Temporal (se comprobará cada zombie con cada planta de su fila)
    //Colision de Zombies con Plants
    for(let i = 0; i < this.board.plants.length; i++)
      this.game.physics.arcade.collide(this.zombie, this.board.plants[i], function zombieAttackPlant(obj1,obj2) { 
        if(obj1.x > obj2.x + obj2.width / 2) {
          var dam = obj1.attack();
          var obj2IsDead = obj2.takeDamage(dam);
          obj1.isAttacking = !obj2IsDead;}
    });
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
  Phaser.Button.apply(this,[game, x, y, tag, this.up, , 1, 0, 1]);
  this.game.world.addChild(this);
  this.isSelected = false;
  this.plantRef = funcionPlanta;
  //
  this.onInputUp.add(this.up, this);
}
Card.prototype = Object.create(Phaser.Button.prototype);
Card.constructor = Card;
//Metodos
Card.prototype.up = function(){
  if(this.input.pointerOver()){
    this.select();
    this.game.setSelectedPlant(this.plantRef);
  }
}
Card.prototype.select = function(){
  this.game.deSelectAllCards();

  this.isSelected = true;
  this.inputEnabled = false;
  this.freezeFrames = true;

  this.game.setSelectedPlant(this.plantRef);
  this.game.ableBoard();

  console.log("Card selected");
}
Card.prototype.deSelect = function(){
  this.isSelected = false; 
  this.freezeFrames = false;
  this.inputEnabled = true;
  console.log("Card deselected");
}

//Clase CardSelector
function CardSelector (game, xPos, yPos, yOffset, numCards,tagsArray,plantsArray){
  this.cards = [];
  for(let i = 0; i < numCards; i++)
    this.cards.push(new Card(game, xPos, yPos * i + yOffset, "plants", LanzaGuisantes));    // Se tendra que modificar mas tarde
}
CardSelector.constructor = CardSelector;
//Metodos de CardSelector
CardSelector.prototype.deSelectAll = function(){
  for(let i = 0; i < this.cards.length; i++)
    this.cards[i].deSelect();
};


//Clase Box
function Box (game, xPos, yPos){
  Phaser.Button.apply(this,[game, xPos, yPos, 'frame', this.onInputUp]);
  this.game.world.addChild(this);
  this.scale.setTo(0.5);
  this.alpha = 0.3;

  this.plantPlaced = false;

  this.x = xPos;
  this.y = yPos;

  this.inputEnabled = false;
  this.onInputOver.add(this.over, this);
  this.onInputOut.add(this.out, this);
  this.onInputUp.add(this.up, this);
  this.onInputDown.add(this.down,this);
}
Box.prototype = Object.create(Phaser.Button.prototype);
Box.constructor = Box;
//Metodos
Box.prototype.up = function(){
  console.log("casilla clickada");
  if(this.plantPlaced){
    console.log('lugar ya plantado');

    this.game.disableBoard();
    this.game.setSelectedPlant(null);

    this.game.deSelectAllCards();
  } else if(!this.plantPlaced && this.game.getSelectedPlant() != null){
    console.log('Planta plantada');

    //Habra que retocar para que dependiendo de la planta use un sprite u otro
    var plantType = this.game.getSelectedPlant();

    this.game.placePlant(new plantType(this.game, this.x,this.y,'plants',this.game.state.getCurrentState().bulletPool));    
    this.plantPlaced = true;

    this.game.disableBoard();
    this.game.deSelectAllCards();

  } else{
    console.log('Accion anulada');
    
    this.game.disableBoard();
    this.game.setSelectedPlant(null);

    this.game.deSelectAllCards();
  }
  this.scale.setTo(0.5);
}
Box.prototype.down = function(){
  this.scale.setTo(0.37);
}
Box.prototype.over = function(){
  this.scale.setTo(0.42);
}
Box.prototype.out = function(){
  this.scale.setTo(0.5);
}


//CLASE Board
function Board (game, _xPos, _yPos,numXBoxes, numYBoxes, _boxTam){
  this.boxes = [];
  this.plants = [];
  this.boxTam = _boxTam;

  this.selectedPlant = function(){};

  for(let i = 0; i < numXBoxes; i++){
    this.boxes.push([]);
    for(let j = 0;j < numYBoxes; j++)
      this.boxes[i].push(new Box(game, _xPos + this.boxTam* i, _yPos + this.boxTam* j));
  }
}
Board.constructor = Board;
//Metodos
Board.prototype.searchPlant = function(xPos, yPos){
  for(let i = 0; i < this.boxes.length; i++)
    for(let j = 0;j < this.boxes[i].length; j++)
      if(this.boxes[i][j].x == xPos && this.boxes[i][j].y == yPos)
        return this.boxes[i][j];
  console.log("Lugar no encontrado");
}

Board.prototype.disableBoard = function (){
  for(let i = 0; i < this.boxes.length; i++)
    for(let j = 0;j < this.boxes[i].length; j++)
      this.boxes[i][j].inputEnabled = false;
  
  this.selectedPlant = null;
  console.log('tablero desabilitado');
}

Board.prototype.ableBoard = function (){
  for(let i = 0; i < this.boxes.length; i++)
    for(let j = 0;j < this.boxes[i].length; j++)
      this.boxes[i][j].inputEnabled = true;
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

Bullet.prototype.move = function () {
  this.x += this._vel * this.game.time.elapsedMS/1000;
}


Bullet.prototype.Oncollision = function () {
  this.kill();
}

Bullet.prototype.relocate=function(dam,vel,x,y) {
  this.reset(x,y);
  this._dam = dam;
  this._vel = vel;
}

//CLASE PLANT
function Plant (game, x, y, tag, bulletPool){
  Character.apply(this,[game, x, y, tag]);
}
Plant.prototype = Object.create(Character.prototype);
Plant.constructor = Plant;
//Métodos
Plant.prototype.takeDamage = function(_damage){
  this._life -= _damage;
  if(this._life <= 0){
    var box = this.game.state.getCurrentState().board.searchPlant(this.x, this.y);
    box.plantPlaced = false;
    this.kill();
  }
  return !this.alive;
}


//Ejemplo LanzaGuisantes
function LanzaGuisantes(game, x, y, tag, bulletPool){
  Plant.apply(this,[game, x, y, tag, bulletPool]);

  //Atributos propios
  //----------------
  this._bulletPool = bulletPool;
  this.timeCount=0;
  this.firerate=1000;
  this.animations.add('try',[0,1,0],5,true);
  this.animations.add('shootin',[2,0],2,false);
  this._life = 3;
  this._force = 1;
  //----------------
  //this.animations.play('try');
}
LanzaGuisantes.prototype = Object.create(Plant.prototype);
LanzaGuisantes.constructor = LanzaGuisantes;
LanzaGuisantes.prototype.shoot=function(){
 //Mas tarde se añadira la condicion de que disparé solo si hay zombies enfrente suya
 if(this.alive){
    if(this.game.time.now > this.timeCount){
      if(this._bulletPool.length == 0) {
        this._bulletPool.push(new Bullet(this.game, this.x + 60, this.y + 13, 'bullet', 180, this._force));
        this._bulletPool[0].scale.setTo(2);
        this._bulletPool[0].kill();        
      }
      var i = 0;
      var shooted = false;
      while(i < this._bulletPool.length && !shooted) {      
      if(!this._bulletPool[i].alive){        
          this.animations.play('shootin');
          this._bulletPool[i].revive();
          this._bulletPool[i].relocate(this._force,180,this.x+60,this.y+13);
        
          shooted=true;    
        }
        i++
      }
      if(!shooted)   {
      this.animations.play('shootin');
      this._bulletPool.push(new Bullet(this.game, this.x + 60, this.y + 13, 'bullet', 180, this._force));   
      this._bulletPool[i].scale.setTo(2);
      }
      this.timeCount=this.game.time.now + this.firerate;
    }  
  }
}


//CLASE ZOMBIE
function Zombie (game, x, y, tag, _damage, _attacksPerSec){
  Character.apply(this,[game, x, y, tag]);
  //this.game.add.sprite(100,100,tag);
  this._life = 12;
  this.damage = _damage; 
  this.attacksPerSec = _attacksPerSec;
  this.isAttacking = false;
  this.timeCount = 0;

  this.animations.add('move',[0,1,0]);
  this.animations.play('move',5,true);
}
Zombie.prototype = Object.create(Character.prototype);
Zombie.constructor = Zombie;

// Metodos en Zombies
Zombie.prototype.move = function (_velocity) {
  this.x -= _velocity * this.game.time.elapsedMS/1000;
}
Zombie.prototype.takeDamage = function (damage) {
  this._life -= damage;
  if(this._life <= 0)
    this.kill();
}
Zombie.prototype.attack = function () {
  this.isAttacking = true;
  if(this.timeCount > 1000 / this.attacksPerSec){    
    this.timeCount += this.game.time.elapsedMS;
    return this.damage;
  }
  else{
    this.timeCount += this.game.time.elapsed;
    return 0;
  } 
}
Zombie.prototype.updateZombie = function(_velocity){
  if(!this.isAttacking){
    if(this.timeCount > 0)
      this.timeCount = 0;
    this.move(_velocity);
  }else{
    //Animacion de atacar
    //------------
    console.log("Zombie parado para ataca");
  }
}




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

module.exports = PlayScene;
