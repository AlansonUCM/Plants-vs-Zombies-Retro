
//Clase SPManager
function SPManager (_game, _boardGroup, _bulletGroup, _plantsGroup, _zombiesGroup, _HUDGroup, _sunGroup, _timeToSpawnSun){  
    this.game = _game;

    this.sunCounter = new SunCounter(_game,_HUDGroup, 5, 5);  
    this.cardSelector = new CardSelector(_game, _HUDGroup, 5, 64, 72, 5,[],[], this);
    this.shovel = new Shovel(_game, 205 + 10, 5, this, _HUDGroup);
    this.sunManager = new SunManager(_game, _sunGroup, _timeToSpawnSun, this);
    this.board = new Board(_game, _boardGroup, _plantsGroup, 162, 200, 5, 9, 74, 86, this);
    this.waveManager = new WaveManager(_game,_zombiesGroup);
  
    //Pools
    this.sunPool = _sunGroup;
    this.bulletGroup = _bulletGroup;
    //Zombies
    this.zombies = _zombiesGroup;

    //Metodos de inicializacion
    this.cardSelector.actualizaAspecto();
  }
  SPManager.constructor =  SPManager;
  //Metodos
  SPManager.prototype.updateSPM = function(){ 
    this.sunManager.sunSpawnControl();
    this.sunManager.updateSuns();
    this.waveManager.checkWave();
  }
