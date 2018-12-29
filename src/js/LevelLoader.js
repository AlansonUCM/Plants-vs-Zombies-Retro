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
            new ZombieComun(this.game, 1150, 230 + 86, this.spManager),
            new ZombieComun(this.game, 1100, 230, this.spManager),
        ],
        //Oleada 1
        [
            new ZombieCubo(this.game, 1265, 230 + 86 * 2, this.spManager),
            new ZombieMini(this.game, 1000, 230, this.spManager),
            new ZombieComun(this.game, 1200, 230 + 86 * 2, this.spManager),
            new ZombieComun(this.game, 1250, 230, this.spManager),
        ],
        //Oleada 2
        [
            new ZombieComun(this.game, 1000, 230, this.spManager),
            new ZombieComun(this.game, 1400, 230, this.spManager),
            new ZombieComun(this.game, 1000, 230, this.spManager),
            new ZombieComun(this.game, 1150, 230, this.spManager),
            new ZombieComun(this.game, 1000, 230 + 86, this.spManager),
            new ZombieComun(this.game, 1100, 230 + 86, this.spManager),
            new ZombieCono(this.game, 1350, 230 + 86, this.spManager),
            new ZombieComun(this.game, 1400, 230 + 86, this.spManager),
            new ZombieCono(this.game, 1250, 230 + 86 * 2, this.spManager),
            new ZombieComun(this.game, 1050, 230 + 86 * 2, this.spManager),
            new ZombieComun(this.game, 1200, 230 + 86 * 2, this.spManager),
            new ZombieComun(this.game, 1300, 230 + 86 * 2, this.spManager),
            new ZombieCono(this.game, 1000, 230 + 86 * 3, this.spManager),
            new ZombieComun(this.game, 1150, 230 + 86 * 3, this.spManager),
            new ZombieComun(this.game, 1300, 230 + 86 * 3, this.spManager),
            new ZombieCono(this.game, 1450, 230 + 86 * 4, this.spManager),
            new ZombieComun(this.game, 1250, 230 + 86 * 4, this.spManager),
            new ZombieComun(this.game, 1100, 230 + 86 * 4, this.spManager),
        ]
    ];
    this.loadLevel(level);    
}

LevelLoader.prototype.loadLevel2 = function(){
    // Nivel 2
    var level = [
        //Oleada 0
        [
            new ZombieComun(this.game, 1000, 230, this.spManager),    
            new ZombieComun(this.game, 1150, 230 + 86, this.spManager),
            new ZombieComun(this.game, 1100, 230, this.spManager),
        ],
        // //Oleada 1
        // [
        //     new ZombieCubo(this.game, 1265, 230 + 86 * 2, this.spManager),
        //     new ZombieMini(this.game, 1000, 230, this.spManager),
        //     new ZombieComun(this.game, 1200, 230 + 86 * 2, this.spManager),
        //     new ZombieComun(this.game, 1250, 230, this.spManager),
        // ],
    ];
    this.loadLevel(level);    
}

LevelLoader.prototype.loadLevel3 = function(){
    //Nivel 3
    var level =  [
        //Oleada 0
        [
            new ZombieComun(this.game, 1000, 230, this.spManager),    
            new ZombieComun(this.game, 1150, 230 + 86, this.spManager),
            new ZombieComun(this.game, 1100, 230, this.spManager),
        ],
        // //Oleada 1
        // [
        //     new ZombieCubo(this.game, 1265, 230 + 86 * 2, this.spManager),
        //     new ZombieMini(this.game, 1000, 230, this.spManager),
        //     new ZombieComun(this.game, 1200, 230 + 86 * 2, this.spManager),
        //     new ZombieComun(this.game, 1250, 230, this.spManager),
        // ],
    ];
    this.loadLevel(level);  
}

