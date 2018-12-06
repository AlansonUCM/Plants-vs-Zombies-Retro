
//Clase SPManager
function SPManager (_game, _boardGroup, _bulletGroup, _plantsGroup, _zombiesGroup, _HUDGroup, _sunGroup, _timeToSpawnSun){  
    this.game = _game;

    this.sunCounter = new SunCounter(_game,_HUDGroup, 5, 5);  
    this.cardSelector = new CardSelector(_game, _HUDGroup, 5, 64, 72, 5,[],[], this);
    this.shovel = new Shovel(this.game, 205 + 10, 5, this, _HUDGroup);

    this.board = new Board(_game, _boardGroup, _plantsGroup, 130, 128, 5, 5, 100, this);
  
    //Pools
    this.sunPool = _sunGroup;
    this.bulletPool = _bulletGroup;

    //Zombies
    this.zombies = _zombiesGroup;

    //Tiempo de Spawn de soles
    this.timeToSpawnSun = _timeToSpawnSun;
  
    this.timeCount = 0;

    //Metodos de inicializacion
    this.cardSelector.actualizaAspecto();
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
        if(this.sunPool.getChildAt(i).alive)
          i++;
        else
          isFound = true;
      }      
      //Si no encuentra algun sol, entonces lo crea y lo spawnea
      if(!isFound){
        this.sunPool.add(new Sun(this.game, this.game.world._width - 40, -20, 'sun', 20, this));
        this.sunPool.getChildAt(this.sunPool.length - 1).reSpawn();
      }
      //Si lo encuentra, lo Spawnea
      else if(isFound)
        this.sunPool.getChildAt(i).reSpawn();
      //--------------
      this.timeCount = 0;
    }
    this.timeCount += this.game.time.elapsedMS / 1000;
  }
  
  SPManager.prototype.updateSuns = function(){
   //Update de los soles
   for(let i = 0; i < this.sunPool.length; i++)
    this.sunPool.getChildAt(i).fall();
  }
  
  SPManager.prototype.addSunPoints = function(_points){
    this.sunCounter.points += _points;
    //Actualiza visualmente los soles
    this.sunCounter.updateCounter();
    //console.log('SunPoints: ' + this.sunCounter.points);
    //Actualiza la tarjetas que se pueden usar o no 
    this.cardSelector.actualizaAspecto();
  }
