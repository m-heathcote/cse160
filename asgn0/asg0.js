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

  // Change line width (so vectors aren't as hard to see)
  ctx.lineWidth = 2;

  // Function to draw vector
  function drawVector(v, color) {
    let centerX = canvas.width/2;
    let centerY = canvas.height/2;
    ctx.strokeStyle = color;
    
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
  
  button1.onclick = function() {
    handleDrawEvent();
  }

  function handleDrawEvent(v1, v2) {
    var v1x_val = v1x.value;
    var v1y_val = v1y.value;
    var v2x_val = v2x.value;
    var v2y_val = v2y.value;
    
    // draw v1 and v2
    clearCanvas();
    var v1 = new Vector3([v1x_val, v1y_val, 0]);
    drawVector(v1, "red");
    var v2 = new Vector3([v2x_val, v2y_val, 0]);
    drawVector(v2, "blue");
  }

  // Handle user clicking "Draw" (button 2)
  let button2 = document.getElementById("button2");
  
  button2.onclick = function() {
    handleDrawOperationEvent();
  }

  function areaTriangle(v1, v2) {
    var cross = Vector3.cross(v1, v2);
    return cross.magnitude() / 2;
  }

  function handleDrawOperationEvent(v1, v2) {
    var v1x_val = v1x.value;
    var v1y_val = v1y.value;
    var v2x_val = v2x.value;
    var v2y_val = v2y.value;
    
    // draw v1 and v2
    clearCanvas();
    var v1 = new Vector3([v1x_val, v1y_val, 0]);
    drawVector(v1, "red");
    var v2 = new Vector3([v2x_val, v2y_val, 0]);
    drawVector(v2, "blue");

    // calculate v3 and v4
    var v3 = new Vector3([0, 0, 0]);
    var v4 = new Vector3([0, 0, 0]);

    if (op.value == "add") {
      v3.set(v1);
      v3 = v3.add(v2); 
    }
    else if (op.value == "sub") {
      v3.set(v1);
      v3 = v3.sub(v2); 
    }
    else if (op.value == "mul") {
      v3.set(v1);
      v3 = v3.mul(scalar.value); 
      v4.set(v2);
      v4 = v4.mul(scalar.value); 
    }
    else if (op.value == "div") {
      v3.set(v1);
      v3 = v3.div(scalar.value); 
      v4.set(v2);
      v4 = v4.div(scalar.value); 
    }
    else if (op.value == "mag") {
      console.log("Magnitude v1: ", v1.magnitude());
      console.log("Magnitude v2: ", v2.magnitude());
    }
    else if (op.value == "nor") {
      v3.set(v1);
      v3 = v3.normalize();
      v4.set(v2);
      v4 = v4.normalize();
    }
    else if (op.value == "ang") {
      let d = Vector3.dot(v1, v2);
      let m1 = v1.magnitude();
      let m2 = v2.magnitude();
      let radians = Math.acos(d / (m1 * m2));
      let degrees = radians * (180 / Math.PI);
      console.log("Angle: ", degrees);
    }
    else if (op.value == "tri") {
      console.log("Area of the Triangle: ", areaTriangle(v1, v2));
    }

    // draw v3 and v4
    drawVector(v3, "green");
    drawVector(v4, "green"); 

  }

}
