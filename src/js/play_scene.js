'use strict';

  // Inicializacion
  var zombie;

  var PlayScene = {
  create: function () {
   /* var logo = this.game.add.sprite(
      this.game.world.centerX, this.game.world.centerY, 'logo');
    logo.anchor.setTo(0.5, 0.5);
    logo.scale.setTo(0.7);
    */
    this.bulletPool=[];
    
    //Zombie en Pantalla
    this.planta=new LanzaGuisantes(this.game,200,300,'plants',this.bulletPool);
    this.planta.anchor.setTo(0.5,1);

    zombie = new Zombie(this.game, 800, 300-100, "zombies", 0);
   // this.game.world.addChild(zombie)
    zombie.scale.setTo(1.8);
    this.planta.animations.play('try');
    




  },
  update: function (){
    zombie.move(0.5);
 
    this.planta.shoot();
    for(var i =0;i<this.bulletPool.length;i++)
    {
      this.bulletPool[i].move();
    }
    
    for(var n=0;n<this.bulletPool.length;n++)
    {
      
      this.game.physics.arcade.collide(this.bulletPool[n],zombie,bulletCollision);
    }

    function bulletCollision(obj1,obj2)
    {
    
      obj2.takeDamage(obj1._dam);
      obj1.Oncollision();
    }


  },
  render: function (){
  }
};





//CLASE ScreenObj
function ScreenObj (game, x, y, tag){
  Phaser.Sprite.call(this,game, x, y, tag);

  this.game.world.addChild(this);

}
ScreenObj.prototype = Object.create(Phaser.Sprite.prototype);
ScreenObj.constructor = ScreenObj;

//CLASE Score
function Score (game, x, y, tag){
  ScreenObj.Sprite.apply(this,[game, x, y, tag]);
  this.count=0;
}
Score.prototype = Object.create(ScreenObj.prototype);
Score.constructor = Score;

//CLASE ProgressBar
function ProgressBar (game, x, y, tag){
  ScreenObj.Sprite.apply(this,[game, x, y, tag]);
  this.time = 0;
}
ProgressBar.prototype = Object.create(ScreenObj.prototype);
ProgressBar.constructor = ProgressBar;

//CLASE Button
function Button (game, x, y, tag){
  ScreenObj.Sprite.apply(this,[game, x, y, tag]);
  this.game.physics.arcade.enable(this)
}
Button.prototype = Object.create(ScreenObj.prototype);
Button.constructor =  Button;

//CLASE Sun
function Sun (game, x, y, tag){
  ScreenObj.Sprite.apply(this,[game, x, y, tag]);
  
}
Sun.prototype = Object.create(Button.prototype);
Sun.constructor =  Sun;

//CLASE Shovel
function Shovel (game, x, y, tag){
  ScreenObj.Sprite.apply(this,[game, x, y, tag]);
  
}
Shovel.prototype = Object.create(Button.prototype);
Shovel.constructor =  Shovel;

//CLASE Card
function Card (game, x, y, tag){
  ScreenObj.Sprite.apply(this,[game, x, y, tag]);  
}
Card.prototype = Object.create(Button.prototype);
Card.constructor =  Card;


//CLASE GameObject
function GameObject (game, x, y, tag ){
  ScreenObj.apply(this, [game, x, y, tag]);
  this.game.physics.arcade.enable(this)
}
GameObject.prototype = Object.create(ScreenObj.prototype);
GameObject.constructor = GameObject;

//CLASE Character
function Character (game, x, y, tag){
  GameObject.apply(this, [game, x, y, tag]);
  this._name = name;
  this._life = 0;
  this._force = 0;
}
Character.prototype = Object.create(GameObject.prototype);
Character.constructor = Character;

//CLASE BULLET
function Bullet (game, x, y, tag,vel,dam){
  GameObject.apply(this,[game, x, y, tag]);
 
  this._vel = vel;
  this._dam=dam;
}
Bullet.prototype = Object.create(GameObject.prototype);
Bullet.constructor = Bullet;

Bullet.prototype.move = function () {
  this.x += this._vel;

}


Bullet.prototype.Oncollision = function () {
  this.kill();

}

Bullet.prototype.relocate=function(dam,vel,x,y)
{
 this.reset(x,y);
  this._dam=dam;
  this._vel=vel;
}

//CLASE PLANT
function Plant (game, x, y, tag,bulletPool){
  Character.apply(this,[game, x, y, tag]);
 
  
}
Plant.prototype = Object.create(Character.prototype);
Plant.constructor = Plant;

//Ejemplo LanzaGuisantes
function LanzaGuisantes(game, x, y, tag,bulletPool){
  Plant.apply(this,[game, x, y, tag,bulletPool]);
  //Atributos propios
  //----------------
  this._bulletPool=bulletPool;
  this.timeCount=0;
  this.firerate=1000;
  this.animations.add('try',[0,1,0],5,true);
  this.animations.add('shootin',[2,0],2,false);
  this._life = 3;
  this._force = 1;
  //----------------
}
LanzaGuisantes.prototype = Object.create(Plant.prototype);
LanzaGuisantes.constructor = LanzaGuisantes;
LanzaGuisantes.prototype.shoot=function()
{
 console.log(this._bulletPool.length);
  if(this.game.time.now>this.timeCount){
     if(this._bulletPool.length==0)
      {

        this._bulletPool.push(new Bullet(this.game,this.x+30,this.y-48,'bullet',2,this._force));
        this._bulletPool[0].scale.setTo(2);
        this._bulletPool[0].kill();
        
      }
   var i=0;
   var shooted;
    while(i<this._bulletPool.length&&!shooted)
    {
      
     if(!this._bulletPool[i].alive)
      {
        
        this.animations.play('shootin');
        this._bulletPool[i].revive();
        this._bulletPool[i].relocate(this._force,2,this.x+30,this.y-48);
        
       
      shooted=true;
      
     
      }
    i++
    }
    if(!shooted)
   {
    this.animations.play('shootin');
    this._bulletPool.push(new Bullet(this.game,this.x+30,this.y-48,'bullet',2,this._force));
   
    this._bulletPool[i].scale.setTo(2);
    }
    this.timeCount=this.game.time.now+this.firerate;
  }
  
}

//CLASE ZOMBIE
function Zombie (game, x, y, tag){
  Character.apply(this,[game, x, y, tag]);
  //this.game.add.sprite(100,100,tag);
  this._life = 12;
  this.animations.add('move',[0,1,0]);
  this.animations.play('move',5,true);
}
Zombie.prototype = Object.create(Character.prototype);
Zombie.constructor = Zombie;
// Metodos en Zombies
Zombie.prototype.move = function (velocity) {
  this.x -= velocity;

}
Zombie.prototype.takeDamage = function (damage) {
  this._life-=damage;
  if(this._life<=0)
  {
    this.kill();
  }

}



//Ejemplo ZombieComun
function ZombieComun(game, x, y, tag){
  Zombie.apply(this,[game, x, y, tag]);
  //Atributos propios
  //----------------
  this._life = 12;
  this._force = 1;
  this._vel = 50;
  //----------------
}
ZombieComun.prototype = Object.create(Zombie.prototype);
ZombieComun.constructor = ZombieComun;

module.exports = PlayScene;
