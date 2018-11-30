// var SunCounter = require('./SunCounter.js');
// var CardSelector = require('./CardSelector.js');
// var Board = require('./Board.js');
// var Shovel = require('./Shovel.js');
import './SunCounter.js'
import './CardSelector.js'
import './Board.js'
import './Shovel.js'


//Clase SPManager
function SPManager (_game, _bulletPool, _sunPool, _timeToSpawnSun){  
    this.game = Object.create(_game);
    
    this.sunCounter = new SunCounter(_game, 5, 5);  
    this.cardSelector = new CardSelector(_game, 5, 64, 72, 5,[],[], this);
    this.board = new Board(_game, 130, 128, 5, 5, 100, this);
    this.shovel = new Shovel(this.game, 205 + 10, 5, this);
  
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

  module.exports = SPManager;