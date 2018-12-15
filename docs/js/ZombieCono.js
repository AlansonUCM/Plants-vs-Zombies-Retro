function ZombieCono(game, x, y, spManager){
    Zombie.apply(this,[game, x, y, 'zombieCono', 560, 100, 14, 1, spManager]);
    
    this.animations.add('move2',[2,3,2]);

    this.iniLife = this.life;
    this.isTaken = false;
    
    this.animations.play('move',5,true);
}
ZombieCono.prototype = Object.create(Zombie.prototype);
ZombieCono.constructor = ZombieCono;

ZombieCono.prototype.takeDamage = function(_damage){
    this.life -= _damage;
    if(this.life <= this.iniLife/2 && !this.isTaken){
        this.animations.play('move2',5,true);
    }
    if(this.life <= 0)
        this.manager.zombies.getChildAt(0).remove(this,true);  
}