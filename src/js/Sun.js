//CLASE Sun
function Sun (game, x, y, tag, _value, _spManager){
    Phaser.Button.apply(this,[game, x, y, tag]);
  
    this.anchor.setTo(0.5);
  
    this.velocity = 100;
    this.value = _value; //Pixeles/seg
    this.isTaken = false;
    
    this.sfx=this.game.add.audio('sun');
    //Ref al manager
    this.spManager = _spManager;
    //Por ser boton
    this.onInputOver.add(this.over, this);
    this.onInputOut.add(this.out, this);
    this.onInputUp.add(this.up, this);
    this.onInputDown.add(this.down,this);
  
    this.kill();
  }
  Sun.prototype = Object.create(Phaser.Button.prototype);
  Sun.constructor =  Sun;
  
  //Metodos
  Sun.prototype.fall = function(){
    if(this.alive){
      this.y += this.velocity * this.game.time.elapsedMS / 1000;
      //Si esta fuera de pantalla se mata
      if(this.y > this.game.world._height){
        this.kill();
        console.log('Sol ha muerto fuera del campo de vision');
      }
    }
  }
  
  Sun.prototype.over = function (){
    //Hará algo, a lo mejor hacemos que con que el cursor pase por encima, ya recoja el sol
    if(!this.isTaken){
      this.isTaken = true;
      this.takeSun();
      console.log('Sol recogido y suma realizada');
    }
  }
  Sun.prototype.down = function(){
    //Hara algo, o no
  }
  Sun.prototype.out = function(){
    //No creo que haga algo
  }
  Sun.prototype.up = function(){
    //Probablemente coja el sol
  }
  Sun.prototype.takeSun = function(){
    //El sol debe ir al contador
    this.sfx.play();
    this.goToCounter();
  }
  Sun.prototype.goToCounter = function() {
    var tween = this.game.add.tween(this).to({x:this.spManager.sunCounter.x + 130, y: this.spManager.sunCounter.y + 27}, 500, Phaser.Easing.Linear.None, true);
    tween.onComplete.addOnce(function whenFinished(){this.kill(); this.spManager.sunManager.addSunPoints(this.value);}, this);
  }
  Sun.prototype.drop = function(_xPos, _yPos){
    this.velocity = 0;
    this.reset(_xPos, _yPos);
    this.isTaken = false;
    var tween = this.game.add.tween(this).to({y: _yPos + 25}, 1500, Phaser.Easing.Bounce.In, true);
  }
  Sun.prototype.reSpawn = function(){
    this.isTaken = false;
    this.velocity = 100;
    var xSpw = this.game.rnd.integerInRange(this.game.world._width/3, this.game.world._width - 40);
    this.reset(xSpw, -25);
  }