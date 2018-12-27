function CanvasText(_game, parent){
    Phaser.Text.apply(this,[_game, _game.world.centerX, _game.world.centerY, '']);
    parent.addChild(this);

    this.anchor.setTo(0.5);
    this.fontSize = 72;
    this.fill = '#ff0000';
    this.worldWrap = true;
    this.worldWrapWidth = this.game.world.width;

    this.stroke = '#000000';
    this.strokeThickness = 6;
    this.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
    this.setTextBounds(0, 0, this.game.world.width, this.fontSize + 5);

    this.clear();
}
CanvasText.constructor = CanvasText;
CanvasText.prototype = Object.create(Phaser.Text.prototype)

//Metodos
CanvasText.prototype.display = function(_message, time = 250){
    this.scale.setTo(0);
    //Cambiamos el texto 
    this.text = _message;
    var fixed = false;
    //Desplegamos con un tween
    this.game.add.tween(this).to({}, time, function(k){
        if(this.game.camera.bounds.containsRect(this.getBounds()) && !fixed)
            this.scale.setTo(k);
        else if(!fixed){
            this.fitInScreen();
            fixed = true;
        }
        return k;
    }.bind(this), true);

}

CanvasText.prototype.displayArray = function (messageArray, timeToNext = 750, i = 0){
    if(i < messageArray.length){
        this.display(messageArray[i]);
        //Timer
        this.game.time.events.add(timeToNext, function (){ this.displayArray(messageArray, timeToNext, i + 1); },this);
    }
    else{
        var t = this.game.add.tween(this).to({}, 250, function(k){
            if(this.scale.x - k >= 0){
            this.scale.setTo(this.scale.x - k);
            }else{
                this.scale.setTo(0);
            }
            return k;
        }.bind(this), true);
        t.onComplete.add(function(){this.clear()}, this);        
    }
}

CanvasText.prototype.clear = function(){
    this.text = '';
    this.scale.setTo(0);
}

CanvasText.prototype.fitInScreen = function () {
    while(this.width > this.game.camera.width) { this.scale.setTo(this.scale.x - 0.05); }
}