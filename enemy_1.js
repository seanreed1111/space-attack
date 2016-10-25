var ENEMY_FREQ = 1500;
var enemies$ = Rx.Observable.interval(ENEMY_FREQ)
  .scan(function(enemyArray){
    var enemy = {
      x: parseInt(Math.random() * canvas.width),
      y: -30,
    };
    enemyArray.push(enemy);
    return enemyArray;
  }, []);

  var game$ = Rx.Observable
    .combineLatest(
      starStream$, spaceShip$, enemies$,
      function(stars, spaceship, enemies){
        return {
          stars: stars,
          spaceship: spaceship,
          enemies: enemies
        };
      });

function getRandomInt(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function paintEnemies(enemies) {
  enemies.forEach(function(enemy){
    enemy.y += 5;
    enemy.x += getRandomInt(-15, 15);
    drawTriangle(enemy.x, enemy.y, 20, '#00ff00', 'down');
  });
}

game$.subscribe(renderScene);