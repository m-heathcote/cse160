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
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set a black color
  ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill a rectangle with the color

  // Function to draw vector
  function drawVector(v, color) {
    let centerX = canvas.width/2;
    let centerY = canvas.height/2;
    ctx.strokeStyle = color;
    
    //console.log("elements: ", v1.elements);
    //console.log("got x = ", v1.elements[0], " and y = ", v1.elements[1]);

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + (v1.elements[0] * 20), centerY - (v1.elements[1] * 20));
    ctx.stroke();
  }

  // Draw a red vector v1
  var v1 = new Vector3([2.25, 2.25, 0]);
  drawVector(v1, "red");

}
