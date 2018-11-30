
//CLASE ProgressBar
function ProgressBar (game, x, y, tag){
    CanvasObject.apply(this,[game, x, y, tag]);
    this.time = 0;
  }
  ProgressBar.prototype = Object.create(CanvasObject.prototype);
  ProgressBar.constructor = ProgressBar;