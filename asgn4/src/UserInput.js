// UserInput.js

// -- Globals for Mouse Movement --
g_prevX = 0;
g_prevY = 0;
g_lookWithMouse = false;

// -- Globals for Building --
var T = 4;  // top     (for getting face of cube looked at)
var B = 5;  // bottom  (used with N,E,S,W above)
var NOBUILD = 0;
var BUILD = 1;
var BREAK = 2;
var g_buildMode = NOBUILD;
var WOOD = 2;
var COBBLE = 4;
var DIRT = 6;
var BRICKS = 8;
var LOG = 10;
var LEAVES = 12;
var g_blockType = WOOD;
var g_selected = null;
var g_buildHeight = 50;

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
  81: function() {                  // Q
    camera.panLeft(-5);
    selectBlocks();
  },
  69: function() {                  // E
    camera.panRight(5);
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
  },
  80: function() {                  // P
    g_animation = POKE;
  },
  79: function() {                  // O
    if(g_animation == ON) {
      g_animation = OFF;
    } else
    if (g_animation == OFF) {
      g_animation = ON;
    }
  }
};

// set up looping interval for these functions (until key released)
var loopedKeys = [87, 65, 83, 68,  32,    16,  38, 40, 81, 69];
//                 W   A   S   D  space  shift  ^   v   Q   E

// run these once when clicked
var clickedKeys = [37, 39, 80, 79];
//                  <   >   P   O

// ----- keydown -----
function keydown(ev) {
  if (loopedKeys.includes(ev.keyCode)) {
    // clear interval if it exists
    if (intervals[ev.keyCode]) {
      clearInterval(intervals[ev.keyCode]);
    }
    // start new interval
    keyFunc[ev.keyCode]();  // extra call to fix weird movement glitch
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
  if (ev.keyCode == 86) {  // V
    g_buildMode = NOBUILD;
  } else
  if (ev.keyCode == 66) {  // B
    g_buildMode = BUILD;
  } else
  if (ev.keyCode == 78) {  // N
    g_buildMode = BREAK;
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
  } else
  if (ev.keyCode == 53) {
    g_blockType = LOG;
  } else
  if (ev.keyCode == 54) {
    g_blockType = LEAVES;
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
    camera.speed = 0.2;
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
  let closest = -1;
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
    //let addX = (camera.at.elements[0] - camera.eye.elements[0]) < 1 ? -1 : (camera.at.elements[0] - camera.eye.elements[0]) > 1 ? 1 : 0;
    //let addZ = (camera.at.elements[2] - camera.eye.elements[2]) < 1 ? -1 : (camera.at.elements[2] - camera.eye.elements[2]) > 1 ? 1 : 0;

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

// ----- whichFace -----
function whichFace() {
  deltaX = camera.at.elements[0] - camera.eye.elements[0];
  deltaY = camera.at.elements[1] - camera.eye.elements[1];
  deltaZ = camera.at.elements[2] - camera.eye.elements[2];

  let topBias = deltaY < 0 ? 0.3 : 0;

  d = [Math.abs(deltaX), Math.abs(deltaY) + topBias, Math.abs(deltaZ)];
  let maxIndex = d.indexOf(Math.max(...d));

  if (maxIndex === 0) {
    return deltaX > 0 ? W : E;
  } else
  if (maxIndex === 1) {
    return deltaY > 0 ? B : T;
  } else
  if (maxIndex === 2) {
    return deltaZ > 0 ? N : S;
  }
}
// ----- end whichFace -----

// ----- click -----
function click() {
  //let addX = (camera.at.elements[0] - camera.eye.elements[0]) < 1 ? -1 : (camera.at.elements[0] - camera.eye.elements[0]) > 1 ? 1 : 0;
  //let addZ = (camera.at.elements[2] - camera.eye.elements[2]) < 1 ? -1 : (camera.at.elements[2] - camera.eye.elements[2]) > 1 ? 1 : 0;

  let atX = toMapCoords(camera.at.elements[0]);
  let atY = toMapCoords(camera.at.elements[1]) - 15;
  let atZ = toMapCoords(camera.at.elements[2]);

  // find closest Y to looked at
  let closestY = closestKey(g_map[atZ][atX], atY);

  if (atZ < 32 && atX < 32) {
    if (g_buildMode === BUILD) {
      //g_map[atZ][atX][closestY + 1] = g_blockType;  // build 1 above selected

      var side = whichFace();
      if (closestY === -1) {
        side = T;
      }

      if (side === N) {  // North
        if (atZ > 0 && closestY >= 0) {
          g_map[atZ - 1][atX][closestY] = g_blockType;
        }
      } else
      if (side === E && closestY >= 0) {  // East
        if (atX < 31) {
          g_map[atZ][atX + 1][closestY] = g_blockType;
        }
      } else
      if (side === S && closestY >= 0) {  // South
        if (atZ < 31) {
          g_map[atZ + 1][atX][closestY] = g_blockType;
        }
      } else
      if (side === W && closestY >= 0) {  // West
        if (atX > 0) {
          g_map[atZ][atX - 1][closestY] = g_blockType;
        }
      } else
      if (side === T) {  // Top
        if (closestY < g_buildHeight - 1) {
          g_map[atZ][atX][closestY + 1] = g_blockType;
        }
      } else
      if (side === B) {  // Bottom
        if (closestY >= 0) {
          g_map[atZ][atX][closestY - 1] = g_blockType;
        }
      }

    } else
    if (g_buildMode === BREAK) {
      delete g_map[atZ][atX][closestY];  // delete selected
    } 
  }
}
// ----- end click -----