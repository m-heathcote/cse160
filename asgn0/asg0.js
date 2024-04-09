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
  var op = document.getElementById("op_select");
  var scalar = document.getElementById("scalar");
  
  // Handle user clicking "Draw" (button 1)
  let button1 = document.getElementById("button1");
  console.log(button1);
  
  button1.onclick = function() {
    handleDrawEvent();
  }

  function handleDrawEvent(v1, v2) {
    console.log("clicked Draw 1");
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

  // Handle user clicking "Draw" (button 2)
  let button2 = document.getElementById("button2");
  console.log(button2);
  
  button2.onclick = function() {
    handleDrawOperationEvent();
  }

  function handleDrawOperationEvent(v1, v2) {
    console.log("clicked Draw 2");
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

    // calculate v3 and v4
    var v3 = new Vector3([0, 0, 0]);
    var v4 = new Vector3([0, 0, 0]);
    v3.set(v1);

    console.log("op = ", op.value);
    
    if (op.value == "add") {
      v3 = v3.add(v2); 
    }
    else if (op.value == "sub") {
      v3 = v3.sub(v2); 
    }
    else if (op.value == "mul") {
      v3 = v3.mul(scalar.value); 
      v4.set(v2);
      v4 = v4.mul(scalar.value); 
    }
    else if (op.value == "div") {
      v3 = v3.div(scalar.value); 
      v4.set(v2);
      v4 = v4.div(scalar.value); 
    }

    // draw v3 and v4
    console.log("v3 = ", v3);
    drawVector(v3, "green");
    console.log("v4 = ", v4);
    drawVector(v4, "green");
    

  }



}
