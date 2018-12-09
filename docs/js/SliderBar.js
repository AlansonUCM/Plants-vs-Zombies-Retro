function SliderBar(game, x, y, _func, parent){
    CanvasObject.apply(this, [game, x, y, "sliderBar"]);
    parent.addChild(this);
    this.anchor.setTo(0.5);
    //Valor de 0-1
    this.value;
    this.func = _func;

    this.slider = this.game.add.button(x, y, "sliderBoton", undefined, undefined ,1, 0, 0, 0, parent);
    this.slider.anchor.setTo(0.5);

    this.slider.alignIn(this, Phaser.CENTER);
    this.slider.input.enableDrag(true);
    this.slider.visible = false;

    this.slider.onInputDown.add(this.fixPos, this);
    this.slider.events.onDragUpdate.add(this.fixPos, this);

    this.value = this.setValue(1);

}
SliderBar.prototype = Object.create(CanvasObject.prototype);
SliderBar.constructor = SliderBar;

//Metodos
SliderBar.prototype.fixPos = function () {
    //Funciona porque el anchor esta en 0.5 
    this.slider.y = this.y;
    if(this.slider.x < this.x - this.width / 2)
        this.slider.x = this.x - this.width / 2;
    else if(this.slider.x > this.x + this.width / 2)
        this.slider.x = this.x + this.width / 2;

    this.calculateValue();
}

SliderBar.prototype.calculateValue = function(){
    var v = ((this.slider.x - this.x) / (this.width / 2)) / 2 + 0.5;
    this.value = v;
    this.func(v);
}

SliderBar.prototype.getValue = function (){
    return this.value;
}

SliderBar.prototype.setValue = function (_value){
    this.slider.x = (((_value - 0.5) * 2) * (this.width / 2)) + this.x;
    // console.log('Valor: ' + this.slider.x);

    return _value;
}