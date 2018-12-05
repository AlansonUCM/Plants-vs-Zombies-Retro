function PauseButton (_game, x, y, callBack, callBackContxt){
    Phaser.Button.call(this, _game, x, y,"pause", callBack, callBackContxt);    
    this.game.world.addChild(this);
    this.scale.setTo(0.1);
    this.anchor.setTo(1,0);
    this.funct = callBack;
    this.contxt = callBackContxt;

    //this.game.input.onDown.add(this.buttonFunction, this);

}
PauseButton.prototype = Object.create(Phaser.Button.prototype);
PauseButton.constructor = PauseButton;

PauseButton.prototype.updateInPause = function(){
    
}
// PauseButton.prototype.buttonFunction = function(event) {   
//     if (this.game.paused && this.getBounds().contains(this.game.input.x, this.game.input.y)) {                 
//         this.funct.call(this.contxt);    
//     }
// }