

//CLASE PLANT
function Plant (game, x, y, tag, _boardRef){
    Character.apply(this,[game, x, y, tag, _boardRef]);
  
    this.boardRef = _boardRef;
  
    this.timeCount = 0;
  }
  Plant.prototype = Object.create(Character.prototype);
  Plant.constructor = Plant;
  //Métodos
  Plant.prototype.coolDownTime = 2000;
  Plant.prototype.shoot = function(){}
  Plant.prototype.takeDamage = function(_damage){
    this._life -= _damage;
    if(this._life <= 0){
      var box = this.boardRef.searchBox(this.x, this.y);
      box.plantPlaced = false;
      
      this.destroy();
      var index = this.boardRef.plants.indexOf(this);
      this.boardRef.plants.splice(index, 1);
    }
    return !this.alive;
  }