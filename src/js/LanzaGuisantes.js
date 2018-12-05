

//Ejemplo LanzaGuisantes
function LanzaGuisantes(game, x, y, _boardRef){
    Plant.apply(this,[game, x, y, 'lanzaGuisantes', _boardRef]);
  
    //Atributos propios
    //----------------
    this.firerate = 1000;
    this.timeCount = 0;
    this.animations.add('try', [0, 1, 0], 3, true);
    this.animations.add('shootin', [2, 0], 2, false);
    this._life = 3;
    this._force = 1;
    //----------------
    this.rayCastLine = new Phaser.Sprite(this.game, x, y);
    this.game.world.addChild(this.rayCastLine);
    this.rayCastLine.width =  this.game._width - x;
    this.rayCastLine.height = 10;
    this.rayCastLine.collides = false;
    this.game.physics.arcade.enable(this.rayCastLine);
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
    for(let i = 0; i < _zombiesArray.length; i++){
      this.game.physics.arcade.collide(this.rayCastLine, _zombiesArray.getChildAt(i),function rayCollides(obj1){
        obj1.collides = true;
      });
    }
  }

  LanzaGuisantes.prototype.shoot=function(_bulletPool){
   //Mas tarde se añadira la condicion de que disparé solo si hay zombies enfrente suya
   this.checkRayCast(this.boardRef.spManager.zombies);
   if(this.alive  && this.rayCastLine.collides){
    this.rayCastLine.collides = false;
      if(this.timeCount >= this.firerate){
        this.timeCount = 0;
        if(_bulletPool.length == 0) {
          _bulletPool.push(new Bullet(this.game, this.x + 60, this.y + 13, 'bullet', 180, this._force));
          _bulletPool[0].scale.setTo(2);
          _bulletPool[0].kill();        
        }
        var i = 0;
        var shooted = false;
        while(i < _bulletPool.length && !shooted) {      
        if(!_bulletPool[i].alive){        
            this.animations.play('shootin');
            this.events.onAnimationComplete.add(function(){this.animations.play('try')}, this);
            _bulletPool[i].revive();
            _bulletPool[i].relocate(this._force,180,this.x+60,this.y+13);
          
            shooted=true;    
          }
          i++
        }
        if(!shooted)   {
        this.animations.play('shootin');
        this.events.onAnimationComplete.add(function(){this.animations.play('try')}, this);
        _bulletPool.push(new Bullet(this.game, this.x + 60, this.y + 13, 'bullet', 180, this._force));   
        _bulletPool[i].scale.setTo(2);
        }
      }
      this.timeCount += this.game.time.elapsedMS; 
    }
  }