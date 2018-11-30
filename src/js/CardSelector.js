
//Clase CardSelector
function CardSelector (game, xPos, yPos, yOffset, numCards,tagsArray,plantsArray, _spManager){
    this.cards = [];
  
    this.game = game;
    this.spManager = _spManager;
    
    //Temporal
    var tempTagsArray = ['lanzaGuisantes','giraSol','giraSol','nuez','lanzaGuisantes'];
    var tempPlantsArray =[LanzaGuisantes, GiraSol, GiraSol, Nuez, LanzaGuisantes];
  
    for(let i = 0; i < numCards; i++)
      this.cards.push(new Card(game, xPos, yPos +  i * yOffset, tempTagsArray[i], tempPlantsArray[i], this));    // Se tendra que modificar mas tarde
  }
  CardSelector.constructor = CardSelector;
  //Metodos de CardSelector
  CardSelector.prototype.deSelectAll = function(){
    this.game.cursor.clearCursor();
    for(let i = 0; i < this.cards.length; i++)
      this.cards[i].deSelect();
  };