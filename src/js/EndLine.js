function EndLine (game, x, y){
    GameObject.apply(this, [game, x , y, 'void']);

    this.height = this.game.world. height;
    this.body.setSize(this.width, this.height);
}
EndLine.prototype.constructor = EndLine;
EndLine.prototype = Object.create(GameObject.prototype);

EndLine.prototype.checkEndLine = function(currentWave){
    var col = false;
    for(let i = 0; i < currentWave.length && !col; i++){
        col = this.game.physics.arcade.collide(currentWave.getChildAt(i), this);
        if(col){
            console.log("¡¡HAS PERDIDO!!");            
            this.game.sound.stopAll();  
            this.game.state.start('mainMenu');
        }
    }
}