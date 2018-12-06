function PauseMenu(_game, _spManager){
    //No hereda de nada como tal, pero es conteneedora
    this.game = _game;
    //Para pausar le paso, el que tiene toda la logica de luego
    this.spManager = _spManager;
    var x = this.game.world.centerX;
    var y = this.game.world.centerY;

    //MenuFondo
    this.backGround = new Phaser.Sprite(this.game, x, y, 'pauseMenu');
    this.game.world.addChild(this.backGround);
    this.backGround.anchor.setTo(0.5);
    this.backGround.visible = false;    
    this.backGround.text = new Phaser.Text(this.game,this.backGround.x, this.backGround.y - this.backGround.height/2 + 35, 'PAUSA',{ font: "bold 32px Arial", fill: "#f5ff9a", align: "center" });
    this.backGround.text.anchor.setTo(0.5);
    this.backGround.text.visible = false;
    this.game.world.addChild(this.backGround.text);
    //Boton Pause InGame
    this.botonPausa = new PauseButton(this.game, 2 * x - 5, 5, this.pauseGame, this);
    //Boton Reiniciar
    this.botonReset = new Phaser.Button(this.game, x + 75, y + 35,"boton", this.reset, this,1,0,2,3);
    this.game.world.addChild(this.botonReset);
    this.botonReset.anchor.setTo(0.5);
    this.botonReset.visible = false;
    this.botonReset.text = new Phaser.Text(this.game,this.botonReset.x, this.botonReset.y + 3, 'Reiniciar nivel',{ font: "bold 16px Arial", fill: "#1df75d", align: "center" });
    this.botonReset.text.anchor.setTo(0.5);
    this.botonReset.text.visible = false;
    this.game.world.addChild(this.botonReset.text);
    //Boton Reanudar
    this.botonCountinue = new Phaser.Button(this.game, x - 75, y + 35,"boton", this.pauseGame, this,1,0,2,3);
    this.game.world.addChild(this.botonCountinue);
    this.botonCountinue.anchor.setTo(0.5);
    this.botonCountinue.visible = false;
    this.botonCountinue.text = new Phaser.Text(this.game,this.botonCountinue.x, this.botonCountinue.y + 3, 'Reanudar',{ font: "bold 16px Arial", fill: "#1df75d", align: "center" });
    this.botonCountinue.text.anchor.setTo(0.5);
    this.botonCountinue.text.visible = false;
    this.game.world.addChild(this.botonCountinue.text);
    //Boton Salir al Menu
    this.botonExit = new Phaser.Button(this.game, x, y + 90,"boton", this.exit, this,1,0,2,3);
    this.game.world.addChild(this.botonExit);
    this.botonExit.anchor.setTo(0.5);
    this.botonExit.visible = false;
    this.botonExit.text = new Phaser.Text(this.game,this.botonExit.x, this.botonExit.y + 3, 'Abandonar partida',{ font: "bold 13px Arial", fill: "#1df75d", align: "center" });
    this.botonExit.text.anchor.setTo(0.5);
    this.botonExit.text.visible = false;
    this.game.world.addChild(this.botonExit.text);

    //Slider del Volumen
    this.volumeSliderBar = new SliderBar(this.game,x + 60,y - 40, this.changeVolume);
    this.volumeSliderBar.visible = false; 
    this.volumeSliderBar.text = new Phaser.Text(this.game,this.volumeSliderBar.x - 160, this.volumeSliderBar.y + 3, 'Volumen',{ font: "bold 21px Arial", fill: "#1df75d", align: "center" });
    this.volumeSliderBar.text.anchor.setTo(0.5);
    this.volumeSliderBar.text.visible = false;
    this.game.world.addChild(this.volumeSliderBar.text);
}
PauseMenu.constructor = PauseMenu;

//Metodos
PauseMenu.prototype.exit = function (){
    this.game.camera.fade('0x000000', 1000);
    this.game.camera.onFadeComplete.add(function(){   
        this.game.state.start('mainMenu');
    }, this);
}
PauseMenu.prototype.reset = function (){
    this.game.camera.fade('0x000000', 1000);
    this.game.camera.onFadeComplete.add(function(){        
        this.game.state.start(this.game.state.current);
    }, this);
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
PauseMenu.prototype.updateMenu = function(){
    this.game.sound.volume = this.volumeSliderBar.getValue();
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

