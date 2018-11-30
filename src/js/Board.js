
//CLASE Board
function Board (game, _xPos, _yPos,numXBoxes, numYBoxes, _boxTam, _spManager){
    this.boxes = [];
    this.plants = [];
    this.boxTam = _boxTam;
  
    this.spManager = _spManager;
  
    this.selectedPlant = null;
  
  
    for(let i = 0; i < numXBoxes; i++){
      this.boxes.push([]);
      for(let j = 0;j < numYBoxes; j++)
        this.boxes[i].push(new Box(game, _xPos + this.boxTam* i, _yPos + this.boxTam* j, this));
    }
  }
  Board.constructor = Board;
  //Metodos
  Board.prototype.searchBox = function(xPos, yPos){
    for(let i = 0; i < this.boxes.length; i++)
      for(let j = 0;j < this.boxes[i].length; j++)
        if(this.boxes[i][j].x == xPos && this.boxes[i][j].y == yPos)
          return this.boxes[i][j];
    console.log("Lugar no encontrado");
  }
  Board.prototype.searchPlant = function(_xPos, _yPos){
    for(let i = 0; i < this.plants.length; i++)
      if(this.plants[i].x == _xPos && this.plants[i].y == _yPos && this.plants[i].alive)
        return this.plants[i];
  console.log("Planta no encontrada");
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
