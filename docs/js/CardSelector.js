
//Clase CardSelector
function CardSelector (game, parent, xPos, yPos, yOffset, numCards,tagsArray,plantsArray, _spManager){
  Phaser.Group.apply(this, [game, parent, "cardSelector"]);
  this.cards = this.game.add.group(this, "Cards");

  this.spManager = _spManager;

  this.lastCardUsed = null;
  
  //Temporal
  var tempTagsArray = ['lanzaGuisantes','giraSol','cherryBoom','nuez','hielaGuisantes'];
  var tempPlantsArray =[LanzaGuisantes, GiraSol, Cereza, Nuez, HielaGuisantes];

  for(let i = 0; i < numCards; i++)
    this.cards.add(new Card(game, xPos, yPos +  i * yOffset, tempTagsArray[i], tempPlantsArray[i], this));    // Se tendra que modificar mas tarde

  this.forceFirstPlant();
}
CardSelector.constructor = CardSelector;
CardSelector.prototype = Object.create(Phaser.Group.prototype);

//Metodos de CardSelector
CardSelector.prototype.deSelectAll = function(){
  this.game.cursor.clearCursor();
  for(let i = 0; i < this.cards.length; i++)
    this.cards.getChildAt(i).deSelect();
}
CardSelector.prototype.actualizaAspecto = function(){
  for(let i = 0; i < this.cards.length; i++){
    var card = this.cards.getChildAt(i);
    if(card.plantRef.cost <= this.spManager.sunCounter.points && !card.isUsed){
      card.tint = parseInt('0xFFFFFF');
      card.input.enabled = true;
    }
    //Oscurece si no hay dinero o si esta usada
    else if(card.plantRef.cost > this.spManager.sunCounter.points || card.isUsed){
      card.tint = parseInt('0xBBBBBB');
      card.input.enabled = false;
    }
  }
}
CardSelector.prototype.forceFirstPlant = function(){
  for (let i = 0; i < this.cards.length; i++){
    var card = this.cards.getChildAt(i);
    if(card.plantRef != GiraSol && card.plantRef.cost <= this.spManager.sunCounter.points){
      card.setUsed();
    }
  }
  this.actualizaAspecto();
}