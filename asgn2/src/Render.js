// Render.js


// ----- renderAllShapes -----
// Draw every shape that is supposed to be in the canvas
function renderAllShapes() {
  // Check time at start of function
  var startTime = performance.now();

  // Pass a matrix to u_GlobalRotateMatrix attribute
  var globalRotMat = new Matrix4().rotate(g_globalAngle, 0, 1, 0);
  globalRotMat.rotate(g_globalAngle_2, 1, 0, 0);
  gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotMat.elements);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  /*
  // Draw Red Cube
  var body = new Cube();
  body.color = [1, 0, 0, 1]; // red
  body.matrix.translate(-0.25, -0.75, -0.1);
  body.matrix.scale(0.5, 0.6, 0.5);
  body.render();

  // Draw Yellow Cube
  var leftArm = new Cube();
  leftArm.color = [1, 1, 0, 1]; // yellow
  leftArm.matrix.translate(-0.1, -0.2, 0);
  leftArm.matrix.rotate(g_yellowAngle, 0, 0, 1);
  var yellowCoordsMat = new Matrix4(leftArm.matrix);
  leftArm.matrix.scale(0.25, 0.6, 0.3);
  leftArm.render();

  // Draw Magenta Cube
  var box = new Cube();
  box.color = [1, 0, 1, 1]; // magenta
  box.matrix = yellowCoordsMat;
  box.matrix.translate(-0.2, 0.5, 0.1, 0);
  box.matrix.rotate(g_magentaAngle, 1, 0, 0);
  box.matrix.scale(0.4, 0.3, 0.3);
  box.render();
  
  // Draw Pyramid
  var funky = new Pyramid();
  funky.color = [0.3, 0.2, 0.9, 1];
  funky.matrix.translate(0, -0.4, 0);
  funky.matrix.rotate(180, 1, 0, 0);
  funky.matrix.scale(0.5, 0.3, 0.5);
  funky.render();
  */

  // Colors
  var shell1 = [61/255, 128/255, 126/255, 1];  // lightest
  var shell2 = [42/255, 114/255, 144/255, 1];  // mid
  var shell3 = [25/255, 98/255, 159/255, 1];   // darkest
  var body1 = [134/255, 167/255, 169/255, 1];
  var stripe1 = [82/255, 142/255, 167/255, 1];  // lighter
  var stripe2 = [68/255, 131/255, 157/255, 1];  // darker

  // -- Base --
  
  // Base of Shell
  var shell_base = new Cube();
  shell_base.color = shell2;
  shell_base.matrix.translate(-0.5, -0.4, -0.5);
  shell_base.matrix.rotate(-5, 1, 0, 0);
  var baseCoords = new Matrix4(shell_base.matrix);
  shell_base.matrix.scale(1, 0.1, 1);
  shell_base.render();

  // -- Top Shell --

  // Layer 1, Cube 1
  var l1c1 = new Cube();
  l1c1.color = shell3; 
  l1c1.matrix = new Matrix4(baseCoords);
  l1c1.matrix.translate(0.05, 0.05, 0.05);
  l1c1.matrix.scale(0.45, 0.2, 0.45);
  l1c1.render();

  // Layer 1, Cube 2
  var l1c2 = new Cube();
  l1c2.color = shell1;
  l1c2.matrix = new Matrix4(baseCoords);
  l1c2.matrix.translate(0.5, 0.05, 0.05);
  l1c2.matrix.scale(0.45, 0.2, 0.45);
  l1c2.render();

  // Layer 1, Cube 3
  var l1c3 = new Cube();
  l1c3.color = shell3;
  l1c3.matrix = new Matrix4(baseCoords);
  l1c3.matrix.translate(0.5, 0.05, 0.5);
  l1c3.matrix.scale(0.45, 0.2, 0.45);
  l1c3.render();

  // Layer 1, Cube 4
  var l1c4 = new Cube();
  l1c4.color = shell1;
  l1c4.matrix = new Matrix4(baseCoords);
  l1c4.matrix.translate(0.05, 0.05, 0.5);
  l1c4.matrix.scale(0.45, 0.2, 0.45);
  l1c4.render();

  // Layer 2, Cube 1
  var l2c1 = new Cube();
  l2c1.color = shell1;
  l2c1.matrix = new Matrix4(baseCoords);
  l2c1.matrix.translate(0.1, 0.2, 0.1);
  l2c1.matrix.scale(0.265, 0.2, 0.265);
  l2c1.render();

  // Layer 2, Cube 2
  var l2c2 = new Cube();
  l2c2.color = shell2; 
  l2c2.matrix = new Matrix4(baseCoords);
  l2c2.matrix.translate(0.365, 0.2, 0.1);
  l2c2.matrix.scale(0.27, 0.2, 0.265);
  l2c2.render();

  // Layer 2, Cube 3
  var l2c3 = new Cube();
  l2c3.color = shell3; 
  l2c3.matrix = new Matrix4(baseCoords);
  l2c3.matrix.translate(0.635, 0.2, 0.1);
  l2c3.matrix.scale(0.265, 0.2, 0.265);
  l2c3.render();

  // Layer 2, Cube 4
  var l2c4 = new Cube();
  l2c4.color = shell2;
  l2c4.matrix = new Matrix4(baseCoords);
  l2c4.matrix.translate(0.1, 0.2, 0.365);
  l2c4.matrix.scale(0.265, 0.2, 0.27);
  l2c4.render();

  // Layer 2, Cube 5
  var l2c5 = new Cube();
  l2c5.color = shell3;
  l2c5.matrix = new Matrix4(baseCoords);
  l2c5.matrix.translate(0.365, 0.2, 0.365);
  l2c5.matrix.scale(0.27, 0.2, 0.27);
  l2c5.render();

  // Layer 2, Cube 6
  var l2c6 = new Cube();
  l2c6.color = shell2;
  l2c6.matrix = new Matrix4(baseCoords);
  l2c6.matrix.translate(0.635, 0.2, 0.365);
  l2c6.matrix.scale(0.265, 0.2, 0.27);
  l2c6.render();

  // Layer 2, Cube 7
  var l2c7 = new Cube();
  l2c7.color = shell3;
  l2c7.matrix = new Matrix4(baseCoords);
  l2c7.matrix.translate(0.1, 0.2, 0.635);
  l2c7.matrix.scale(0.265, 0.2, 0.265);
  l2c7.render();

  // Layer 2, Cube 8
  var l2c8 = new Cube();
  l2c8.color = shell2;
  l2c8.matrix = new Matrix4(baseCoords);
  l2c8.matrix.translate(0.365, 0.2, 0.635);
  l2c8.matrix.scale(0.27, 0.2, 0.265);
  l2c8.render();

  // Layer 2, Cube 9
  var l2c9 = new Cube();
  l2c9.color = shell1;
  l2c9.matrix = new Matrix4(baseCoords);
  l2c9.matrix.translate(0.635, 0.2, 0.635);
  l2c9.matrix.scale(0.265, 0.2, 0.265);
  l2c9.render();

  // Layer 3, Cube 1
  var l3c1 = new Cube();
  l3c1.color = shell3;
  l3c1.matrix = new Matrix4(baseCoords);
  l3c1.matrix.translate(0.2, 0.35, 0.2);
  l3c1.matrix.scale(0.3, 0.15, 0.3);
  l3c1.render();

  // Layer 3, Cube 2
  var l3c2 = new Cube();
  l3c2.color = shell1;
  l3c2.matrix = new Matrix4(baseCoords);
  l3c2.matrix.translate(0.5, 0.35, 0.2);
  l3c2.matrix.scale(0.3, 0.15, 0.3);
  l3c2.render();

  // Layer 3, Cube 3
  var l3c3 = new Cube();
  l3c3.color = shell1;
  l3c3.matrix = new Matrix4(baseCoords);
  l3c3.matrix.translate(0.2, 0.35, 0.5);
  l3c3.matrix.scale(0.3, 0.15, 0.3);
  l3c3.render();

  // Layer 3, Cube 4
  var l3c4 = new Cube();
  l3c4.color = shell3;
  l3c4.matrix = new Matrix4(baseCoords);
  l3c4.matrix.translate(0.5, 0.35, 0.5);
  l3c4.matrix.scale(0.3, 0.15, 0.3);
  l3c4.render();

  // Layer 4, Cube 1
  var l4c1 = new Cube();
  l4c1.color = shell2;
  l4c1.matrix = new Matrix4(baseCoords);
  l4c1.matrix.translate(0.3, 0.4, 0.3);
  l4c1.matrix.scale(0.4, 0.15, 0.4);
  l4c1.render();

  // -- Bottom Shell --
  
  // Stripe 1
  var s1 = new Cube();
  s1.color = stripe1;
  s1.matrix = new Matrix4(baseCoords);
  s1.matrix.translate(0.05, -0.07, 0.05);
  s1.matrix.scale(0.1, 0.08, 0.9);
  s1.render();

  // Stripe 2
  var s2 = new Cube();
  s2.color = stripe2;
  s2.matrix = new Matrix4(baseCoords);
  s2.matrix.translate(0.15, -0.07, 0.05);
  s2.matrix.scale(0.1, 0.08, 0.9);
  s2.render();

  // Stripe 3
  var s3 = new Cube();
  s3.color = stripe1;
  s3.matrix = new Matrix4(baseCoords);
  s3.matrix.translate(0.25, -0.07, 0.05);
  s3.matrix.scale(0.1, 0.08, 0.9);
  s3.render();

  // Stripe 4
  var s4 = new Cube();
  s4.color = stripe2;
  s4.matrix = new Matrix4(baseCoords);
  s4.matrix.translate(0.35, -0.07, 0.05);
  s4.matrix.scale(0.1, 0.08, 0.9);
  s4.render();

  // Stripe 5
  var s5 = new Cube();
  s5.color = stripe1;
  s5.matrix = new Matrix4(baseCoords);
  s5.matrix.translate(0.45, -0.07, 0.05);
  s5.matrix.scale(0.1, 0.08, 0.9);
  s5.render();

  // Stripe 6
  var s6 = new Cube();
  s6.color = stripe2;
  s6.matrix = new Matrix4(baseCoords);
  s6.matrix.translate(0.55, -0.07, 0.05);
  s6.matrix.scale(0.1, 0.08, 0.9);
  s6.render();

  // Stripe 7
  var s7 = new Cube();
  s7.color = stripe1;
  s7.matrix = new Matrix4(baseCoords);
  s7.matrix.translate(0.65, -0.07, 0.05);
  s7.matrix.scale(0.1, 0.08, 0.9);
  s7.render();

  // Stripe 8
  var s8 = new Cube();
  s8.color = stripe2;
  s8.matrix = new Matrix4(baseCoords);
  s8.matrix.translate(0.75, -0.07, 0.05);
  s8.matrix.scale(0.1, 0.08, 0.9);
  s8.render();

  // Stripe 9
  var s9 = new Cube();
  s9.color = stripe1;
  s9.matrix = new Matrix4(baseCoords);
  s9.matrix.translate(0.85, -0.07, 0.05);
  s9.matrix.scale(0.1, 0.08, 0.9);
  s9.render();

  // -- Head --
  
  // Head
  var head = new Cube();
  head.color = body1;
  head.matrix = new Matrix4(baseCoords);
  head.matrix.translate(0.7, -0.05, 0.365);
  head.matrix.scale(0.5, 0.22, 0.27);
  head.render();

  // -- Legs --
  
  // Front Right Top Leg
  var frtl = new Pyramid();
  frtl.color = body1;
  frtl.matrix = new Matrix4(baseCoords);
  //frtl.matrix.translate(


  // Check time at end of function
  var duration = performance.now() - startTime;
  sendTextToHTML(" ms: " + Math.floor(duration) +
                 "&nbsp;&nbsp;  fps: " + Math.floor(10000/duration)/10, "numdot");
}
// ----- end renderAllShapes -----

