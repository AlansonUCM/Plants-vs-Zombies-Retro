function PauseMenu(_game){
    //No hereda de nada como tal, pero es conteneedora
    this.game = _game;
    var x = this.game.world.centerX;
    var y = this.game.world.centerY;

    this.isOpened = false;

    //Boton de pausa (Temporal)
    this.pauseButton = new PauseButton(this.game, 2 * x - 5, 5, this.openMenu, this);
    //Menu de Pausa
    this.menu = this.game.add.group();

}
PauseMenu.constructor = PauseMenu;

//Metodos
PauseMenu.prototype.openMenu = function(){
    if(this.isOpened)
        this.close();
    else if (!this.isOpened)
        this.open();
}
PauseMenu.prototype.close = function(){
    console.log("Menu de pausa cerrado");
    this.isOpened = false;
    this.game.paused = false;

}
PauseMenu.prototype.open = function(){
    console.log("Menu de pausa abierto");
    this.isOpened = true;
    this.game.paused = true;
}
PauseMenu.prototype.display = function(){
    console.log("Menu de pausa DESPLEGADO");
    this.open();
    this.trial = new PauseButton(this.game,400,300, this.openMenu, this);
}
PauseMenu.prototype.updatePause = function(){
    for(let i = 0; i < this.menu.lenght; i++)
        this.menu.getChildAt(i).updateInPause();
}

PauseButton.prototype.unpause = function(event) {   
    if (this.getBounds().contains(this.game.input.x, this.game.input.y)) {                 
        this.game.input.onDown.remove(this.unpause, this);
        this.game.paused = false;    
    }
}
