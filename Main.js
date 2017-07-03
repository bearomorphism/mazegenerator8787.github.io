var grid;
var len = 20;
var w;
var h;
var vis;
var button;
var slider;
var sel;
var che;

function dfs(cell) {
  if(!cell)return undefined;
  //console.log(cell);
  cell.visited = true;
  var neighbors = cell.checkNeighbors();
  if(neighbors) {
    vis.push(cell);
    var n = neighbors[floor(random(neighbors.length))];
    removeWalls(cell, n);
    vis.push(n);
  }
}

function index(i, j) {
  if(i >= w || i < 0 || j >= h || j < 0)return undefined;
  return i + j * w;
}

function reset() {
  c = color(random(100,255), random(100,255), random(100,255), 150);
  grid = [];
  vis = [];
  len = parseInt(sel.value());
  insane = che.checked();
  w = width / len;
  h = height / len;
  for(var j = 0; j < h; j++){
    for(var i = 0; i < w; i++){
      grid.push(new Cell(i, j));
    }
  }
  var cell = grid[floor(random(grid.length))];
  vis.push(cell);
}

function setup() {
  createCanvas(800, 600);
  createP('');
  createElement('label', 'Speed');
  slider = createSlider(1, 40, 10);

  createP('');
  button = createButton('Reset');
  button.mousePressed(reset);
  createP('');

  //select
  sel = createSelect();
  var arr = [20, 25, 40, 50, 100];
  for(var a in arr){
    sel.option(arr[a]);
  }
  sel.changed(reset);
  createP('');

  che = createCheckbox('Insane mode');
  che.changed(reset);

  reset();
}

function draw() {
  background(50);
  frameRate(slider.value());

  for(var i = 0; i < grid.length; i++){
    grid[i].show();
  }
  var cell = vis.pop();
  //console.log(cell);
  if(cell){
    fill(0, 255, 0);
    noStroke();
    rect(cell.i*len, cell.j*len, len, len);
    dfs(cell);
  }
}

function keyPressed() {
  if(keyCode === ENTER){
    reset();
  }
}
