//CLASE Card
function Card (game, x, y, tag, funcionPlanta, _cardSelector){
    Phaser.Button.apply(this,[game, x, y, tag + "Frame", this.up, , 1, 0, 1]);
    this.game.world.addChild(this);
    this.isSelected = false;
    this.plantRef = funcionPlanta;
    this.plantRef.cost = funcionPlanta.cost;
  
    this.cardSelector = _cardSelector;
  
    this.onInputUp.add(this.up, this);
  
    this.costText = this.game.add.text(x + 80, y + 35, "" + this.plantRef.cost, { font: "bold 24px Arial", fill: "#000000", align: "center" });
  }
  Card.prototype = Object.create(Phaser.Button.prototype);
  Card.constructor = Card;
  //Metodos
  Card.prototype.up = function(){
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
    if(!this.isSelected){
      this.cardSelector.spManager.shovel.deselectShovel();
    
      this.isSelected = true;
      //this.inputEnabled = false;
      //this.freezeFrames = true;
    
      //Cambio de imagen de cursor (para quitar la parte "Frame" del tag)
      var str = this.key;
      var res = str.substr(0, str.length - 5);
      this.game.cursor.changeSprite(res);
    
      this.cardSelector.spManager.board.selectedPlant = this.plantRef;
      this.cardSelector.spManager.board.ableBoard();
    
      console.log("Card selected");
    }
  }
  Card.prototype.deSelect = function(){
    this.isSelected = false; 
    //this.freezeFrames = false;
    //this.inputEnabled = true;
    this.game.cursor.changeSprite(undefined);
    console.log("Card deselected");
  }