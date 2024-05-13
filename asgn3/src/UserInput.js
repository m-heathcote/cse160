// UserInput.js

// -- Globals for Mouse Movement --
g_prevX = 0;
g_prevY = 0;
g_lookWithMouse = false;

// -- Globals for Turtle Movement --
var E = 0;  // east
var S = 1;  // south
var W = 2;  // west
var N = 3;  // north
var g_facing = N;
var g_turtleRot = 90;
var g_turtleX = 0;
var g_turtleZ = 0;
var g_turtleRot = 90;

// -- Globals for Building --
var NOBUILD = 0;
var BUILD = 1;
var BREAK = 2;
var g_buildMode = NOBUILD;
var WOOD = 2;
var COBBLE = 4;
var DIRT = 6;
var BRICKS = 8;
var g_blockType = WOOD;
var g_selected = null;

// ----- convertCoordinatesEventToGL -----
// Extract the event click and return it in WebGL coordinates
function convertCoordinatesEventToGL(ev) {
  var x = ev.clientX; // x coordinate of a mouse pointer
  var y = ev.clientY; // y coordinate of a mouse pointer
  var rect = ev.target.getBoundingClientRect();

  x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
  y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

  return([x, y]);
}
// ----- end convertCoordinatesEventToGL -----

// save each interval id in a dict indexed by keyCode
var intervals = {};

// save each function to loop in a dict indexed by keyCode
var keyFunc = {
  87: function() {                  // W
    camera.moveForward();
    selectBlocks();
  },
  65: function() {                  // A
    camera.moveLeft();
    selectBlocks();
  },
  83: function() {                  // S
    camera.moveBackward();
    selectBlocks();
  },
  68: function() {                  // D
    camera.moveRight();
    selectBlocks();
  },
  32: function() {                  // space
    camera.moveUp();
    selectBlocks();
  },
  16: function() {                  // shift
    camera.moveDown();
    selectBlocks();
  },
  38: function() {                  // up arrow
    g_animation = ON;
    
    let mapZ = toMapCoords(g_turtleZ);
    let mapX = toMapCoords(g_turtleX);
    
    switch(g_facing) {
      case N:
        if (!g_map[mapZ - 1][mapX][0] && !g_map[mapZ - 1][mapX][1]) {  // turtle is 2 blocks tall
          g_turtleZ -= 0.1;
        }
        break;
      case E:
        if (!g_map[mapZ][mapX + 1][0] && !g_map[mapZ][mapX + 1][1]) {
          g_turtleX += 0.1;
        }
        break;
      case S:
        if (!g_map[mapZ + 1][mapX][0] && !g_map[mapZ + 1][mapX][1]) {
          g_turtleZ += 0.1;
        }
        break;
      case W:
        if (!g_map[mapZ][mapX - 1][0] && !g_map[mapZ][mapX - 1][1]) {
          g_turtleX -= 0.1;
        }
        break;
    }
  },
  37: function() {                  // left arrow
    switch(g_facing) {
      case N:
        g_facing = W;
        g_turtleRot = 180;
        break;
      case E:
        g_facing = N;
        g_turtleRot = 90;
        break;
      case S:
        g_facing = E;
        g_turtleRot = 0;
        break;
      case W:
        g_facing = S;
        g_turtleRot = 270;
        break;
    }
  },
  40: function() {                  // down arrow
    g_animation = ON

    let mapZ = toMapCoords(g_turtleZ);
    let mapX = toMapCoords(g_turtleX);

    switch(g_facing) {
      case N:
        if (!g_map[mapZ + 1][mapX][0] && !g_map[mapZ + 1][mapX][1]) {
          g_turtleZ += 0.1;
        }
        break;
      case E:
        if (!g_map[mapZ][mapX - 1][0] && !g_map[mapZ][mapX - 1][1]) {
          g_turtleX -= 0.1;
        }
        break;
      case S:
        if (!g_map[mapZ - 1][mapX][0] && !g_map[mapZ - 1][mapX][1]) {
          g_turtleZ -= 0.1;
        }
        break;
      case W:
        if (!g_map[mapZ][mapX + 1][0] && !g_map[mapZ][mapX + 1][1]) {
          g_turtleX += 0.1;
        }
        break;
    }
  },
  39: function() {                  // right arrow
    switch(g_facing) {
      case S:
        g_facing = W;
        g_turtleRot = 180;
        break;
      case W:
        g_facing = N;
        g_turtleRot = 90;
        break;
      case N:
        g_facing = E;
        g_turtleRot = 0;
        break;
      case E:
        g_facing = S;
        g_turtleRot = 270;
        break;
    }
  }
};

// set up looping interval for these functions (until key released)
var loopedKeys = [87, 65, 83, 68,  32,    16,  38, 40];
//                 W   A   S   D  space  shift  ^   v

// run these once when clicked
var clickedKeys = [37, 39];
//                  <   >

// ----- keydown -----
function keydown(ev) {
  if (loopedKeys.includes(ev.keyCode) && !intervals[ev.keyCode]) {
    intervals[ev.keyCode] = setInterval(keyFunc[ev.keyCode], 50);
  } else
  if (clickedKeys.includes(ev.keyCode)) {
    keyFunc[ev.keyCode]();
  } else
  if (ev.keyCode == 27) {  // esc
    g_lookWithMouse = !g_lookWithMouse;

    if (g_lookWithMouse) {
      [x, y] = convertCoordinatesEventToGL(ev);
      g_prevX = x;
      g_prevY = y;
    }
  } else
  if (ev.keyCode == 9) {  // tab
    // faster speed
    camera.speed = 0.4;
  } else
  if (ev.keyCode == 66) {  // B
    // toggle build mode
    if (g_buildMode === NOBUILD) {
      g_buildMode = BUILD;
    } else
    if (g_buildMode === BUILD) {
      g_buildMode = BREAK;
    } else
    if (g_buildMode === BREAK) {
      g_buildMode = NOBUILD;
    }
  } else
  if (ev.keyCode == 49) {
    g_blockType = WOOD;
  } else
  if (ev.keyCode == 50) {
    g_blockType = COBBLE;
  } else
  if (ev.keyCode == 51) {
    g_blockType = DIRT;
  } else
  if (ev.keyCode == 52) {
    g_blockType = BRICKS;
  }

  console.log("key: ", ev.keyCode);
}
// ----- end keydown -----

// ----- keyup -----
function keyup(ev) {
  if (loopedKeys.includes(ev.keyCode)) {
    clearInterval(intervals[ev.keyCode]);
    delete intervals[ev.keyCode];

    if (ev.keyCode == 38 || ev.keyCode == 40) {
      g_animation = OFF;
    }
  } else
  if (ev.keyCode == 9) {  // tab
    // normal speed
    camera.speed = 0.1;
  }
}
// ----- end keyup -----

// ----- mousemove -----
function mousemove(ev) {
  if (g_lookWithMouse) {
    // Extract the event click coords
    var x = ev.clientX; // x coordinate of a mouse pointer
    var y = ev.clientY; // y coordinate of a mouse pointer
    x = ((x) - canvas.width/2)/(canvas.width/2);
    y = (canvas.height/2 - (y))/(canvas.height/2);

    // Get Difference (drag length)
    let xDiff = x - g_prevX;
    let yDiff = y - g_prevY;

    let panX = xDiff * 90;
    let panY = yDiff * 90;

    g_prevX = x;
    g_prevY = y;

    if (xDiff < 0) {
      camera.panLeft(panX);
    } else
    if (xDiff > 0) {
      camera.panRight(panX);
    }

    if (yDiff < 0) {
      camera.panDown(panY);
    } else
    if (yDiff > 0) {
      camera.panUp(panY);
    }

    // change looked-at block texture
    selectBlocks();
  }
}
// ----- end mousemove -----

// ----- closestKey -----
function closestKey(object, x) {
  var keys = Object.keys(object);

  // if no keys (empty)
  if (keys.length === 0) {
    return -1;
  }

  // convert keys to numbers
  var numericalKeys = keys.map(key => parseInt(key));

  // iterate and find closest
  let closest = numericalKeys[0];
  numericalKeys.forEach(key => {
    if (key <= x && key > closest) {
      closest = key;
    }
  });

  return closest === undefined ? -1 : closest;
}
// ----- end closestKey -----

// ----- selectBlocks -----
function selectBlocks() {
  if (g_buildMode != NOBUILD) {
    let atX = toMapCoords(camera.at.elements[0]);
    let atY = toMapCoords(camera.at.elements[1]) - 15;
    let atZ = toMapCoords(camera.at.elements[2]);

    // find closest Y to looked at
    let closestY = closestKey(g_map[atZ][atX], atY);

    if (atZ < 32 && atX < 32) {   // if in range
      // select current block
      g_selected = [atZ, atX, closestY];  // South/North, East/West, Up/Down
    }
  }
  else {
    // deselect
    g_selected = null;
  }
}
// ----- end selectBlocks -----

// ----- click -----
function click() {
  let atX = toMapCoords(camera.at.elements[0]);
  let atY = toMapCoords(camera.at.elements[1]) - 15;
  let atZ = toMapCoords(camera.at.elements[2]);

  // find closest Y to looked at
  let closestY = closestKey(g_map[atZ][atX], atY);

  if (atZ < 32 && atX < 32) {
    if (g_buildMode === BUILD) {
      g_map[atZ][atX][closestY + 1] = g_blockType;  // build 1 above selected
    } else
    if (g_buildMode === BREAK) {
      delete g_map[atZ][atX][closestY];  // delete selected
    } 
  }
}
// ----- end click -----