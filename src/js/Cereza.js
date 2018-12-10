function Cereza(game, x , y, _boardRef){
    Plant.apply(this,[game, x, y, 'cherryBoomBOOMBOOM', _boardRef]);  
    //Atributos propios  
    this._life = 4;
    this._force = 100;
    this.sfx = this.game.add.audio('explosion');
    this.anchor.setTo(0.5, (this.height - 99)/this.height);
    
    this.animations.add('boom', [1,2,3,4,5,6,7,8,9], 9, false);    
    this.animations.play('boom');
    
    var t = this.game.time.create(true)
    t.repeat(20,10,shake,this.game);
    t.start(750);
    t.onComplete.addOnce(resetCam,this.game);
}
Cereza.prototype = Object.create(Plant.prototype);
Cereza.constructor = Cereza;
Cereza.cost = 40;
Cereza.coolDownTime = (18 * 1000);

Cereza.prototype.shoot=function() { 
   if(this.timeCount > 1000){
       var currentZombs = this.boardRef.spManager.zombies.getChildAt(0);
        for(let j = 0; j < currentZombs.length; j++) {
            var zomb = currentZombs.getChildAt(j);
            var col = this.game.physics.arcade.collide(this, zomb);
            if(col) {
                zomb.takeDamage(this._force);
                //Como se elimina y se redimensiona, hay que comprobar de nuevo
                //el mismo j porque puede haber un nuevo zombie
                j--;
            }
        }
        this.sfx.play();
        this.takeDamage(5);
    }
    else
        this.timeCount += this.game.time.elapsedMS;
}


function resetCam(){
    this.camera.x = 0;
    this.camera.y = 0;
}

function shake(){
    var min = -2;
    var max = 2;
    this.camera.x+= Math.floor(Math.random() * (max - min + 1)) + min;
    this.camera.y+= Math.floor(Math.random() * (max - min + 1)) + min;
}