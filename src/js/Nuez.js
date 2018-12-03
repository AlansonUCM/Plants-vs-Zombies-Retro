function Nuez(game, x , y, _boardRef){
    Plant.apply(this,[game, x, y, 'nuez', _boardRef]);
  
    //Atributos propios
    this.animations.add('idleTop', [0, 1, 2], 3, true);
    this.animations.add('idleMid',[3, 4, 5], 3, true);
    this.animations.add('idleDown',[6, 7, 8], 3, true);

    this._life = 10;
    this.iniLife = this._life;

    this.animations.play('idleTop');
  }
  Nuez.prototype = Object.create(Plant.prototype);
  Nuez.constructor = Nuez;
  //Coste
  Nuez.cost = 15;
  Nuez.coolDownTime = (40 * 1000);
  //Metodos
  Nuez.prototype.takeDamage = function(_damage){
    this._life -= _damage;
    //Cambio de animaciones
    if(this._life >= this.iniLife * 0.33 && this._life < this.iniLife * 0.66 && this.animations.currentAnim.name != 'idleMid')
        this.animations.play('idleMid');
    else if(this._life < this.iniLife * 0.33 && this.animations.currentAnim.name != 'idleDown')
        this.animations.play('idleDown');

    //Destruye si tiene menos vida que 0
    if(this._life <= 0){
      var box = this.boardRef.searchBox(this.x, this.y);
      box.plantPlaced = false;
      
      this.destroy();
      var index = this.boardRef.plants.indexOf(this);
      this.boardRef.plants.splice(index, 1);
    }
    return !this.alive;
  }