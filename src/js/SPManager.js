
//Clase SPManager
function SPManager (_game, _boardGroup, _bulletGroup, _plantsGroup, _zombiesGroup, _HUDGroup, _sunGroup, _upperGroup, levelNum){  
    this.game = _game;
    //Creamos oleadas
    this.levelLoader = new LevelLoader(this.game, _zombiesGroup, this, levelNum);
    
    //Creamos el resto
    this.canvasText = new CanvasText(_game,_upperGroup);
    this.sunCounter = new SunCounter(_game,_HUDGroup, 5, 5);  
    this.cardSelector = new CardSelector(_game, _HUDGroup, 5, 64, 72, 5,[],[], this);
    this.shovel = new Shovel(_game, 205 + 10, 5, this, _HUDGroup);
    this.sunManager = new SunManager(_game, _sunGroup, this);
    this.board = new Board(_game, _boardGroup, _plantsGroup, 162, 230, 5, 9, 67, 81, this);
    this.waveManager = new WaveManager(_game,_zombiesGroup, _boardGroup, this);
    this.endLine = new EndLine(_game, 65, 0, this);

    //Texto del invel
    this.levelText = this.game.add.text(this.game.camera.width, this.game.camera.height, 'Nivel ' + (levelNum + 1),{} ,_HUDGroup);
    this.levelText.anchor.setTo(1);
    this.levelText.fontSize = 27;
    this.levelText.fill = '#ffffff';
    this.levelText.stroke = '#000000';
    this.levelText.strokeThickness = 5;
    this.levelText.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
  
    //Pools
    this.sunPool = _sunGroup;
    this.bulletGroup = _bulletGroup;
    //Zombies
    this.zombies = _zombiesGroup;

    //Metodos de inicializacion
    this.cardSelector.actualizaAspecto();

    this.game.time.events.add(3000, function(){
      this.canvasText.displayArray(['Preparado...', 'Listo...', 'PLANTA'], 1200);
    }, this);
  }
  SPManager.constructor =  SPManager;
  //Metodos
  SPManager.prototype.updateSPM = function(){ 
    this.endLine.checkEndLine(this.zombies.getChildAt(0));
    this.sunManager.sunSpawnControl();
    this.sunManager.updateSuns();
    this.waveManager.checkWave();
  }
