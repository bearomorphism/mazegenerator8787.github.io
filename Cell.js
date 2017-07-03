var dx = [0, 1, 0 ,-1];
var dy = [-1, 0, 1, 0];
var c;
var insane;

function Cell(i, j) {
  this.i = i;
  this.j = j;
  this.walls = [true, true, true, true];
  this.visited = false;

  this.show = function() {

    var x = this.i*len;
    var y = this.j*len;

    if(this.visited){
      if(insane)c = color(random(50,200), random(50,200), random(50,200));
      fill(c);
      noStroke();
      rect(x, y, len, len);
    }

    stroke(255);
    if(this.walls[0]){
      line(x, y, x + len, y);
    }
    if(this.walls[1]){
      line(x + len, y, x + len, y + len);
    }
    if(this.walls[2]){
      line(x, y + len, x + len, y + len);
    }
    if(this.walls[3]){
      line(x, y, x, y + len);
    }

  }

  this.checkNeighbors = function() {
    var neighbors = [];
    for(var u = 0; u < 4; u++){
      var g = grid[index(this.i + dx[u], this.j + dy[u])];
      if(g && !g.visited){
        neighbors.push(g);
      }
    }
    if(neighbors.length > 0){
      return neighbors;
    }else {
      return undefined;
    }
  }
}

/*
top: 0
right: 1
bottom: 2
left: 3
*/
function removeWalls(a, b) {
  var x = a.i - b.i;
  var y = a.j - b.j;
  if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  } else if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}
