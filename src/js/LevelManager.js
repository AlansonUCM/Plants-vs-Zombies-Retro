function LevelManager (_game, _zombiesGroup, _spManager, levelNum){
    this.game = _game,
    this.zombiesGroup = _zombiesGroup,
    this.spManager = _spManager,

    //Levels
    this.levels = [
        //Nivel 1
        [
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
        ]        
    ]

    
    this.loadLevel(levelNum);
}
LevelManager.constructor = LevelManager,

LevelManager.prototype.loadLevel = function(levelNum){
    //Creamos las diferentes oleadas
    var level = this.levels[levelNum];
    //Oleada vacia
    this.game.add.group(this.zombiesGroup, "VoidWave");
    //Resto de oleadas
    for(let i = 0; i < level.length; i++){
        var wave = this.game.add.group(this.zombiesGroup, "Wave " + i);
        var waveAux = level[i];
        for(let j = 0; j < waveAux.length; j++){
            var zombieCreated = waveAux[j];
            wave.add(zombieCreated);
        }
        //Ordeno verticalmente
        wave.sort('y', Phaser.Group.SORT_ASCENDING);
    }
}