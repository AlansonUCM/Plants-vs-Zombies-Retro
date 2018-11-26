'use strict';

  var PlayScene = {
  create: function () {
    // var logo = this.game.add.sprite(
    //   this.game.world.centerX, this.game.world.centerY, 'logo');
    // logo.anchor.setTo(0.5, 0.5);
    // logo.scale.setTo(0.7);

    this.game.stage.backgroundColor = '#ffffff'

    this.bulletPool = [];
    this.sunPool = [];

    //this.board = new Board(this.game, 100, 128, 5, 5, 100);
    this.spManager = new SPManager(this.game, this.bulletPool, this.sunPool, 4);
    
    //Zombie en Pantalla
    this.zombie = new Zombie(this.game, 800, 300-100, "zombies", 1, 30, 1);
    this.zombie.scale.setTo(1.8); 
    
    //Cursor Changer
    this.game.cursor = new CursorSprite(this.game, 0, 0, undefined);

  },
  
  update: function (){

    //Update de los Zombies
    this.zombie.updateZombie();

    //Update de las Plantas
    for(let i =0;i<this.spManager.board.plants.length;i++)
      this.spManager.board.plants[i].shoot(this.bulletPool);

    //Update de las Bullets
    for(let i = 0; i < this.bulletPool.length; i++)
      this.bulletPool[i].move();;

    //Update de SPManager
    this.spManager.updateSPM();

    //Temporal (se comprobará cada zombie con cada planta de su fila)
    //Colision de Bullets con Zombies
    for(let i = 0; i < this.bulletPool.length; i++)      
      this.game.physics.arcade.collide(this.bulletPool[i],this.zombie,function bulletCollision(obj1,obj2) {    
        obj2.takeDamage(obj1._dam);
        obj1.Oncollision();
    });

    //Temporal (se comprobará cada zombie con cada planta de su fila)
    //Colision de Zombies con Plants
    for(let i = 0; i < this.spManager.board.plants.length; i++)
      this.game.physics.arcade.collide(this.zombie, this.spManager.board.plants[i], function zombieAttackPlant(obj1,obj2) { 
        if(obj1.x > obj2.x + obj1.width / 2) {
          var dam = obj1.attack();
          var obj2IsDead = obj2.takeDamage(dam);
          obj1.isAttacking = !obj2IsDead;}
    });
  },
  render: function (){
    this.game.cursor.renderMC();
  }
};


//Clase MouseChanger
function CursorSprite(game, x, y, tag){
  Phaser.Sprite.call(this, game, x, y, tag);
  this.game.world.addChild(this);

  this.alpha = 0.6;
  this.anchor.setTo(0.5);
}
CursorSprite.prototype = Object.create(Phaser.Sprite.prototype);
CursorSprite.constructor = CursorSprite;
//Metodos
CursorSprite.prototype.renderMC = function (){
  if(this.key != null){
    this.x = this.game.input.activePointer.x;
    this.y = this.game.input.activePointer.y;
  }
  
  //Solo si queremos que el cursor por defecto desaparezca
  // if(this.game.canvas.style.cursor != "none")
  //   this.game.canvas.style.cursor = "none";
}
CursorSprite.prototype.changeSprite = function(_tag){
  this.loadTexture(_tag);
}
CursorSprite.prototype.clearCursor = function (){
  this.changeSprite(undefined);
}


//CLASE CanvasObject
function CanvasObject (game, x, y, tag){
  Phaser.Sprite.call(this,game, x, y, tag);
  this.game.world.addChild(this);
}
CanvasObject.prototype = Object.create(Phaser.Sprite.prototype);
CanvasObject.constructor = CanvasObject;

//CLASE Score
function Score (game, x, y, tag){
  CanvasObject.apply(this,[game, x, y, tag]);
  this.count = 0;
}
Score.prototype = Object.create(CanvasObject.prototype);
Score.constructor = Score;

//CLASE ProgressBar
function ProgressBar (game, x, y, tag){
  CanvasObject.apply(this,[game, x, y, tag]);
  this.time = 0;
}
ProgressBar.prototype = Object.create(CanvasObject.prototype);
ProgressBar.constructor = ProgressBar;

//CLASE Sun
function Sun (game, x, y, tag, _value, _spManager){
  Phaser.Button.apply(this,[game, x, y, tag]);  
  this.game.world.addChild(this);

  this.anchor.setTo(0.5, 0);
  this.scale.setTo(0.05);

  this.velocity = 100;
  this.value = _value; //Pixeles/seg
  
  //Ref al manager
  this.spManager = _spManager;
  //Por ser boton
  this.onInputOver.add(this.over, this);
  this.onInputOut.add(this.out, this);
  this.onInputUp.add(this.up, this);
  this.onInputDown.add(this.down,this);

  this.kill();
}
Sun.prototype = Object.create(Phaser.Button.prototype);
Sun.constructor =  Sun;

//Metodos
Sun.prototype.fall = function(){
  if(this.alive){
    this.y += this.velocity * this.game.time.elapsedMS / 1000;
    //Si esta fuera de pantalla se mata
    if(this.y > this.game.world._height){
      this.kill();
      console.log('Sol ha muerto fuera del campo de vision');
    }
  }
}

Sun.prototype.over = function (){
  //Hará algo, a lo mejor hacemos que con que el cursor pase por encima, ya recoja el sol
  this.spManager.addSunPoints(this.takeSun());
  console.log('Sol recogido y suma realizada');
}
Sun.prototype.down = function(){
  //Hara algo, o no
}
Sun.prototype.out = function(){
  //No creo que haga algo
}
Sun.prototype.up = function(){
  //Probablemente coja el sol
}
Sun.prototype.takeSun = function(){
  //El sol debe ir al contador
  this.goToCounter();
  return this.value;
}
Sun.prototype.goToCounter = function() {
  var tween = this.game.add.tween(this).to({x:this.spManager.sunCounter.x, y: this.spManager.sunCounter.y}, 500, Phaser.Easing.Defaul, true);
  tween.onComplete.addOnce(this.kill, this);
}
Sun.prototype.drop = function(_xPos, _yPos){
  this.velocity = 0;
  this.reset(_xPos, _yPos);
  var tween = this.game.add.tween(this).to({y: _yPos + 25}, 1500, Phaser.Easing.Bounce.In, true);
}
Sun.prototype.reSpawn = function(){
  this.velocity = 100;
  var xSpw = this.game.rnd.integerInRange(this.game.world._width/3, this.game.world._width);
  this.reset(xSpw, -25);
}

//Clase SunCounter
function SunCounter (game, x, y, tag){ 
  Phaser.Sprite.call(this, game, x, y, tag);
  this.game.world.addChild(this);

  //Temporal(solo visual para ver que funciona)
  this.scale.setTo(0.05);
  this.anchor.setTo(0.35, 0.5);

  this.points = 0;

  this.text = game.add.text(x + 5, y + 30, "" + this.points, { font: "24px Arial", fill: "#000000", align: "center" });
  this.text.anchor.setTo(0.5, 0);
}
SunCounter.prototype = Object.create(CanvasObject.prototype);
SunCounter.constructor =  SunCounter;
//Metodos
SunCounter.prototype.updateCounter = function(){
  this.text.text = "" + this.points;
}

//Clase SPManager
function SPManager (_game, _bulletPool, _sunPool, _timeToSpawnSun){  
  this.game = Object.create(_game);
  
  this.sunCounter = new SunCounter(_game, 30, 30, 'sun');  
  this.cardSelector = new CardSelector(_game, 0, 75, 128, 5,[],[], this);
  this.board = new Board(_game, 100, 128, 5, 5, 100, this);

  //Pools
  this.sunPool = _sunPool;
  this.bulletPool = _bulletPool;

  this.timeToSpawnSun = _timeToSpawnSun;

  this.timeCount = 0;
}
SPManager.constructor =  SPManager;
//Metodos
SPManager.prototype.updateSPM = function(){ 
  this.sunSpawnControl();
  this.updateSuns();
}

SPManager.prototype.sunSpawnControl = function(){
  //Control de Spawn
  if(this.timeCount >= this.timeToSpawnSun){
    //SpawnSun
    console.log('Sol Spawnea');
    //Implementacion    
    //Busca el primer sol disponible que pueda desplegarse
    var i = 0;
    var isFound = false;
    while(i < this.sunPool.length && !isFound){
      if(this.sunPool[i].alive)
        i++;
      else
        isFound = true;
    }      
    //Si no encuentra algun sol, entonces lo crea y lo spawnea
    if(!isFound){
      this.sunPool.push(new Sun(this.game, this.game.world._width, -20, 'sun', 20, this));
      this.sunPool[this.sunPool.length - 1].reSpawn();
    }
    //Si lo encuentra, lo Spawnea
    else if(isFound)
      this.sunPool[i].reSpawn();
    //--------------
    this.timeCount = 0;
  }
  this.timeCount += this.game.time.elapsedMS / 1000;
}

SPManager.prototype.updateSuns = function(){
 //Update de los soles
 for(let i = 0; i < this.sunPool.length; i++)
  this.sunPool[i].fall();
}

SPManager.prototype.addSunPoints = function(_points){
  this.sunCounter.points += _points;
  //Actualiza visualmente los soles
  this.sunCounter.updateCounter();
  //console.log('SunPoints: ' + this.sunCounter.points);
}

//CLASE Shovel
function Shovel (game, x, y, tag){
  Phaser.Button.Sprite.apply(this,[game, x, y, tag]);  
}
Shovel.prototype = Object.create(Phaser.Button.prototype);
Shovel.constructor =  Shovel;

//CLASE Card
function Card (game, x, y, tag, funcionPlanta, _cardSelector){
  Phaser.Button.apply(this,[game, x, y, tag, this.up, , 1, 0, 1]);
  this.game.world.addChild(this);
  this.isSelected = false;
  this.plantRef = funcionPlanta;
  this.plantRef.cost = funcionPlanta.cost;

  this.cardSelector = _cardSelector;

  this.onInputUp.add(this.up, this);
}
Card.prototype = Object.create(Phaser.Button.prototype);
Card.constructor = Card;
//Metodos
Card.prototype.up = function(){
  if(this.input.pointerOver()){
    if(this.plantRef.cost <= this.cardSelector.spManager.sunCounter.points){
      this.select();
      this.cardSelector.spManager.board.selectedPlant = this.plantRef;
    }
    else
      console.log('No tienes suficientes puntos');
  }
}
Card.prototype.select = function(){
  this.cardSelector.deSelectAll();

  this.isSelected = true;
  this.inputEnabled = false;
  this.freezeFrames = true;

  this.game.cursor.changeSprite(this.key);

  this.cardSelector.spManager.board.selectedPlant = this.plantRef;
  this.cardSelector.spManager.board.ableBoard();

  console.log("Card selected");
}
Card.prototype.deSelect = function(){
  this.isSelected = false; 
  this.freezeFrames = false;
  this.inputEnabled = true;
  console.log("Card deselected");
}

//Clase CardSelector
function CardSelector (game, xPos, yPos, yOffset, numCards,tagsArray,plantsArray, _spManager){
  this.cards = [];

  this.game = game;
  this.spManager = _spManager;
  
  //Temporal
  var tempTagsArray = ['plants','giraSol','giraSol','plants','plants'];
  var tempPlantsArray =[LanzaGuisantes, GiraSol, GiraSol, LanzaGuisantes, LanzaGuisantes];

  for(let i = 0; i < numCards; i++)
    this.cards.push(new Card(game, xPos, yPos * i + yOffset, tempTagsArray[i], tempPlantsArray[i], this));    // Se tendra que modificar mas tarde
}
CardSelector.constructor = CardSelector;
//Metodos de CardSelector
CardSelector.prototype.deSelectAll = function(){
  this.game.cursor.clearCursor();
  for(let i = 0; i < this.cards.length; i++)
    this.cards[i].deSelect();
};


//Clase Box
function Box (game, xPos, yPos, _boardRef){
  Phaser.Button.apply(this,[game, xPos, yPos, 'frame', this.onInputUp]);
  this.game.world.addChild(this);
  this.scale.setTo(0.5);
  this.alpha = 0.3;

  this.plantPlaced = false;

  this.boardRef = _boardRef;

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
  this.game.cursor.clearCursor();

  if(this.plantPlaced){
    console.log('lugar ya plantado');

    this.boardRef.disableBoard();
    this.boardRef.selectedPlant = null;

    this.boardRef.cardSelectorRef.deSelectAll();
  } else if(!this.plantPlaced && this.boardRef.selectedPlant != null){
    console.log('Planta plantada');

    //Habra que retocar para que dependiendo de la planta use un sprite u otro
    var plantType = this.boardRef.selectedPlant;

    this.boardRef.plants.push(new plantType(this.game, this.x, this.y, this.boardRef));    
    this.plantPlaced = true;

    this.boardRef.disableBoard();
    this.boardRef.spManager.cardSelector.deSelectAll();

    //Al crearse debe quitar el coste 
    this.boardRef.spManager.sunCounter.points -= plantType.cost;
    this.boardRef.spManager.sunCounter.updateCounter();

  } else{
    console.log('Accion anulada');
    
    this.boardRef.disableBoard();
    this.boardRef.selectedPlant = null;

    this.boardRef.spManager.cardSelector.deSelectAll();
  }
  this.scale.setTo(0.5);
}
Box.prototype.down = function(){
  this.scale.setTo(0.37);
}
Box.prototype.over = function(){
  if(!this.plantPlaced)
    this.scale.setTo(0.42);
}
Box.prototype.out = function(){
  this.scale.setTo(0.5);
}


//CLASE Board
function Board (game, _xPos, _yPos,numXBoxes, numYBoxes, _boxTam, _spManager){
  this.boxes = [];
  this.plants = [];
  this.boxTam = _boxTam;

  this.spManager = _spManager;

  this.selectedPlant = function(){};

  for(let i = 0; i < numXBoxes; i++){
    this.boxes.push([]);
    for(let j = 0;j < numYBoxes; j++)
      this.boxes[i].push(new Box(game, _xPos + this.boxTam* i, _yPos + this.boxTam* j, this));
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
  CanvasObject.apply(this, [game, x, y, tag]);
  this.game.physics.arcade.enable(this)
}
GameObject.prototype = Object.create(CanvasObject.prototype);
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
function Plant (game, x, y, tag, _boardRef){
  Character.apply(this,[game, x, y, tag, _boardRef]);

  this.boardRef = _boardRef;

  this.timeCount = 0;
}
Plant.prototype = Object.create(Character.prototype);
Plant.constructor = Plant;
//Métodos
Plant.prototype.takeDamage = function(_damage){
  this._life -= _damage;
  if(this._life <= 0){
    var box = this.boardRef.searchPlant(this.x, this.y);
    box.plantPlaced = false;
    //Probablemente sea mejor un Destroy(); porque no se vuelve a usar la planta
    this.kill();
  }
  return !this.alive;
}


//Ejemplo LanzaGuisantes
function LanzaGuisantes(game, x, y, _boardRef){
  Plant.apply(this,[game, x, y, 'plants', _boardRef]);

  //Atributos propios
  //----------------
  this.firerate = 1000;
  this.animations.add('try',[0,1,0],5,true);
  this.animations.add('shootin',[2,0],2,false);
  this._life = 3;
  this._force = 1;
  //----------------
  //this.animations.play('try');
}
LanzaGuisantes.prototype = Object.create(Plant.prototype);
LanzaGuisantes.constructor = LanzaGuisantes;
//Metodos
LanzaGuisantes.cost = 20;
LanzaGuisantes.prototype.shoot=function(_bulletPool){
 //Mas tarde se añadira la condicion de que disparé solo si hay zombies enfrente suya
 if(this.alive){
    if(this.game.time.now > this.timeCount){
      if(_bulletPool.length == 0) {
        _bulletPool.push(new Bullet(this.game, this.x + 60, this.y + 13, 'bullet', 180, this._force));
        _bulletPool[0].scale.setTo(2);
        _bulletPool[0].kill();        
      }
      var i = 0;
      var shooted = false;
      while(i < _bulletPool.length && !shooted) {      
      if(!_bulletPool[i].alive){        
          this.animations.play('shootin');
          _bulletPool[i].revive();
          _bulletPool[i].relocate(this._force,180,this.x+60,this.y+13);
        
          shooted=true;    
        }
        i++
      }
      if(!shooted)   {
      this.animations.play('shootin');
      _bulletPool.push(new Bullet(this.game, this.x + 60, this.y + 13, 'bullet', 180, this._force));   
      _bulletPool[i].scale.setTo(2);
      }
      this.timeCount=this.game.time.now + this.firerate;
    }  
  }
}

//Clase GiraSol
function GiraSol(_game, _xPos, _yPos, _boardRef){
  Plant.apply(this,[_game, _xPos, _yPos, 'giraSol', _boardRef]);
  
  this.animations.add('idle', [0, 1, 0], 3, true);
  this.animations.add('shoot', [2, 0], 2, false);

  this.animations.play('idle');
  //Atributos
  this.timeToShoot = 8; //segundos

}
GiraSol.prototype = Object.create(Plant.prototype);
GiraSol.constructor = GiraSol;
//Metodos
GiraSol.cost = 10;
GiraSol.prototype.shoot = function (){
  if(this.alive){
    if(this.timeCount >= this.timeToShoot){
      //SpawnSun
      console.log('Sol Disparado');
      this.animations.play('shoot');
      this.events.onAnimationComplete.add(function(){this.animations.play('idle')}, this);
      //Implementacion    
      //Busca el primer sol disponible que pueda desplegarse
      var i = 0;
      var isFound = false;
      while(i < this.boardRef.spManager.sunPool.length && !isFound){
        if(this.boardRef.spManager.sunPool[i].alive)
          i++;
        else
          isFound = true;
      }      
      //Si no encuentra algun sol, entonces lo crea y lo spawnea
      if(!isFound){
        this.boardRef.spManager.sunPool.push(new Sun(this.game, this.x, this.y, 'sun', 20, this.boardRef.spManager));
        this.boardRef.spManager.sunPool[this.boardRef.spManager.sunPool.length - 1].drop(this.x + this.width, this.y);
      }
      //Si lo encuentra, lo Spawnea
      else if(isFound)
      this.boardRef.spManager.sunPool[i].drop(this.x + this.width, this.y);
      //--------------
      this.timeCount = 0;
    }
    this.timeCount += this.game.time.elapsedMS / 1000;
  }
}

//CLASE ZOMBIE
function Zombie (game, x, y, tag, _damage, _velocity, _attacksPerSec){
  Character.apply(this,[game, x, y, tag]);
  //this.game.add.sprite(100,100,tag);
  this._life = 12;
  this.damage = _damage; 
  this.attacksPerSec = _attacksPerSec;
  this.isAttacking = false;
  this.velocity = _velocity;
  this.timeCount = 0;

  this.animations.add('move',[0,1,0]);
  this.animations.play('move',5,true);
}
Zombie.prototype = Object.create(Character.prototype);
Zombie.constructor = Zombie;

// Metodos en Zombies
Zombie.prototype.move = function () {
  this.x -= this.velocity * this.game.time.elapsedMS/1000;
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
