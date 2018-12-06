function PauseButton (_game, x, y, callBack, callBackContxt,parent){
    Phaser.Button.call(this, _game, x, y,"pause", callBack, callBackContxt, 1, 0, 2);    
    parent.addChild(this);
    this.anchor.setTo(1,0);
}
PauseButton.prototype = Object.create(Phaser.Button.prototype);
PauseButton.constructor = PauseButton;

PauseButton.prototype.changeAspect = function(_isPaused){
    if(_isPaused){
        this.setFrames(4, 3, 5);
    }else if(!_isPaused){
        this.setFrames(1, 0, 2);
    }
}

