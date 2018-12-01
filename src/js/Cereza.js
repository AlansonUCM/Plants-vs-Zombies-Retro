function Cereza(game, x , y, _boardRef){
    Plant.apply(this,[game, x, y, 'cherryBoom', _boardRef]);
  
    //Atributos propios
    
    this._life = 4;
    this._force = 100;

    this.rayCastLine = new Phaser.Sprite(this.game, x-this.width*1.5, y-this.height*1.5,'cherryBoomBOOMBOOM');
    this.game.world.addChild(this.rayCastLine);
    this.rayCastLine.width =  this.width*4;
    this.rayCastLine.height = this.height*4;
    

    this.rayCastLine.animations.add('boom', [1,2,3,4,5,6,7,8,9], 9, false);

    this.rayCastLine.collides = false;
    this.rayCastLine.damage=this._force;
    this.game.physics.arcade.enable(this.rayCastLine);
    
    this.rayCastLine.animations.play('boom');
 
  }
  Cereza.prototype = Object.create(Plant.prototype);
  Cereza.constructor = Cereza;
  Cereza.cost = 40;

Cereza.prototype.shoot=function()
{
    
    //For screen shake
  


   
    this.alpha=0;
   if(this.timeCount>1000)
   {
    var t = this.game.time.create(true)
    t.repeat(20,10,shake,this.game);
    t.start();
    t.onComplete.addOnce(resetCam,this.game);
        for(let j=0;j<this.boardRef.spManager.zombies.length;j++)
        {
            this.rayCastLine.collides=this.game.physics.arcade.collide(this.rayCastLine,this.boardRef.spManager.zombies.getChildAt(j));
            if(this.rayCastLine.collides)
            {
                this.boardRef.spManager.zombies.getChildAt(j).takeDamage(this.rayCastLine.damage);
            }
        }
    
        this.takeDamage(5);
        this.rayCastLine.destroy();
    }
    else
    this.timeCount+= this.game.time.elapsedMS;
}


function resetCam(){
    //Reset camera after shake
        this.camera.x = 2;
        this.camera.y = 2;
    }

    function shake(){
        var min = -2;
        var max = 2;
        this.camera.x+= Math.floor(Math.random() * (max - min + 1)) + min;
        this.camera.y+= Math.floor(Math.random() * (max - min + 1)) + min;
    }