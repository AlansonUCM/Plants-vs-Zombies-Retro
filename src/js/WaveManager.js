function WaveManager(_game, _zombiesGroup, _parent, _spManager){
    this.game = _game;
    this.zombiesGroup = _zombiesGroup;
    this.timeToNext = 12000;

    this.spManager = _spManager;

    this.endLevel = false;

    this.progressBar = new ProgressBar(this.game, 365, 7, this.zombiesGroup, _parent);

}
WaveManager.constructor = WaveManager;

WaveManager.prototype.checkWave = function(){
    if(!this.endLevel){
        //Si es el ultimo y no quedan zombies
        if(this.zombiesGroup.length <= 1 && this.zombiesGroup.getChildAt(0).length <= 0){             
                this.endLevel = true;    
                console.log("No quedan mas zombies, fin de partida");
                this.spManager.canvasText.display('HAS GANADO');
                this.game.time.events.add(4500, function(){   
                    this.game.levelIndex++;
                    //Si es el ultimo nivel, al menu
                    if(this.game.levelIndex >= this.spManager.levelLoader.levels.length){                          
                        this.game.sound.stopAll();  
                        this.game.time.events.resume();
                        this.game.time.events.removeAll();
                        this.game.levelIndex = 0;
                        this.game.state.start('mainMenu');
                    }else{
                        this.game.sound.stopAll();
                        this.game.time.events.resume();
                        this.game.time.events.removeAll();
                        this.game.camera.fade('0x000000', 1000);
                        this.game.camera.onFadeComplete.add(function(){        
                            this.game.state.start(this.game.state.current);
                        }, this.spManager);
                    }
                }, this);
        }
        else if(this.zombiesGroup.getChildAt(0).length <= 0){
            if(this.timeToNext <= 0){      
                this.zombiesGroup.getChildAt(0).destroy();
                this.timeToNext = 6000; // 6 segundos
                this.progressBar.prepareForNextWave();
                //Si es la ultima ronda
                if(this.zombiesGroup.length == 1){
                    this.spManager.canvasText.displayArray(['Una gran oleada de zombis se aproxima', 'OLEADA FINAL'], 2500);     
                }
            }else{
                this.timeToNext -= this.game.time.elapsedMS;
            }
        }

        if(this.progressBar.lastWaveZombie != null)
            this.progressBar.updateProgress();
    }    
}