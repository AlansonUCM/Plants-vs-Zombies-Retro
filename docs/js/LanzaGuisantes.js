

//Ejemplo LanzaGuisantes
function LanzaGuisantes(game, x, y, _boardRef){
    Plant.apply(this,[game, x, y, 'lanzaGuisantes', _boardRef]);
  
    //Atributos propios
    //----------------
    this.bulletPool = _boardRef.spManager.bulletGroup.getChildAt(0);
    this.bulletType = NormalPea;
    this.firerate = 1000;
    this.timeCount = 0;
    this.animations.add('try', [0, 1, 0], 3, true);
    this.animations.add('shootin', [2, 0], 2, false);
    this._life = 3;
    this._force = 1;

    this.sfx=this.game.add.audio('shoot');
    this.sfx.volume=0.2;
    //----------------
    this.rayCast = new Phaser.Sprite(this.game, 0, -this.height / 2,"__default");
    this.addChild(this.rayCast);
    this.rayCast.width =  this.game._width - x;
    this.rayCast.height = 10;
    this.rayCast.collides = false;
    this.game.physics.arcade.enable(this.rayCast);
    this.isAttacking = false;

    this.animations.play('try');
  }
  LanzaGuisantes.prototype = Object.create(Plant.prototype);
  LanzaGuisantes.constructor = LanzaGuisantes;
  LanzaGuisantes.cost = 20;
  LanzaGuisantes.coolDownTime = (10 * 1000);
  //Metodos
  LanzaGuisantes.prototype.checkRayCast = function(_zombiesArray){
    var aux = false;
    for(let i = 0; i < _zombiesArray.length && !aux; i++){
      var zomb = _zombiesArray.getChildAt(i);
      aux = this.game.physics.arcade.collide(this.rayCast, zomb,function rayCollides(obj1){
        obj1.collides = true;
      });
    }
  }

  LanzaGuisantes.prototype.shoot=function(){
   this.checkRayCast(this.boardRef.spManager.zombies);
   if(this.alive  && this.rayCast.collides){
      this.rayCast.collides = false;
      if(this.timeCount >= this.firerate){
        this.timeCount = 0;
        if(this.bulletPool.length == 0) {
          this.bulletPool.add(new this.bulletType(this.game, this.x + this.width, this.y , this.key + 'Bala', 180, this._force));
          this.bulletPool.getChildAt(0).kill();        
        }
        var i = 0;
        var shooted = false;
        while(i < this.bulletPool.length && !shooted) {      
        if(!this.bulletPool.getChildAt(i).alive){        
            this.animations.play('shootin');
            this.events.onAnimationComplete.add(function(){this.animations.play('try')}, this);
            this.bulletPool.getChildAt(i).revive();
            this.bulletPool.getChildAt(i).relocate(this._force,180,this.x + this.width,this.y);
          
            shooted=true;    
          }
          i++
        }
        if(!shooted)   {
        this.animations.play('shootin');
        this.events.onAnimationComplete.add(function(){this.animations.play('try')}, this);
        this.bulletPool.add(new this.bulletType(this.game, this.x + this.width, this.y , this.key + 'Bala', 180, this._force));
        }
      }
      this.sfx.play();
      this.timeCount += this.game.time.elapsedMS; 
    }
  }