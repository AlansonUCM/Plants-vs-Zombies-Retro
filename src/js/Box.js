
//Clase Box
function Box (game, xPos, yPos, _boardRef){
  Phaser.Button.apply(this,[game, xPos, yPos, 'casilla', this.onInputUp]);
  this.game.world.addChild(this);
  this.anchor.setTo(0.5, 0.75);
  
  this.sfx=this.game.add.audio('plantar');
  this.shovelSound=this.game.add.audio('shovel');
  this.plantPlaced = false;

  this.boardRef = _boardRef;

  this.x = xPos;
  this.y = yPos;

  //this.input.enabled = false;
  this.prevIm = this.game.add.sprite(0, 0,'void',);
  this.prevIm.anchor.setTo(0.5, 1);
  this.prevIm.alpha = 0.6;
  this.addChild(this.prevIm);
  
  this.onInputOver.add(this.over, this);
  this.onInputOut.add(this.out, this);
  this.onInputUp.add(this.up, this);
}
Box.prototype = Object.create(Phaser.Button.prototype);
Box.constructor = Box;
//Metodos
Box.prototype.up = function(){
  console.log("casilla clickada"); 
  if(this.boardRef.selectedPlant != null) {
    this.prevIm.loadTexture('void');
    this.plant();
  }
  else if (this.boardRef.selectedPlant == null){
    this.clearBox();
  }  
  this.game.cursor.alpha = 0.6;
}
Box.prototype.over = function(){
  this.prevIm.loadTexture(this.game.cursor.key);
  this.game.cursor.alpha = 0;
}
Box.prototype.out = function(){
  this.prevIm.loadTexture('void');
  this.game.cursor.alpha = 0.6;
}
Box.prototype.clearBox = function (){
  if(this.plantPlaced){
    //Busca la planta y la borra
    this.shovelSound.play();
    var plant = this.boardRef.searchPlant(this.x, this.y);
    plant.destroy();
    this.boardRef.plants.removeChild(plant);
    //Deja libre esta caja
    this.plantPlaced = false;
  }
  else if (!this.plantPlaced){
    //Desactivas modo pala
    this.boardRef.spManager.shovel.deselectShovel();
  }  
}

Box.prototype.plant = function(){
  this.game.cursor.clearCursor();

  if(this.plantPlaced){
    console.log('lugar ya plantado');

    this.boardRef.disableBoard();
    this.boardRef.selectedPlant = null;
    this.boardRef.spManager.cardSelector.lastCardUsed = null;

    this.boardRef.spManager.cardSelector.deSelectAll();
  } else if(!this.plantPlaced && this.boardRef.selectedPlant != null){
    console.log('Planta plantada');
    this.sfx.play();
    //Habra que retocar para que dependiendo de la planta use un sprite u otro
    var plantType = this.boardRef.selectedPlant;

    this.boardRef.plants.add(new plantType(this.game, this.x, this.y, this.boardRef));    
    this.plantPlaced = true;

    //Al crearse debe quitar el coste 
    this.boardRef.spManager.sunCounter.points -= plantType.cost;
    this.boardRef.spManager.sunCounter.updateCounter();
    //Actualiza el aspecto de las cartas
    //Si se planta, genera un coolDown en la Carta
    var card = this.boardRef.spManager.cardSelector.lastCardUsed;
    card.setUsed();

    this.boardRef.selectedPlant = null;
    this.boardRef.disableBoard();
    this.boardRef.spManager.cardSelector.deSelectAll();

  } else{
    console.log('Accion anulada');
    
    this.boardRef.disableBoard();
    this.boardRef.selectedPlant = null;

    this.boardRef.spManager.cardSelector.lastCardUsed = null;

    this.boardRef.spManager.cardSelector.deSelectAll();
  }
}