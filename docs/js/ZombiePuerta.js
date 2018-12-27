function ZombiePuerta(game, x, y, spManager){
    Zombie.apply(this,[game, x, y, 'zombiePuerta', 1600, 100, 7, 1, spManager]);
    
    this.animations.add('move2',[4,5,4]);
    this.animations.add('atack2',[6,7]);

    this.iniLife = 400;
    this.isTaken = false;
    
    this.animations.play('move',5,true);
}
ZombiePuerta.prototype = Object.create(Zombie.prototype);
ZombiePuerta.constructor = ZombiePuerta;

ZombiePuerta.prototype.takeDamage = function(_damage){
    this.life -= _damage;
    if(this.life <= this.iniLife/2 && !this.isTaken){
        this.currMovAnim='move2';
        this.animations.play('move2',5,true);
        this.currAnim='atack2';
    }
    if(this.life <= 0)
        this.manager.zombies.getChildAt(0).remove(this,true);  
}