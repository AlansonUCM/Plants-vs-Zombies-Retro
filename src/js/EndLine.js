function EndLine (game, x, y, _spManager){
    GameObject.apply(this, [game, x , y, 'void']);

    this.spManager = _spManager;

    this.endCrossed = false;

    this.height = this.game.world. height;
    this.body.setSize(this.width, this.height);
}
EndLine.constructor = EndLine;
EndLine.prototype = Object.create(GameObject.prototype);

EndLine.prototype.checkEndLine = function(currentWave){
    var col = false;
    for(let i = 0; i < currentWave.length && !col; i++){
        col = this.game.physics.arcade.collide(currentWave.getChildAt(i), this);
        if(col && !this.endCrossed){
            this.endCrossed = true;
            this.spManager.canvasText.display('HAS PERDIDO');
            this.game.time.events.add(4500, function(){   
                console.log("¡¡HAS PERDIDO!!");            
                this.game.sound.stopAll();  
                this.game.state.start('mainMenu');
            }, this);
        }
    }
}