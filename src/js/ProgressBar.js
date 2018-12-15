
//CLASE ProgressBar
function ProgressBar (game, x, y, _zombiesWaves, parent){
  CanvasObject.apply(this,[game, x, y, 'progressBar']);
  this.zombiesWaves = _zombiesWaves;
  parent.addChild(this);

  //Barra verde
  this.bar = this.game.add.sprite(this.width, 0, 'progressBar2', );
  this.bar.anchor.setTo(1, 0);
  this.addChild(this.bar);
  this.bar.width = 0;
  //Frame
  this.addChild(this.game.add.sprite(0, 0, 'progressFrame', ));

  this.numOleadas = this.zombiesWaves.length - 1;

  //Crea banderas
  this.createFlags();
  //Crea cabeza
  this.head = this.createHead();


  this.wave = 0;
  this.lastWaveZombie;
  this.distRel;

}
ProgressBar.prototype = Object.create(CanvasObject.prototype);
ProgressBar.constructor = ProgressBar;

ProgressBar.prototype.createFlags = function(){
  for(var i = this.numOleadas - 1; i >= 0; i--){
    this.addChild(this.game.add.sprite((i * (this.width - 10)) / this.numOleadas + 5, -5, 'flag', ));
  }
}

ProgressBar.prototype.createHead = function(){
  var h = this.game.add.sprite(this.width - 10, -5, 'head', );
  this.addChild(h);
  h.anchor.setTo(0.5, 0);
  return h;
}

ProgressBar.prototype.prepareForNextWave = function(){
  var wave = this.zombiesWaves.getChildAt(0);
  this.lastWaveZombie = wave.getFurthestFrom(this);
  this.distRel = this.lastWaveZombie.x - this.game.width;
  this.wave++;
}

ProgressBar.prototype.updateProgress = function(){
  //Cabeza
  var dist = this.width - 20;
  var iniDist = dist * (this.numOleadas - this.wave) / this.numOleadas + 10;
  var t = (this.lastWaveZombie.x - this.game.width) / this.distRel;
  if(t < 0){
    t = 0;
  }
  this.head.x = iniDist + (dist / this.numOleadas) * t;

  //Barra verde
  this.bar.width = this.width - this.head.x;

}