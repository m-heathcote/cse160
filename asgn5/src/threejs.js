import * as SetUp from "./SetUp.js"
import * as Lighting from "./Lighting.js"
import * as Shapes from "./Shapes.js"
import * as Objects from "./Objects.js"
import * as Animation from "./Animation.js"


function main() {

  // ---------- Set Up Scene ----------

  // look up the canvas
  SetUp.setCanvas();
	
  // create a renderer
  SetUp.createRenderer()

  // create camera (with orbit controls)
  SetUp.initCamera();

  // create a scene
  SetUp.createScene();

  // create lights
  var lights = Lighting.createLights();
	
  // ---------- Geometry Objects ----------

  // create checkered floor
  var checkeredFloor = Shapes.createPlane();

  // create room walls
  Shapes.createWalls();
  
  // create bookshelf obj
  Objects.createBookshelf();

  // create books obj
  Objects.createBooks();

  // create dice
  Shapes.createDice();

  // ---------- Animation ----------

  // begin animation
	requestAnimationFrame(Animation.render);
}

main();

