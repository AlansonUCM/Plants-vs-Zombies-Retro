function PauseMenu(_game, _spManager){
    //No hereda de nada como tal, pero es conteneedora
    this.game = _game;
    this.spManager = _spManager;
    var x = this.game.world.centerX;
    var y = this.game.world.centerY;

    this.botonPausa = new PauseButton(this.game, 2 * x - 5, 5, this.pauseGame, this);
    this.botonReset = new Phaser.Button(this.game, x, y + 50,"boton", this.pauseGame, this,1,0,2,3);
    this.game.world.addChild(this.botonReset);
    this.botonReset.scale.setTo(0.5);
    this.botonReset.anchor.setTo(0.5);
    this.botonReset.visible = false;

    this.volumeSliderBar = new SliderBar(this.game,x,y - 50);
    this.volumeSliderBar.visible = false;
    

}
PauseMenu.constructor = PauseMenu;

//Metodos
PauseMenu.prototype.display = function(){    
    this.botonReset.visible = this.volumeSliderBar.visible = this.volumeSliderBar.slider.visible = this.game.isPaused;
    
}
PauseMenu.prototype.updateMenu = function(){
    this.game.sound.volume = this.volumeSliderBar.getValue();
}

PauseMenu.prototype.pauseGame = function(){
    this.game.isPaused = !this.game.isPaused;

    this.pauseAll(); this.playAll();
    
    this.display();

    //Reactiva el boton de Pausa
    this.botonPausa.input.enabled = true;

    //Desplegamos el menu
    //this.display();
}

PauseMenu.prototype.pauseAll = function(){
    if(this.game.isPaused){
        //Paro timers
        this.game.time.gamePaused();
        //Paro tweens
        this.game.tweens.pauseAll();
        //Paro animationes y botones
        //Cartas
        this.spManager.cardSelector.cards.forEach(c => {
            c.input.enabled = false;
        });
        //Soles
        this.spManager.sunPool.forEach(s => {
            s.input.enabled = false;
        });
        //Shovel
        this.spManager.shovel.input.enabled = false;
        //Zombies
        this.spManager.zombies.forEach(z => {
            z.animations.paused = true;
        });
        //Plantas
        this.spManager.board.plants.forEach(p => {
            p.animations.paused = true;
        });
    }
}

PauseMenu.prototype.playAll = function(){
    if(!this.game.isPaused){
        //Paro timers
        this.game.time.gameResumed();
        //Paro tweens
        this.game.tweens.resumeAll();
        //Paro animationes y botones
        //Cartas
        this.spManager.cardSelector.actualizaAspecto();
        //Soles
        this.spManager.sunPool.forEach(s => {
            s.input.enabled = true;
        });
        //Shovel
        this.spManager.shovel.input.enabled = true;
        //Zombies
        this.spManager.zombies.forEach(z => {
            z.animations.paused = false;
        });
        //Plantas
        this.spManager.board.plants.forEach(p => {
            p.animations.paused = false;
        });
    }
}

