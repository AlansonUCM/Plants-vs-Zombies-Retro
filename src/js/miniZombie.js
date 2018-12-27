function ZombieMini(game, x, y, spManager){
    Zombie.apply(this,[game, x, y, 'miniZombie', 150, 300, 40, 1, spManager]);
    
    this.animations.add('move2',[0,1,2]);
    this.animations.add('atack2',[3,4]);

    this.iniLife = this.life;
    this.isTaken = false;
    this.currMovAnim='move2';
    this.currAnim='atack2';
    this.animations.play('move2',5,true);
}
ZombieMini.prototype = Object.create(Zombie.prototype);
ZombieMini.constructor = ZombieMini;

ZombieMini.prototype.takeDamage = function(_damage){
    this.life -= _damage;
    
    if(this.life <= 0)
        this.manager.zombies.getChildAt(0).remove(this,true);  
}