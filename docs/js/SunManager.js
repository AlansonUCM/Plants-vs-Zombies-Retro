function SunManager (_game, _sunPool, _spManager){

  this.game = _game;
  this.timeCount = 0;
  //Tiempo de Spawn de soles
  this.timeToSpawnSun = (7.5 * 1000);
  this.sunPool = _sunPool;
  this.spManager = _spManager;

}
SunManager.constructor = SunManager;

SunManager.prototype.sunSpawnControl = function(){
    //Control de Spawn
    if(this.timeCount >= this.timeToSpawnSun){
      //SpawnSun
      console.log('Sol Spawnea');
      //Implementacion    
      //Busca el primer sol disponible que pueda desplegarse
      var i = 0;
      var isFound = false;
      while(i < this.sunPool.length && !isFound){
        if(this.sunPool.getChildAt(i).alive)
          i++;
        else
          isFound = true;
      }      
      //Si no encuentra algun sol, entonces lo crea y lo spawnea
      if(!isFound){
        this.sunPool.add(new Sun(this.game, this.game.world._width - 40, -20, 'sun', 25, this.spManager));
        this.sunPool.getChildAt(this.sunPool.length - 1).reSpawn();
      }
      //Si lo encuentra, lo Spawnea
      else if(isFound)
        this.sunPool.getChildAt(i).reSpawn();
      this.timeCount = 0;
    }
    this.timeCount += this.game.time.elapsedMS;
  }
  
  SunManager.prototype.updateSuns = function(){
   //Update de los soles
   for(let i = 0; i < this.sunPool.length; i++)
   this.sunPool.getChildAt(i).fall();
  }
  
  SunManager.prototype.addSunPoints = function(_points){
    this.spManager.sunCounter.points += _points;
    //Actualiza visualmente los soles
    this.spManager.sunCounter.updateCounter();
    //Actualiza la tarjetas que se pueden usar o no 
    this.spManager.cardSelector.actualizaAspecto();
  }