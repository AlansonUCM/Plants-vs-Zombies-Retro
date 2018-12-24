//CLASE Card
function Card (game, x, y, tag, funcionPlanta, _cardSelector){
  Phaser.Button.apply(this,[game, x, y, tag + "Frame", this.up, , 1, 0, 1]);
  _cardSelector.addChild(this);
  this.isSelected = false;
  this.plantRef = funcionPlanta;
  this.plantRef.cost = funcionPlanta.cost;

  this.isUsed = false;

  this.cardSelector = _cardSelector;

  this.onInputUp.add(this.up, this);

  //Texto del coste
  this.costText = this.game.add.text(this.width - 20,this.height - 10, "" + this.plantRef.cost, { font: "bold 24px Arial", fill: "#000000", align: "center" }, );
  this.addChild(this.costText);
  this.costText.anchor.setTo(0.5);
  //Pantalla de coolDown(inicializacion)
  this.coolDownTint = this.game.add.sprite(this.x, this.y + this.height, tag + "Frame",0,_cardSelector);
  this.coolDownTint.anchor.setTo(0, 1);
  this.coolDownTint.tint = '0x000000';
  this.coolDownTint.alpha = 0.20;
  this.coolDownTint.height = 0;
}

Card.prototype = Object.create(Phaser.Button.prototype);
Card.constructor = Card;

//Metodos
Card.prototype.up = function() {
  if(this.input.pointerOver()){
    if(this.plantRef.cost <= this.cardSelector.spManager.sunCounter.points && !this.isSelected){
      this.select();
      this.cardSelector.spManager.board.selectedPlant = this.plantRef;
    }
    else if(this.plantRef.cost <= this.cardSelector.spManager.sunCounter.points && this.isSelected){
      this.deSelect();
      this.cardSelector.spManager.board.selectedPlant = null;
      this.cardSelector.spManager.board.disableBoard();
    }
    else
      console.log('No tienes suficientes puntos');
  }
}

Card.prototype.select = function(){
  this.cardSelector.deSelectAll();
  this.cardSelector.spManager.shovel.deselectShovel();
  
  this.isSelected = true;
  
  //Cambio de imagen de cursor (para quitar la parte "Frame" del tag)
  var str = this.key;
  var res = str.substr(0, str.length - 5);
  this.game.cursor.changeSprite(res);
  
  this.cardSelector.lastCardUsed = this;
  
  this.cardSelector.spManager.board.selectedPlant = this.plantRef;
  this.cardSelector.spManager.board.ableBoard();
  
  console.log("Card selected");    
}

Card.prototype.deSelect = function(){
  this.isSelected = false; 
  
  this.cardSelector.lastCardUsed = null;

  this.game.cursor.changeSprite('void');
  console.log("Card deselected");
}

Card.prototype.setUsed = function(){
  this.cardSelector.actualizaAspecto();
  this.input.enabled = false;
  this.isUsed = true;
  var tintTween = this.game.add.tween(this.coolDownTint).from({height: this.height}, this.plantRef.coolDownTime, Phaser.Easing.Linear.None, true);
  tintTween.onComplete.addOnce(function isFinished(){this.isUsed = false; this.input.enabled = true; this.coolDownTint.height = 0; this.cardSelector.actualizaAspecto(); console.log("Carta lista para usar de nuevo");}, this);
    
}