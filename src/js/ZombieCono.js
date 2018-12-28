function ZombieCono(game, x, y, spManager){
    Zombie.apply(this,[game, x, y, 'zombieCono', 560, 100, 14, 1, spManager]);
    
    this.animations.add('move2',[4,5,4]);
    this.animations.add('atack2',[6,7]);

    this.iniLife = this.life;
    this.isTaken = false;
    this.half=false;
    
    this.animations.play('move',5,true);
}
ZombieCono.prototype = Object.create(Zombie.prototype);
ZombieCono.constructor = ZombieCono;

ZombieCono.prototype.takeDamage = function(_damage){
    this.life -= _damage;
    if(this.life <= this.iniLife/2 && !this.isTaken&&!this.half){
        this.half=true;
        this.currMovAnim='move2';
        if( !this.isAttacking){
            this.animations.play('move2',5,true);
            }
        this.currAnim='atack2';
    }
    if(this.life <= 0)
        this.manager.zombies.getChildAt(0).remove(this,true);  
}