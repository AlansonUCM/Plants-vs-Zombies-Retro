function PauseMenu(_game, _spManager){
    Phaser.Group.apply(this,[_game,undefined, "PauseMenu"]);

    //Para pausar le paso, el que tiene toda la logica de luego
    this.spManager = _spManager;
    var x = this.game.world.centerX;
    var y = this.game.world.centerY;

    //MenuFondo
    this.backGround = this.game.add.sprite( x, y, 'pauseMenu', 0,this);
    this.backGround.anchor.setTo(0.5);
    this.backGround.visible = false;    
    this.backGround.text = this.game.add.text(this.backGround.x, this.backGround.y - this.backGround.height/2 + 35, 'PAUSA',{ font: "bold 32px Arial", fill: "#f5ff9a", align: "center" },this);
    this.backGround.text.anchor.setTo(0.5);
    this.backGround.text.visible = false;
    //Boton Pause InGame
    this.botonPausa = new PauseButton(this.game, 2 * x - 5, 5, this.pauseGame, this, this);
    //Boton Reiniciar
    this.botonReset = this.game.add.button( x + 75, y + 35,"boton", this.reset, this,1,0,2,3, this);
    this.botonReset.anchor.setTo(0.5);
    this.botonReset.visible = false;
    this.botonReset.text = this.game.add.text(this.botonReset.x, this.botonReset.y + 3, 'Reiniciar nivel',{ font: "bold 16px Arial", fill: "#1df75d", align: "center" },this);
    this.botonReset.text.anchor.setTo(0.5);
    this.botonReset.text.visible = false;
    //Boton Reanudar
    this.botonCountinue = this.game.add.button( x - 75, y + 35,"boton", this.pauseGame, this,1,0,2,3,this);
    this.botonCountinue.anchor.setTo(0.5);
    this.botonCountinue.visible = false;
    this.botonCountinue.text = this.game.add.text(this.botonCountinue.x, this.botonCountinue.y + 3, 'Reanudar',{ font: "bold 16px Arial", fill: "#1df75d", align: "center" },this);
    this.botonCountinue.text.anchor.setTo(0.5);
    this.botonCountinue.text.visible = false;
    //Boton Salir al Menu
    this.botonExit = this.game.add.button( x, y + 90,"boton", this.exit, this,1,0,2,3,this);
    this.botonExit.anchor.setTo(0.5);
    this.botonExit.visible = false;
    this.botonExit.text = this.game.add.text(this.botonExit.x, this.botonExit.y + 3, 'Abandonar partida',{ font: "bold 13px Arial", fill: "#1df75d", align: "center" },this);
    this.botonExit.text.anchor.setTo(0.5);
    this.botonExit.text.visible = false;

    //Slider del Volumen
    this.volumeSliderBar = new SliderBar(this.game,x + 60,y - 40, this.changeVolume, this);
    this.volumeSliderBar.visible = false; 
    this.volumeSliderBar.text = this.game.add.text(this.volumeSliderBar.x - 160, this.volumeSliderBar.y + 3, 'Volumen',{ font: "bold 21px Arial", fill: "#1df75d", align: "center" },this);
    this.volumeSliderBar.text.anchor.setTo(0.5);
    this.volumeSliderBar.text.visible = false;
    
}
PauseMenu.constructor = PauseMenu;
PauseMenu.prototype = Object.create(Phaser.Group.prototype);

//Metodos
PauseMenu.prototype.exit = function (){    
    this.game.sound.stopAll();
    this.game.camera.fade('0x000000', 1000);
    this.game.camera.onFadeComplete.add(function(){   
        this.game.state.start('mainMenu');
    }, this.spManager);
}
PauseMenu.prototype.reset = function (){
    this.game.sound.stopAll();
    this.game.camera.fade('0x000000', 1000);
    this.game.camera.onFadeComplete.add(function(){        
        this.game.state.start(this.game.state.current);
    }, this.spManager);    
}


PauseMenu.prototype.changeVolume = function(_value){
    this.game.sound.volume = _value;
    console.log('Volumen: ' + this.game.sound.volume);
}


PauseMenu.prototype.display = function(){    
    this.backGround.visible = this.botonExit.visible = this.botonCountinue.visible = this.botonReset.visible = 
    this.volumeSliderBar.text.visible = this.volumeSliderBar.visible = this.volumeSliderBar.slider.visible = 
    this.botonExit.text.visible = this.botonCountinue.text.visible = this.botonReset.text.visible = this.backGround.text.visible = this.game.isPaused;

    this.botonPausa.changeAspect(this.game.isPaused);
}

PauseMenu.prototype.pauseGame = function(){
    this.game.isPaused = !this.game.isPaused;

    this.pauseAll(); this.playAll();
    
    this.display();
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
        //Sigue timers
        this.game.time.gameResumed();
        //Sigue tweens
        this.game.tweens.resumeAll();
        //Sigue animationes y botones
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
PauseMenu.prototype.stopMusic = function(){
    this.game.sound.destroy();
}

