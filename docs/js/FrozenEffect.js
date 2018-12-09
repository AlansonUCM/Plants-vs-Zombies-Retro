function FrozenEffect(){
    this.effectTime = 15000;
    this.entity;
    this.timer;
}
FrozenEffect.constructor = FrozenEffect;

//Metodos
FrozenEffect.prototype.activate = function(a){
    this.entity = Object.assign({},a);
    //Reduce 50% la velocidad
    a.velocity *= 0.5;
    a.tint = '0x9effff';
    console.log("Efecto HELADO aplicado");
}
FrozenEffect.prototype.deactivate = function(a){
    a.velocity = this.entity.velocity;
    a.tint = this.entity.tint;
    
    console.log("Efecto HELADO quitado");
}