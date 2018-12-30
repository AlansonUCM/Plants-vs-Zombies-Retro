function LevelLoader (_game, _zombiesGroup, _spManager, _levelNum){
    this.game = _game;
    this.zombiesGroup = _zombiesGroup;
    this.spManager = _spManager;

    //Levels
    this.levels = 
    [
        this.loadLevel1,
        this.loadLevel2,
        this.loadLevel3     
    ];

    this.load(_levelNum);
}
LevelLoader.constructor = LevelLoader;

LevelLoader.prototype.load = function(levelNum){
    var func = this.levels[levelNum];
    func.apply(this);
}

LevelLoader.prototype.loadLevel = function(_level){
    //Oleada vacia
    this.game.add.group(this.zombiesGroup, "VoidWave");
    //Resto de oleadas
    for(let i = 0; i < _level.length; i++){
        var wave = this.game.add.group(this.zombiesGroup, "Wave " + i);
        var waveAux = _level[i];
        for(let j = 0; j < waveAux.length; j++){
            var zombieCreated = waveAux[j];
            wave.add(zombieCreated);
        }
        //Ordeno verticalmente
        wave.sort('y', Phaser.Group.SORT_ASCENDING);
    }
}


LevelLoader.prototype.loadLevel1 = function () {
    //Nivel 1
    var level = [
        //Oleada 0
        [
            new ZombieComun(this.game, 1000, 230, this.spManager),    
            new ZombieComun(this.game, 1150, 230 + 81, this.spManager),
            new ZombieComun(this.game, 1100, 230, this.spManager),
        ],
        //Oleada 1
        [
            new ZombieComun(this.game, 1265, 230 + 81 * 2, this.spManager),
            new ZombieCono(this.game, 1000, 230, this.spManager),
            new ZombieComun(this.game, 1200, 230 + 81 * 2, this.spManager),
            new ZombieComun(this.game, 1250, 230, this.spManager),
        ],
        //Oleada 2
        [
            new ZombieCono(this.game, 1000, 230, this.spManager),
           // new ZombieComun(this.game, 1400, 230, this.spManager),
           // new ZombieComun(this.game, 1000, 230, this.spManager),
            new ZombieCono(this.game, 1150, 230, this.spManager),
            new ZombieComun(this.game, 1000, 230 + 81, this.spManager),
            new ZombieComun(this.game, 1100, 230 + 81, this.spManager),
            new ZombieCono(this.game, 1350, 230 + 81, this.spManager),
           // new ZombieComun(this.game, 1400, 230 + 81, this.spManager),
            new ZombieComun(this.game, 1250, 230 + 81 * 2, this.spManager),
            new ZombieComun(this.game, 1050, 230 + 81 * 2, this.spManager),
            new ZombieComun(this.game, 1200, 230 + 81 * 2, this.spManager),
            new ZombieComun(this.game, 1300, 230 + 81 * 2, this.spManager),
            new ZombieCono(this.game, 1000, 230 + 81 * 3, this.spManager),
            new ZombieComun(this.game, 1150, 230 + 81 * 3, this.spManager),
            new ZombieComun(this.game, 1300, 230 + 81 * 3, this.spManager),
            //new ZombieComun(this.game, 1450, 230 + 81 * 4, this.spManager),
            new ZombieComun(this.game, 1250, 230 + 81 * 4, this.spManager),
            new ZombieComun(this.game, 1100, 230 + 81 * 4, this.spManager),
        ]
    ];
    this.loadLevel(level);    
}

LevelLoader.prototype.loadLevel2 = function(){
    // Nivel 2
    var level = [
        //Oleada 0
        [
            new ZombieComun(this.game, 1000, 230+81, this.spManager),    
            new ZombieCubo(this.game, 1200, 230 + 81*4, this.spManager),
           
        ],
        //Oleada 1
        [
            new ZombiePuerta(this.game, 1305, 230 + 81, this.spManager),
            new ZombieCubo(this.game, 1270, 230 + 81*2, this.spManager),
            new ZombieComun(this.game, 1200, 230 + 81 *4, this.spManager),
            new ZombieComun(this.game, 1000, 230 +81, this.spManager),
            new ZombieComun(this.game, 1050, 230 + 81 *3, this.spManager),
            new ZombieComun(this.game, 1100, 230 +81 *3, this.spManager),
        ],
        //Oleada2
        [
            new ZombiePuerta(this.game, 1300, 230, this.spManager),
            new ZombiePuerta(this.game, 1070, 230 + 81*2, this.spManager),
            new ZombieCono(this.game, 1050, 230 + 81, this.spManager),
            new ZombieCubo(this.game, 1050, 230 +81 *3, this.spManager),
            new ZombieComun(this.game, 1150, 230 + 81 *4, this.spManager),
            new ZombieComun(this.game, 1050, 230 +81 *4, this.spManager),
            new ZombieComun(this.game, 1200, 230 + 81 *4, this.spManager),
            new ZombieCono(this.game, 1150, 230 +81 *3, this.spManager),
            new ZombieComun(this.game, 1110, 230 + 81, this.spManager),
            new ZombieComun(this.game, 1000, 230 + 81, this.spManager),
            new ZombieCono(this.game, 1000, 230 +81 *4, this.spManager),
            new ZombieCono(this.game, 1100, 230 + 81 *4, this.spManager),
        ],
    ];
    this.loadLevel(level);    
}

LevelLoader.prototype.loadLevel3 = function(){
    //Nivel 3
    var level =  [
       //Oleada 0
        [
            new ZombieComun(this.game, 1000, 230+81, this.spManager),    
            new ZombieComun(this.game, 1150, 230 + 81*4, this.spManager),
            new ZombieCono(this.game, 1300, 230+81, this.spManager),
        ],
        //Oleada 1
        [
            new ZombieCubo(this.game, 1265, 230 + 81, this.spManager),
            new ZombieCubo(this.game, 1170, 230 + 81*4, this.spManager),
            new ZombieComun(this.game, 1200, 230 + 81 *2, this.spManager),
            new ZombieComun(this.game, 1250, 230, this.spManager),
            new ZombieComun(this.game, 1050, 230 + 81 *2, this.spManager),
            new ZombieComun(this.game, 1100, 230, this.spManager),
        ],
        //Oleada2
        [
            new ZombiePuerta(this.game, 1000, 230, this.spManager),
            new ZombiePuerta(this.game, 1070, 230 + 81*2, this.spManager),
            new ZombieCono(this.game, 1050, 230 + 81, this.spManager),
            new ZombieComun(this.game, 1200, 230, this.spManager),
            new ZombieComun(this.game, 1020, 230 + 81 *4, this.spManager),
            new ZombieComun(this.game, 1100, 230 +81 *4, this.spManager),
            new ZombieComun(this.game, 1180, 230 + 81 *4, this.spManager),
            new ZombieCono(this.game, 1000, 230 +81 *3, this.spManager),
            new ZombieComun(this.game, 1150, 230 + 81, this.spManager),
        ],
        //Oleada3
        [
            new ZombieMini(this.game, 1000, 230, this.spManager),
            new ZombieMini(this.game, 1300, 230, this.spManager),
            new ZombieMini(this.game, 1100, 230, this.spManager),
            new ZombieMini(this.game, 1200, 230, this.spManager),
            new ZombieMini(this.game, 1050, 230 + 81, this.spManager),
            new ZombieMini(this.game, 1150, 230 +81, this.spManager),
            new ZombieMini(this.game, 1280, 230 + 81, this.spManager),
            new ZombieMini(this.game, 1000, 230 +81 *2, this.spManager),
            new ZombieMini(this.game, 1220, 230 + 81 *2, this.spManager),
            new ZombieMini(this.game, 1120, 230 +81 *2, this.spManager),
            new ZombieMini(this.game, 1440, 230 + 81 *2, this.spManager),
            new ZombieMini(this.game, 1340, 230 +81 *2, this.spManager),
            new ZombieMini(this.game, 1250, 230 + 81*3, this.spManager),
            new ZombieMini(this.game, 1035, 230 +81 *3, this.spManager),
            new ZombieMini(this.game, 1250, 230 + 81*4, this.spManager),
            new ZombieMini(this.game, 1000, 230 +81 *4, this.spManager),
            new ZombieMini(this.game, 1110, 230 + 81*4, this.spManager),
            new ZombieMini(this.game, 1350, 230 +81 *4, this.spManager),
            new ZombieMini(this.game, 1500, 230 + 81*4, this.spManager),
            new ZombieMini(this.game, 1350, 230 +81, this.spManager),
            new ZombieMini(this.game, 1500, 230 + 81, this.spManager),
        ],
    ];
    this.loadLevel(level);  
}

