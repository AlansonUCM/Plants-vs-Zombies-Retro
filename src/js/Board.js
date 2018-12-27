
//CLASE Board
function Board (game, parent, plantsParent, _xPos, _yPos,numXBoxes, numYBoxes, _boxTamX, _boxTamY, _spManager){
  Phaser.Group.apply(this,[game, parent, "BoardGroup"]);
  this.boxes = game.add.group(this,"Boxes");

  this.plants = plantsParent;

  this.spManager = _spManager;

  this.selectedPlant = null;


  for(let i = 0; i < numYBoxes; i++){
    this.boxes.add(game.add.group());
    for(let j = 0;j < numXBoxes; j++)
      this.boxes.getChildAt(i).add(new Box(game, _xPos + _boxTamX * i, _yPos + _boxTamY * j, this));
  }

  this.disableBoard();
}
Board.constructor = Board;
Board.prototype = Object.create(Phaser.Group.prototype);
//Metodos
Board.prototype.searchBox = function(xPos, yPos){
  for(let i = 0; i < this.boxes.length; i++)
    for(let j = 0;j < this.boxes.getChildAt(i).length; j++)
      if(this.boxes.getChildAt(i).getChildAt(j).x == xPos && this.boxes.getChildAt(i).getChildAt(j).y == yPos)
        return this.boxes.getChildAt(i).getChildAt(j);
  console.log("Lugar no encontrado");
}
Board.prototype.searchPlant = function(_xPos, _yPos){
  for(let i = 0; i < this.plants.length; i++)
    if(this.plants.getChildAt(i).x == _xPos && this.plants.getChildAt(i).y == _yPos && this.plants.getChildAt(i).alive)
      return this.plants.getChildAt(i);
console.log("Planta no encontrada");
}

Board.prototype.disableBoard = function (){
  for(let i = 0; i < this.boxes.length; i++)
    for(let j = 0;j < this.boxes.getChildAt(i).length; j++){
      var box = this.boxes.getChildAt(i).getChildAt(j);
      box.input.enabled = false;      
      box.prevIm.loadTexture('void');
    }  
  //this.selectedPlant = null;
  console.log('tablero desabilitado');
}

Board.prototype.ableBoard = function (){
  for(let i = 0; i < this.boxes.length; i++)
    for(let j = 0;j < this.boxes.getChildAt(i).length; j++)
      this.boxes.getChildAt(i).getChildAt(j).input.enabled = true;
  console.log("Tablero preparado para posicionar planta")
}
