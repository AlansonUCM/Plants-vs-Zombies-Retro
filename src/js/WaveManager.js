function WaveManager(_game, _zombiesGroup, parent){
    this.game = _game;
    this.zombiesGroup = _zombiesGroup;
    this.timeToNext = 12000;

    this.progressBar = new ProgressBar(this.game, 365, 7, this.zombiesGroup, parent);

}
WaveManager.constructor = WaveManager;

WaveManager.prototype.checkWave = function(){
    //Si es el ultimo y no quedan zombies
    if(this.zombiesGroup.length <= 1 && this.zombiesGroup.getChildAt(0).length <= 0){ 
        if(this.timeToNext <= 0){     
            console.log("No quedan mas zombies, fin de partida");
            this.game.sound.stopAll();  
            this.game.state.start('mainMenu');
        }else{
            this.timeToNext -= this.game.time.elapsedMS;
        }
    }
    else if(this.zombiesGroup.getChildAt(0).length <= 0){
        if(this.timeToNext <= 0){            
            this.zombiesGroup.getChildAt(0).destroy();
            this.timeToNext = 6000; // 6 segundos
            this.progressBar.prepareForNextWave();
        }else{
            this.timeToNext -= this.game.time.elapsedMS;
        }
    }

    if(this.progressBar.lastWaveZombie != null)
        this.progressBar.updateProgress();
}