//CLASE Shovel
function Shovel (game, x, y, _spManager, parent){
    Phaser.Button.apply(this,[game, x, y, 'shovelFrame', this.onInputUp, , 0, 1]);
    parent.addChild(this);
  
    this.isSelected = false;
  
    this.spManager = _spManager;
  
    //Por ser boton
    this.onInputOver.add(this.over, this);
    this.onInputOut.add(this.out, this);
    this.onInputUp.add(this.up, this);
    this.onInputDown.add(this.down,this);
  }
  Shovel.prototype = Object.create(Phaser.Button.prototype);
  Shovel.constructor =  Shovel;
  //Metodos
  Shovel.prototype.up = function(){
    this.click();
  }
  Shovel.prototype.down = function(){
    
  }
  Shovel.prototype.over = function(){
    //Algo
  }
  Shovel.prototype.out = function(){
    // if(this.isSelected)
    //   this._onOutFrame = 2;
    // else if (!this.isSelected)
    //   this._onOutFrame = 1;
  }
  Shovel.prototype.selectShovel = function (){
    this.isSelected = true;
    //Habilita el tablero y deshabilita cartas
    this.spManager.board.ableBoard();
    this.spManager.board.selectedPlant = null;
    this.spManager.cardSelector.deSelectAll();
    //this.frame = 2;
    //this._onOutFrame = 2;
    //Cambio de imagen de cursor (para quitar la parte "Frame" del tag)
    var str = this.key;
    var res = str.substr(0, str.length - 5);
    this.game.cursor.changeSprite(res);
  }
  Shovel.prototype.deselectShovel = function (){
    //Vacia cursor
    this.game.cursor.clearCursor();
    this.isSelected = false;
    //this.frame = 1;
    //this._onOutFrame = 1;
    //Dehabilita tablero
    this.spManager.board.disableBoard();
  }
  Shovel.prototype.click = function () {
    if(!this.isSelected){
      this.selectShovel();
    }
    else if (this.isSelected){
      this.deselectShovel();
    }
  }