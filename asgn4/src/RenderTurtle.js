// RenderTurtle.js

function renderTurtle(scale, loc, rot) {
  // ---------- TURTLE ----------
  
  // Colors
  var shell1 = [61/255, 128/255, 126/255, 1];  // lightest
  var shell2 = [42/255, 114/255, 144/255, 1];  // mid
  var shell3 = [25/255, 98/255, 159/255, 1];   // darkest
  var body1 = [134/255, 167/255, 169/255, 1];
  var stripe1 = [82/255, 142/255, 167/255, 1];  // lighter
  var stripe2 = [68/255, 131/255, 157/255, 1];  // darker

  // -- Base --
  
  // Center of Rotation
  var center = new Cube();
  center.color = shell2;
  //center.matrix.translate(-0.18 + loc[0], -0.45 + g_baseY*0.7 + loc[1], -0.14 + loc[2]);
  center.matrix.translate(loc[0], -0.45 + g_baseY*0.7 + loc[1], loc[2]);
  center.matrix.rotate(rot, 0, 1, 0);
  center.matrix.rotate(g_swayAngle*0.05, 1, 0, 0);
  center.matrix.scale(scale, scale, scale);
  var centerCoords = new Matrix4(center.matrix);
  center.matrix.scale(0.05, 0.05, 0.05);
  center.render();

  // Base of Shell
  var shell_base = new Cube();
  shell_base.color = shell2;
  shell_base.matrix = new Matrix4(centerCoords);
  shell_base.matrix.translate(-0.5, 0, -0.47);
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
  l4c1.matrix.translate(0.3, 0.38, 0.3);
  var shellTopCoords = new Matrix4(l4c1.matrix);
  l4c1.matrix.scale(0.4, 0.15, 0.4);
  l4c1.render();

  // -- Bottom Shell --
 
  var s_height = 0.08;
  var s_down = -0.18;

  // Stripe 1
  var s1 = new Cube();
  s1.color = stripe1;
  s1.matrix = new Matrix4(baseCoords);
  s1.matrix.translate(0.05, s_down, 0.15);
  s1.matrix.scale(0.1, s_height, 0.7);
  s1.render();

  // Stripe 2
  var s2 = new Cube();
  s2.color = stripe2;
  s2.matrix = new Matrix4(baseCoords);
  s2.matrix.translate(0.15, s_down, 0.15);
  s2.matrix.scale(0.1, s_height, 0.7);
  s2.render();

  // Stripe 3
  var s3 = new Cube();
  s3.color = stripe1;
  s3.matrix = new Matrix4(baseCoords);
  s3.matrix.translate(0.25, s_down, 0.15);
  s3.matrix.scale(0.1, s_height, 0.7);
  s3.render();

  // Stripe 4
  var s4 = new Cube();
  s4.color = stripe2;
  s4.matrix = new Matrix4(baseCoords);
  s4.matrix.translate(0.35, s_down, 0.15);
  s4.matrix.scale(0.1, s_height, 0.7);
  s4.render();

  // Stripe 5
  var s5 = new Cube();
  s5.color = stripe1;
  s5.matrix = new Matrix4(baseCoords);
  s5.matrix.translate(0.45, s_down, 0.15);
  s5.matrix.scale(0.1, s_height, 0.7);
  s5.render();

  // Stripe 6
  var s6 = new Cube();
  s6.color = stripe2;
  s6.matrix = new Matrix4(baseCoords);
  s6.matrix.translate(0.55, s_down, 0.15);
  s6.matrix.scale(0.1, s_height, 0.7);
  s6.render();

  // Stripe 7
  var s7 = new Cube();
  s7.color = stripe1;
  s7.matrix = new Matrix4(baseCoords);
  s7.matrix.translate(0.65, s_down, 0.15);
  s7.matrix.scale(0.1, s_height, 0.7);
  s7.render();

  // Stripe 8
  var s8 = new Cube();
  s8.color = stripe2;
  s8.matrix = new Matrix4(baseCoords);
  s8.matrix.translate(0.75, s_down, 0.15);
  s8.matrix.scale(0.1, s_height, 0.7);
  s8.render();

  // Stripe 9
  var s9 = new Cube();
  s9.color = stripe1;
  s9.matrix = new Matrix4(baseCoords);
  s9.matrix.translate(0.85, s_down, 0.15);
  s9.matrix.scale(0.1, s_height, 0.7);
  s9.render();

  // -- Head --
  
  // Head
  var head = new Cube();
  head.color = body1;
  head.matrix = new Matrix4(baseCoords);
  head.matrix.translate(0.6 + g_headX, -0.15 + g_headY*0.4, 0.365);
  head.matrix.rotate(g_frAngle*0.06, 0, 0, 1);
  head.matrix.rotate(g_flAngle*0.05, 1, 0, 0);
  var headCoords = new Matrix4(head.matrix);
  head.matrix.scale(0.7, 0.22, 0.27);
  head.render();

  // Right Eye
  var r_eye = new Cube();
  r_eye.color = [35/255, 35/255, 35/255, 1];
  r_eye.matrix = new Matrix4(headCoords);
  r_eye.matrix.translate(0.58, 0.07, -0.05);
  r_eye.matrix.scale(0.09, 0.12, 0.07);
  r_eye.render();
  var r_eyeDot = new Cube();
  r_eyeDot.color = [235/255, 235/255, 235/255, 1];
  r_eyeDot.matrix = new Matrix4(headCoords);
  r_eyeDot.matrix.translate(0.6, 0.12, -0.06);
  r_eyeDot.matrix.scale(0.03, 0.05, 0.07);
  r_eyeDot.render();

  // Left Eye
  var l_eye = new Cube();
  l_eye.color = [35/255, 35/255, 35/255, 1];
  l_eye.matrix = new Matrix4(headCoords);
  l_eye.matrix.translate(0.58, 0.07, 0.25);
  l_eye.matrix.scale(0.09, 0.12, 0.07);
  l_eye.render();
  var l_eyeDot = new Cube();
  l_eyeDot.color = [235/255, 235/255, 235/255, 1];
  l_eyeDot.matrix = new Matrix4(headCoords);
  l_eyeDot.matrix.translate(0.6, 0.12, 0.26);
  l_eyeDot.matrix.scale(0.03, 0.05, 0.07);
  l_eyeDot.render();

  // -- Legs --
  
  // Front Right
  
  // Joint
  var fr_j = new Cube();
  fr_j.color = body1;
  fr_j.matrix = new Matrix4(baseCoords);
  fr_j.matrix.translate(0.75 + g_moveX, -0.05 + g_moveY, 0.07 + g_moveZ);
  fr_j.matrix.rotate(g_frAngle*0.4, 0, 0, 1);
  var fr_jCoords = new Matrix4(fr_j.matrix);
  fr_j.matrix.scale(0.02, 0.02, 0.15);
  fr_j.render();
  
  // Top
  var fr_t = new Pyramid();
  fr_t.color = body1;
  fr_t.matrix = new Matrix4(fr_jCoords);
  fr_t.matrix.translate(0, -0.25, -0.05);
  fr_t.matrix.rotate(15, 1, 0, 0);
  fr_t.matrix.scale(0.15, 0.5, 0.15);
  fr_t.render();

  // Bottom
  var fr_b = new Pyramid();
  fr_b.color = body1;
  fr_b.matrix = new Matrix4(fr_jCoords);
  fr_b.matrix.translate(0, -0.25, -0.05);
  fr_b.matrix.rotate(15, 1, 0, 0);
  fr_b.matrix.scale(0.15, -0.1, 0.15);
  fr_b.render();

  // Back Right
  
  // Joint
  var br_j = new Cube();
  br_j.color = body1;
  br_j.matrix = new Matrix4(baseCoords);
  br_j.matrix.translate(0.25 + g_moveX2, -0.05 + g_moveY2, 0.07 + g_moveZ);
  br_j.matrix.rotate(g_brAngle*0.4, 0, 0, 1);
  var br_jCoords = new Matrix4(br_j.matrix);
  br_j.matrix.scale(0.02, 0.02, 0.15);
  br_j.render();
  
  // Top
  var br_t = new Pyramid();
  br_t.color = body1;
  br_t.matrix = new Matrix4(br_jCoords);
  br_t.matrix.translate(0, -0.25, -0.05);
  br_t.matrix.rotate(15, 1, 0, 0);
  br_t.matrix.scale(0.15, 0.5, 0.15);
  br_t.render();

  // Bottom
  var br_b = new Pyramid();
  br_b.color = body1;
  br_b.matrix = new Matrix4(br_jCoords);
  br_b.matrix.translate(0, -0.25, -0.05);
  br_b.matrix.rotate(15, 1, 0, 0);
  br_b.matrix.scale(0.15, -0.1, 0.15);
  br_b.render();

  // Front Left
  
  // Joint
  var fl_j = new Cube();
  fl_j.color = body1;
  fl_j.matrix = new Matrix4(baseCoords);
  fl_j.matrix.translate(0.75 + g_moveX2, -0.05 + g_moveY2, 0.78 - g_moveZ);
  fl_j.matrix.rotate(g_brAngle*0.4, 0, 0, 1);
  var fl_jCoords = new Matrix4(fl_j.matrix);
  fl_j.matrix.scale(0.02, 0.02, 0.15);
  fl_j.render();
  
  // Top
  var fl_t = new Pyramid();
  fl_t.color = body1;
  fl_t.matrix = new Matrix4(fl_jCoords);
  fl_t.matrix.translate(0, -0.25, 0.2);
  fl_t.matrix.rotate(-15, 1, 0, 0);
  fl_t.matrix.scale(0.15, 0.5, 0.15);
  fl_t.render();

  // Bottom
  var fl_b = new Pyramid();
  fl_b.color = body1;
  fl_b.matrix = new Matrix4(fl_jCoords);
  fl_b.matrix.translate(0, -0.25, 0.2);
  fl_b.matrix.rotate(-15, 1, 0, 0);
  fl_b.matrix.scale(0.15, -0.1, 0.15);
  fl_b.render();

  // Back Left
  
  // Joint
  var bl_j = new Cube();
  bl_j.color = body1;
  bl_j.matrix = new Matrix4(baseCoords);
  bl_j.matrix.translate(0.25 + g_moveX, -0.05 + g_moveY, 0.78 - g_moveZ);
  bl_j.matrix.rotate(g_frAngle*0.4, 0, 0, 1);
  var bl_jCoords = new Matrix4(bl_j.matrix);
  bl_j.matrix.scale(0.02, 0.02, 0.15);
  bl_j.render();
  
  // Top
  var bl_t = new Pyramid();
  bl_t.color = body1;
  bl_t.matrix = new Matrix4(bl_jCoords);
  bl_t.matrix.translate(0, -0.25, 0.2);
  bl_t.matrix.rotate(-15, 1, 0, 0);
  bl_t.matrix.scale(0.15, 0.5, 0.15);
  bl_t.render();

  // Bottom
  var bl_b = new Pyramid();
  bl_b.color = body1;
  bl_b.matrix = new Matrix4(bl_jCoords);
  bl_b.matrix.translate(0, -0.25, 0.2);
  bl_b.matrix.rotate(-15, 1, 0, 0);
  bl_b.matrix.scale(0.15, -0.1, 0.15);
  bl_b.render();

  // -- Body --
  
  // In Shell
  var body = new Cube();
  body.color = body1;
  body.matrix = new Matrix4(baseCoords);
  body.matrix.translate(0.04, -0.1, 0.1);
  body.matrix.scale(0.92, 0.15, 0.8);
  body.render();

  // Tail
  var tail = new Pyramid();
  tail.color = body1;
  tail.matrix = new Matrix4(baseCoords);
  tail.matrix.translate(0.05, -0.04, 0.5);
  tail.matrix.rotate(110 + g_frAngle*0.2, 0, 0, 1);
  tail.matrix.scale(0.05, 0.2, 0.15);
  tail.render();

  return shellTopCoords;  // for duck placement
}