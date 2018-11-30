import './Plant.js'
import './Bullet.js'

//Ejemplo LanzaGuisantes
function LanzaGuisantes(game, x, y, _boardRef){
    Plant.apply(this,[game, x, y, 'lanzaGuisantes', _boardRef]);
  
    //Atributos propios
    //----------------
    this.firerate = 1000;
    this.animations.add('try',[0,1,0],5,true);
    this.animations.add('shootin',[2,0],2,false);
    this._life = 3;
    this._force = 1;
    //----------------
    //this.animations.play('try');
  }
  LanzaGuisantes.prototype = Object.create(Plant.prototype);
  LanzaGuisantes.constructor = LanzaGuisantes;
  //Metodos
  LanzaGuisantes.cost = 20;
  LanzaGuisantes.prototype.shoot=function(_bulletPool){
   //Mas tarde se añadira la condicion de que disparé solo si hay zombies enfrente suya
   if(this.alive){
      if(this.game.time.now > this.timeCount){
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
            _bulletPool[i].revive();
            _bulletPool[i].relocate(this._force,180,this.x+60,this.y+13);
          
            shooted=true;    
          }
          i++
        }
        if(!shooted)   {
        this.animations.play('shootin');
        _bulletPool.push(new Bullet(this.game, this.x + 60, this.y + 13, 'bullet', 180, this._force));   
        _bulletPool[i].scale.setTo(2);
        }
        this.timeCount=this.game.time.now + this.firerate;
      }  
    }
  }