
//Clase GiraSol
function GiraSol(_game, _xPos, _yPos, _boardRef){
    Plant.apply(this,[_game, _xPos, _yPos, 'giraSol', _boardRef]);
    this._life = 300;
    this.animations.add('idle', [0, 1, 0], 3, true);
    this.animations.add('shoot', [2, 0], 2, false);
  
    this.animations.play('idle');
    //Atributos
    this.timeToShoot = 10; //segundos
  
  }
  GiraSol.prototype = Object.create(Plant.prototype);
  GiraSol.constructor = GiraSol;
  //Metodos
  GiraSol.cost = 50;
  GiraSol.coolDownTime = (7.5 * 1000);
  GiraSol.prototype.shoot = function (){
    if(this.alive){
      if(this.timeCount >= this.timeToShoot){
        //SpawnSun
        console.log('Sol Disparado');
        this.animations.play('shoot');
        this.events.onAnimationComplete.add(function(){this.animations.play('idle');}, this);
        //Implementacion    
        //Busca el primer sol disponible que pueda desplegarse
        var i = 0;
        var isFound = false;
        while(i < this.boardRef.spManager.sunPool.length && !isFound){
          if(this.boardRef.spManager.sunPool.getChildAt(i).alive)
            i++;
          else
            isFound = true;
        }      
        //Si no encuentra algun sol, entonces lo crea y lo spawnea
        if(!isFound){
          this.boardRef.spManager.sunPool.add(new Sun(this.game, this.x, this.y, 'sun', 25, this.boardRef.spManager));
          this.boardRef.spManager.sunPool.getChildAt(this.boardRef.spManager.sunPool.length - 1).drop(this.x + this.width / 2, this.y - this.height, this.height);
        }
        //Si lo encuentra, lo Spawnea
        else if(isFound){
          var sol = this.boardRef.spManager.sunPool.getChildAt(i);
          sol.value = 25;
          sol.drop(this.x + this.width / 2, this.y - this.height, this.height);
        }
        //--------------
        this.timeCount = 0;
        this.timeToShoot = 24;
      }
      this.timeCount += this.game.time.elapsedMS / 1000;
    }
  }