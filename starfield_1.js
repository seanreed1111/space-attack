var canvas = document.createElement('canvas');
var ctx = canvas.getContext("2d");
document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var SPEED = 40;
var STAR_NUMBER = 500;
var starStream$ = Rx.Observable.range(1, STAR_NUMBER)
  .map(function(){
    return {
      x: parseInt(Math.random() * canvas.width),
      y: parseInt(Math.random() * canvas.height),
      size: Math.random() * 3 + 1
    };
  })
  .toArray()
  .flatMap(function(starArray){
    return Rx.Observable.interval(SPEED).map(function(){
      starArray.forEach(function(star) {
        if (star.y >= canvas.height) {
          star.y = 0; // reset start to top of the screen
        }
        star.y += 3; //move star`
      });
      return starArray
    });
  });

function paintStars(stars){
  ctx.fillStyle = '#000000';
  ctx.fillRect(0,0,canvas.width, canvas.height);
  ctx.fillStyle = '#ffffff';
  stars.forEach(function(star) {
    ctx.fillRect(star.x, star.y, star.size, star.size);
  });
}

