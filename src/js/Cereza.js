function Cereza(game, x , y, _boardRef){
    Plant.apply(this,[game, x, y, 'cherryBoom', _boardRef]);  
    //Atributos propios    
    this._life = 4;
    this._force = 100;

    this.rayCastSquare = new Phaser.Sprite(this.game, x-this.width*1.5, y-this.height*1.5,'cherryBoomBOOMBOOM');
    this.game.world.addChild(this.rayCastSquare);
    this.rayCastSquare.width =  this.width*4;
    this.rayCastSquare.height = this.height*4;    

    this.rayCastSquare.animations.add('boom', [1,2,3,4,5,6,7,8,9], 9, false);
    this.rayCastSquare.collides = false;
    this.rayCastSquare.damage=this._force;
    this.game.physics.arcade.enable(this.rayCastSquare);
    
    this.rayCastSquare.animations.play('boom');
    
    var t = this.game.time.create(true)
    t.repeat(20,10,shake,this.game);
    t.start(750);
    t.onComplete.addOnce(resetCam,this.game);
}
Cereza.prototype = Object.create(Plant.prototype);
Cereza.constructor = Cereza;
Cereza.cost = 40;

Cereza.prototype.shoot=function() {   
    this.alpha=0;
   if(this.timeCount > 1000){
        for(let j=0;j<this.boardRef.spManager.zombies.length;j++) {
            this.rayCastSquare.collides=this.game.physics.arcade.collide(this.rayCastSquare,this.boardRef.spManager.zombies.getChildAt(j));
            if(this.rayCastSquare.collides) {
                this.boardRef.spManager.zombies.getChildAt(j).takeDamage(this.rayCastSquare.damage);
            }
        }        
        this.takeDamage(5);
        this.rayCastSquare.destroy();
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