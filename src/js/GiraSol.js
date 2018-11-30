import './Plant.js'
import './Sun.js'

//Clase GiraSol
function GiraSol(_game, _xPos, _yPos, _boardRef){
    Plant.apply(this,[_game, _xPos, _yPos, 'giraSol', _boardRef]);
    
    this.animations.add('idle', [0, 1, 0], 3, true);
    this.animations.add('shoot', [2, 0], 2, false);
  
    this.animations.play('idle');
    //Atributos
    this.timeToShoot = 8; //segundos
  
  }
  GiraSol.prototype = Object.create(Plant.prototype);
  GiraSol.constructor = GiraSol;
  //Metodos
  GiraSol.cost = 10;
  GiraSol.prototype.shoot = function (){
    if(this.alive){
      if(this.timeCount >= this.timeToShoot){
        //SpawnSun
        console.log('Sol Disparado');
        this.animations.play('shoot');
        this.events.onAnimationComplete.add(function(){this.animations.play('idle')}, this);
        //Implementacion    
        //Busca el primer sol disponible que pueda desplegarse
        var i = 0;
        var isFound = false;
        while(i < this.boardRef.spManager.sunPool.length && !isFound){
          if(this.boardRef.spManager.sunPool[i].alive)
            i++;
          else
            isFound = true;
        }      
        //Si no encuentra algun sol, entonces lo crea y lo spawnea
        if(!isFound){
          this.boardRef.spManager.sunPool.push(new Sun(this.game, this.x, this.y, 'sun', 20, this.boardRef.spManager));
          this.boardRef.spManager.sunPool[this.boardRef.spManager.sunPool.length - 1].drop(this.x + this.width, this.y);
        }
        //Si lo encuentra, lo Spawnea
        else if(isFound)
        this.boardRef.spManager.sunPool[i].drop(this.x + this.width, this.y);
        //--------------
        this.timeCount = 0;
      }
      this.timeCount += this.game.time.elapsedMS / 1000;
    }
  }