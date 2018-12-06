function Cereza(game, x , y, _boardRef){
    Plant.apply(this,[game, x, y, '__default', _boardRef]);  
    //Atributos propios    
    this._life = 4;
    this._force = 100;
    this.sfx=this.game.add.audio('explosion');
    this.rayCast = new Phaser.Sprite(this.game, this.width, this.height,'cherryBoomBOOMBOOM',1);
    this.rayCast.anchor.setTo(0.5);
    this.addChild(this.rayCast);  

    this.rayCast.animations.add('boom', [1,2,3,4,5,6,7,8,9], 9, false);
    this.rayCast.collides = false;
    this.rayCast.damage=this._force;
    this.game.physics.arcade.enable(this.rayCast);
    
    this.rayCast.animations.play('boom');
    
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
        for(let j=0;j<this.boardRef.spManager.zombies.length;j++) {
            var zomb = this.boardRef.spManager.zombies.getChildAt(j);
            this.rayCast.collides=this.game.physics.arcade.collide(this.rayCast,zomb);
            if(this.rayCast.collides) {
                zomb.takeDamage(this.rayCast.damage);
            }
        }
        this.sfx.play();
        this.takeDamage(5);
        this.rayCast.destroy();
    }
    else
        this.timeCount+= this.game.time.elapsedMS;
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