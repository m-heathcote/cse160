// asg0.js

function main() {
  // Retrieve <canvas> element <- (1)
  var canvas = document.getElementById('example');
  if (!canvas) {
    console.log('Failed to retrieve the <canvas> element');
    return;
  }

  // Get the rendering context for 2DCG <- (2)
  var ctx = canvas.getContext('2d');

  // Draw a blue rectangle <- (3)
  // (use rectangle to create black background)
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set a black color
  ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill a rectangle with the color

  // ------------------------------------------------------------------

  // *** me testing stuff in javascript ***
  /*
  console.log("howdy partner");
  let a = 5;
  let b = 10;
  let c = a + b;
  console.log(a, "+", b, "=", c);
  console.log("counting...");
  for(let i = 0; i < 5; i++) {
    console.log(i);
  }
  */
  
  // ------------------------------------------------------------------

  // draw a red vector v1

  function drawVector(v, color) {
    ctx.beginPath();
    ctx.moveTo(200, 200);
    console.log("got x = ", v1[0], " and y = ", v1[1]);
    ctx.lineTo(1 * 20, 1 * 20);
    ctx.strokeStyle = color;
    ctx.stroke();
  }

  var v1 = new Vector3(2.25, 2.25, 0);
  drawVector(v1, "red");

}
