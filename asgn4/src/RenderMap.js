// RenderMap.js

var g_map = [];  // g_map[z][x][y]
var g_mapInitialized = false;

var g_buildTrees = true;
var g_buildHouse = true;

function create3DMap(map, size) {
  for (i = 0; i < size; i++) {
    map.push([]);        // rows
    for (j = 0; j < size; j++) {
      map[i].push({});   // cols
    }
  }
}

function clearMap() {
  g_map = [];
  create3DMap(g_map, 32);  // 32 x 32 matrix filled with empty dictionaries {} used to store 3rd dimension
}

function addTree(x, z) {
  // (no bounds checking here... be careful lol)
  g_map[z][x][0] = LOG;
  g_map[z][x][1] = LOG;
  g_map[z][x][2] = LOG;
  //g_map[z][x][3] = LOG;

  /*
  g_map[z+1][x+1][2] = LEAVES;
  g_map[z-1][x+1][2] = LEAVES;
  g_map[z+1][x-1][2] = LEAVES;
  g_map[z-1][x-1][2] = LEAVES;
  g_map[z+1][x][2] = LEAVES;
  g_map[z-1][x][2] = LEAVES;
  g_map[z][x+1][2] = LEAVES;
  g_map[z][x-1][2] = LEAVES;
  */

  g_map[z+2][x-1][2] = LEAVES;
  g_map[z+2][x][2] = LEAVES;
  g_map[z+2][x+1][2] = LEAVES;
  g_map[z-1][x+2][2] = LEAVES;
  g_map[z][x+2][2] = LEAVES;
  g_map[z+1][x+2][2] = LEAVES;
  
  g_map[z-2][x-1][2] = LEAVES;
  g_map[z-2][x][2] = LEAVES;
  g_map[z-2][x+1][2] = LEAVES;
  g_map[z-1][x-2][2] = LEAVES;
  g_map[z][x-2][2] = LEAVES;
  g_map[z+1][x-2][2] = LEAVES;

  g_map[z+1][x+1][3] = LEAVES;
  g_map[z-1][x+1][3] = LEAVES;
  g_map[z+1][x-1][3] = LEAVES;
  g_map[z-1][x-1][3] = LEAVES;
  g_map[z+1][x][3] = LEAVES;
  g_map[z-1][x][3] = LEAVES;
  g_map[z][x+1][3] = LEAVES;
  g_map[z][x-1][3] = LEAVES;

  g_map[z][x][4] = LEAVES;
}

function addHouse(x, z) {

  // back wall

  g_map[z][x][0] = COBBLE;
  g_map[z][x+1][0] = COBBLE;
  g_map[z][x+2][0] = COBBLE;
  g_map[z][x+3][0] = COBBLE;
  g_map[z][x+4][0] = COBBLE;

  g_map[z][x][1] = WOOD;
  g_map[z][x+1][1] = WOOD;
  g_map[z][x+2][1] = WOOD;
  g_map[z][x+3][1] = WOOD;
  g_map[z][x+4][1] = WOOD;

  g_map[z][x][2] = LOG;
  g_map[z][x+1][2] = WOOD;
  g_map[z][x+2][2] = WOOD;
  g_map[z][x+3][2] = WOOD;
  g_map[z][x+4][2] = LOG;

  g_map[z][x+1][3] = LOG;
  g_map[z][x+2][3] = LOG;
  g_map[z][x+3][3] = LOG;

  // left side

  g_map[z+1][x][0] = COBBLE;
  g_map[z+2][x][0] = COBBLE;
  g_map[z+3][x][0] = COBBLE;

  g_map[z+3][x][1] = WOOD;

  g_map[z+1][x][2] = LOG;
  g_map[z+2][x][2] = LOG;
  g_map[z+3][x][2] = LOG;

  g_map[z+1][x][3] = BRICKS;
  g_map[z+1][x][4] = BRICKS;

  // right side

  g_map[z+1][x+4][0] = COBBLE;
  g_map[z+2][x+4][0] = COBBLE;
  g_map[z+3][x+4][0] = COBBLE;

  g_map[z+3][x+4][1] = WOOD;

  g_map[z+1][x+4][2] = LOG;
  g_map[z+2][x+4][2] = LOG;
  g_map[z+3][x+4][2] = LOG;

  // front

  //g_map[z+3][x+1][0] = COBBLE;
  //g_map[z+3][x+3][0] = COBBLE;

  //g_map[z+3][x+1][1] = WOOD;
  //g_map[z+3][x+3][1] = WOOD;

  g_map[z+3][x+1][2] = WOOD;
  g_map[z+3][x+2][2] = WOOD;
  g_map[z+3][x+3][2] = WOOD;

  g_map[z+3][x+1][3] = LOG;
  g_map[z+3][x+2][3] = LOG;
  g_map[z+3][x+3][3] = LOG;

  // roof

  g_map[z+1][x+1][3] = LOG;
  g_map[z+1][x+2][3] = LOG;
  g_map[z+1][x+3][3] = LOG;

  g_map[z+2][x+1][3] = LOG;
  g_map[z+2][x+2][3] = LOG;
  g_map[z+2][x+3][3] = LOG;
}

function addHouse2(x, z) {
  // back

  g_map[z][x][0] = COBBLE;
  g_map[z][x+1][0] = COBBLE;
  g_map[z][x+2][0] = COBBLE;
  g_map[z][x+3][0] = COBBLE;
  g_map[z][x+4][0] = COBBLE;
  g_map[z][x+5][0] = COBBLE;

  g_map[z][x][1] = WOOD;
  g_map[z][x+1][1] = WOOD;
  g_map[z][x+2][1] = WOOD;
  g_map[z][x+3][1] = WOOD;
  g_map[z][x+4][1] = WOOD;
  g_map[z][x+5][1] = WOOD;

  g_map[z][x][3] = LOG;
  g_map[z][x+1][2] = WOOD;
  g_map[z][x+2][2] = WOOD;
  g_map[z][x+3][2] = WOOD;
  g_map[z][x+4][2] = WOOD;
  g_map[z][x+5][3] = LOG;

  g_map[z][x+1][4] = LOG;
  g_map[z][x+2][5] = LOG;
  g_map[z][x+3][5] = LOG;
  g_map[z][x+4][4] = LOG;

  g_map[z][x+2][3] = WOOD;
  g_map[z][x+3][3] = WOOD;

  g_map[z][x+2][4] = WOOD;
  g_map[z][x+3][4] = WOOD;
  g_map[z][x+4][3] = WOOD;
  g_map[z][x+1][3] = WOOD;
  
  g_map[z][x+1][2] = WOOD;
  g_map[z][x+5][2] = WOOD;

  // left side

  g_map[z+1][x][0] = COBBLE;
  g_map[z+2][x][0] = COBBLE;
  g_map[z+3][x][0] = COBBLE;

  g_map[z+3][x][1] = WOOD;
  g_map[z+3][x][2] = WOOD;

  //g_map[z+1][x][3] = LOG;
  g_map[z+2][x][3] = LOG;
  g_map[z+3][x][3] = LOG;

  g_map[z+1][x-1][2] = LOG;
  g_map[z+2][x-1][2] = LOG;
  g_map[z+3][x-1][2] = LOG;

  g_map[z+1][x][3] = BRICKS;
  g_map[z+1][x][4] = BRICKS;
  g_map[z+1][x][5] = BRICKS;

  // right side

  g_map[z+1][x+5][0] = COBBLE;
  g_map[z+2][x+5][0] = COBBLE;
  g_map[z+3][x+5][0] = COBBLE;

  g_map[z+3][x+5][1] = WOOD;
  g_map[z+3][x+5][2] = WOOD;

  g_map[z+1][x+5][3] = LOG;
  g_map[z+2][x+5][3] = LOG;
  g_map[z+3][x+5][3] = LOG;

  g_map[z+1][x+6][2] = LOG;
  g_map[z+2][x+6][2] = LOG;
  g_map[z+3][x+6][2] = LOG;

  // front

  g_map[z+3][x+1][0] = COBBLE;
  g_map[z+3][x+4][0] = COBBLE;

  g_map[z+3][x+1][1] = WOOD;
  g_map[z+3][x+4][1] = WOOD;

  g_map[z+3][x+1][2] = WOOD;
  //g_map[z+3][x+2][2] = WOOD;
  //g_map[z+3][x+3][2] = WOOD;
  g_map[z+3][x+4][2] = WOOD;

  g_map[z+3][x+1][4] = LOG;
  g_map[z+3][x+2][5] = LOG;
  g_map[z+3][x+3][5] = LOG;
  g_map[z+3][x+4][4] = LOG;

  g_map[z+3][x+2][3] = WOOD;
  g_map[z+3][x+3][3] = WOOD;

  g_map[z+3][x+2][4] = WOOD;
  g_map[z+3][x+3][4] = WOOD;
  g_map[z+3][x+4][3] = WOOD;
  g_map[z+3][x+1][3] = WOOD;

  // roof

  g_map[z+1][x+1][4] = LOG;
  g_map[z+1][x+2][5] = LOG;
  g_map[z+1][x+3][5] = LOG;
  g_map[z+1][x+4][4] = LOG;

  g_map[z+2][x+1][4] = LOG;
  g_map[z+2][x+2][5] = LOG;
  g_map[z+2][x+3][5] = LOG;
  g_map[z+2][x+4][4] = LOG;

  g_map[z-1][x][3] = LOG;
  g_map[z-1][x+1][4] = LOG;
  g_map[z-1][x+2][5] = LOG;
  g_map[z-1][x+3][5] = LOG;
  g_map[z-1][x+4][4] = LOG;
  g_map[z-1][x+5][3] = LOG;

  g_map[z+4][x][3] = LOG;
  g_map[z+4][x+1][4] = LOG;
  g_map[z+4][x+2][5] = LOG;
  g_map[z+4][x+3][5] = LOG;
  g_map[z+4][x+4][4] = LOG;
  g_map[z+4][x+5][3] = LOG;

  g_map[z-1][x-1][2] = LOG;
  g_map[z][x-1][2] = LOG;
  g_map[z+4][x-1][2] = LOG;
  g_map[z-1][x+6][2] = LOG;
  g_map[z][x+6][2] = LOG;
  g_map[z+4][x+6][2] = LOG;
}

function initMap() {
  clearMap();

  if (g_buildTrees) {
    addTree(8, 5);
    addTree(4, 10);
    addTree(27, 27);
  }

  if (g_buildHouse) {
    //addHouse(14, 6);
    addHouse2(14, 6);
  }
}

function toMapCoords(num) {
  if (num < -8) {
    return 0;
  }
  else {
    return Math.round((num + 8) * 2);
  }
}

function drawMap() {
  if (!g_mapInitialized) {
    initMap();
    g_mapInitialized = true;
  }

  var block = new Cube();

  for (var z = 0; z < 32; z++) {
    for (var x = 0; x < 32; x++) {
      // loop over keys in y dict
      for (var y in g_map[z][x]) {
        if (g_map[z][x].hasOwnProperty(y)){
          if (g_selected != null && g_selected[0] === z && g_selected[1] === x && g_selected[2] == y) {
            block.textureNum = g_map[z][x][y] + 1;
          }
          else {
            block.textureNum = g_map[z][x][y];
          }

          block.matrix.setIdentity();
          block.matrix.translate(0, -0.75, 0);
          block.matrix.scale(0.5, 0.5, 0.5);
          block.matrix.translate(x - 16, y, z - 16);
          block.render();
        }
      }

      // if column selected but no blocks in column
      if (g_selected != null && g_selected[0] === z && g_selected[1] === x && g_selected[2] == -1) {
        // highlight square on floor
        block.textureNum = -2;
        block.color = [70/255, 103/255, 70/255, 1];
        block.matrix.setIdentity();
        block.matrix.translate(0, -0.75, 0);
        block.matrix.scale(0.5, 0.01, 0.5);
        block.matrix.translate(x - 16, -0.55, z - 16);
        block.render();
      }
    }
  }
}