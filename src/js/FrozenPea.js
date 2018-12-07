//CLASE FrozenPea
function FrozenPea (game, x, y, tag,vel,dam){
    Bullet.apply(this,[game, x, y, tag, vel,dam, new FrozenEffect()]);
        
}
FrozenPea.prototype = Object.create(Bullet.prototype);
FrozenPea.constructor = FrozenPea;