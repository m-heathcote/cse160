// asg0.js

function main() {
  // Retrieve <canvas> element
  var canvas = document.getElementById('example');
  if (!canvas) {
    console.log('Failed to retrieve the <canvas> element');
    return;
  }

  // Get the rendering context
  var ctx = canvas.getContext('2d');
  if (!ctx) {
	  console.log('Failed to get the rendering context');
  	  return;
  }

  // Clear canvas to black 
  function clearCanvas() {
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set a black color
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill a rectangle
  }

  clearCanvas();

  // Function to draw vector
  function drawVector(v, color) {
    let centerX = canvas.width/2;
    let centerY = canvas.height/2;
    ctx.strokeStyle = color;
    
    //console.log("elements: ", v1.elements);
    //console.log("got x = ", v1.elements[0], " and y = ", v1.elements[1]);

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + (v.elements[0] * 20), centerY - (v.elements[1] * 20));
    ctx.stroke();
  }

  // Get input variables
  var v1x = document.getElementById("v1_x");
  var v1y = document.getElementById("v1_y");
  var v2x = document.getElementById("v2_x");
  var v2y = document.getElementById("v2_y");
  
  // Handle user clicking "Draw"
  let button = document.getElementById("button");
  console.log(button);
  
  button.onclick = function() {
    handleDrawEvent();
  }

  function handleDrawEvent(v1, v2) {
    console.log("clicked!");
    var v1x_val = v1x.value;
    var v1y_val = v1y.value;
    var v2x_val = v2x.value;
    var v2y_val = v2y.value;
    console.log("v1 = (", v1x_val, ", ", v1y_val, ")");
    console.log("v2 = (", v2x_val, ", ", v2y_val, ")");
    
    // draw v1 and v2
    clearCanvas();
    var v1 = new Vector3([v1x_val, v1y_val, 0]);
    console.log("v1 = ", v1);
    drawVector(v1, "red");
    var v2 = new Vector3([v2x_val, v2y_val, 0]);
    console.log("v2 = ", v2);
    drawVector(v2, "blue");
  }

  // Draw a red vector v1
  //var v1 = new Vector3([2.25, 2.25, 0]);
  //drawVector(v1, "red");

}
