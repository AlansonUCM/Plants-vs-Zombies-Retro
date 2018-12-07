//CLASE NormalPea
function NormalPea (game, x, y, tag,vel,dam){
    Bullet.apply(this,[game, x, y, tag, vel,dam]);
    // this.scale.setTo(2);

    
}
NormalPea.prototype = Object.create(Bullet.prototype);
NormalPea.constructor = NormalPea;
  