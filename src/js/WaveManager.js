function WaveManager(_game, _zombiesGroup){
    this.game = _game;
    this.zombiesGroup = _zombiesGroup;
    this.timeToNext = 4000;
}
WaveManager.constructor = WaveManager;

WaveManager.prototype.checkWave = function(){
    if(0 < this.zombiesGroup.length){
        if(this.zombiesGroup.getChildAt(0).length <= 0){
            if(this.timeToNext <= 0){            
                this.zombiesGroup.getChildAt(0).destroy();
                
                if(0 >= this.zombiesGroup.length){
                    console.log("No quedan mas zombies, fin de partida");
                    this.game.sound.stopAll();  
                    this.game.state.start('mainMenu');
                }
                this.timeToNext = 4000; // 4segundos
            }else{
                this.timeToNext -= this.game.time.elapsedMS;
            }
        }
    }
}