//Objeto HielaGuisantes
function HielaGuisantes(game, x, y, _boardRef){
    Plant.apply(this,[game, x, y, 'hielaGuisantes', _boardRef]);
  
    //Atributos propios
    
    this.bulletPool = _boardRef.spManager.bulletGroup.getChildAt(1);
    this.bulletType = FrozenPea;
    this.firerate = 1000;
    this.timeCount = 0;
    this.animations.add('try', [0, 1, 0], 3, true);
    this.animations.add('shootin', [2, 0], 2, false);
    this._life = 3;
    this._force = 1;

    this.sfx=this.game.add.audio('shoot');
    this.sfx.volume=0.2;
    
    this.rayCast = new Phaser.Sprite(this.game, 0, this.height / 2,"__default");
    this.addChild(this.rayCast);
    this.rayCast.width =  this.game._width - x;
    this.rayCast.height = 10;
    this.rayCast.collides = false;
    this.game.physics.arcade.enable(this.rayCast);
    this.isAttacking = false;

    this.animations.play('try');
  }
  HielaGuisantes.prototype = Object.create(LanzaGuisantes.prototype);
  HielaGuisantes.constructor = HielaGuisantes;
  HielaGuisantes.cost = 100;
  HielaGuisantes.coolDownTime = (15 * 1000);
  