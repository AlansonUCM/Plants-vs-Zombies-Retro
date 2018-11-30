import './GameObject.js'

//CLASE Character
function Character (game, x, y, tag){
    GameObject.apply(this, [game, x, y, tag]);
    this._name = name;
    this._life = 0;
    this._force = 0;
  }
  Character.prototype = Object.create(GameObject.prototype);
  Character.constructor = Character;