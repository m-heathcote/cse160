// RenderDuck.js

function renderDuck(scale, shellTopCoords) {
  // ---------- DUCK ----------

  // Colors
  var legs = [199/255, 138/255, 13/255, 1];
  var feathers1 = [245/255, 230/255, 143/255, 1];
  var feathers2 = [235/255, 220/255, 133/255, 1];

  // -- Feet --

  shellTopCoords.scale(scale, scale, scale);
  
  // Right Foot
  var rFoot = new Cube();
  rFoot.color = legs;
  rFoot.matrix = new Matrix4(shellTopCoords);
  rFoot.matrix.translate(0.15, 0.12, 0.08);
  var rFootCoords = new Matrix4(rFoot.matrix);
  rFoot.matrix.scale(0.15, 0.05, 0.1);
  rFoot.render();

  // Left Foot
  var lFoot = new Cube();
  lFoot.color = legs;
  lFoot.matrix = new Matrix4(rFootCoords);
  lFoot.matrix.translate(0, 0, 0.14);
  var lFootCoords = new Matrix4(lFoot.matrix);
  lFoot.matrix.scale(0.15, 0.05, 0.1);
  lFoot.render();

  // Right Leg
  var rLeg = new Cube();
  rLeg.color = legs;
  rLeg.matrix = new Matrix4(rFootCoords);
  rLeg.matrix.translate(0.03, 0, 0.03);
  rLeg.matrix.scale(0.04, 0.25, 0.04);
  rLeg.render();

  // Left Leg
  var lLeg = new Cube();
  lLeg.color = legs;
  lLeg.matrix = new Matrix4(lFootCoords);
  lLeg.matrix.translate(0.03, 0, 0.03);
  lLeg.matrix.scale(0.04, 0.25, 0.04);
  lLeg.render();

  // Body Joint
  var bJoint = new Cube();
  bJoint.color = legs;
  bJoint.matrix = new Matrix4(rFootCoords);
  bJoint.matrix.translate(0.03, 0.25 + g_baseY*0.4, 0);
  bJoint.matrix.rotate(g_j1Angle, 0, 0, 1);
  bJoint.matrix.rotate(-g_swayAngle*0.05, 0, 0, 1);
  var bJointCoords = new Matrix4(bJoint.matrix);
  bJoint.matrix.scale(0.04, 0.04, 0.24);
  bJoint.render();

  // -- Body --

  // Chest
  var chest = new Cube();
  chest.color = feathers1;
  chest.matrix = new Matrix4(bJointCoords);
  chest.matrix.translate(-0.09, -0.05, -0.01);
  var chestCoords = new Matrix4(chest.matrix);
  chest.matrix.scale(0.26, 0.15, 0.26);
  chest.render();

  // Right Wing
  var rWing = new Cube();
  rWing.color = feathers2;
  rWing.matrix = new Matrix4(chestCoords);
  rWing.matrix.translate(0.03, 0.03, -0.03);
  rWing.matrix.scale(0.2, 0.12, 0.05);
  rWing.render();

  // Left Wing
  var lWing = new Cube();
  lWing.color = feathers2;
  lWing.matrix = new Matrix4(chestCoords);
  lWing.matrix.translate(0.03, 0.03, 0.26);
  lWing.matrix.scale(0.2, 0.12, 0.05);
  lWing.render();

  // Tail
  var tail = new Cube();
  tail.color = feathers2;
  tail.matrix = new Matrix4(chestCoords);
  tail.matrix.translate(-0.05, 0.06, 0.09);
  tail.matrix.rotate(-30, 0, 0, 1);
  tail.matrix.scale(0.1, 0.1, 0.1);
  tail.render();

  // -- Head --

  // Neck
  var neck = new Cube();
  neck.color = feathers1;
  neck.matrix = new Matrix4(chestCoords);
  neck.matrix.translate(0.17, 0.1, 0.1);
  neck.matrix.rotate(g_j2Angle, 0, 0, 1);
  var neckCoords = new Matrix4(neck.matrix);
  neck.matrix.scale(0.08, 0.15, 0.08);
  neck.render();

  // Head
  var head = new Cube();
  head.color = feathers1;
  head.matrix = new Matrix4(neckCoords);
  head.matrix.translate(-0.02, 0.1, -0.04);
  head.matrix.rotate(g_j3Angle, 0, 0, 1);
  var headCoords2 = new Matrix4(head.matrix);
  head.matrix.scale(0.16, 0.14, 0.16);
  head.render();

  // Beak
  var beak = new Cube();
  beak.color = legs;
  beak.matrix = new Matrix4(headCoords2);
  beak.matrix.translate(0.1, 0.02, 0.01);
  beak.matrix.scale(0.2, 0.05, 0.14);
  beak.render();

  // Right Eye
  var r_eye2 = new Cube();
  r_eye2.color = [35/255, 35/255, 35/255, 1];
  r_eye2.matrix = new Matrix4(headCoords2);
  r_eye2.matrix.translate(0.06, 0.04, -0.03);
  r_eye2.matrix.scale(0.05, 0.085, 0.05);
  r_eye2.render();
  var r_eyeDot2 = new Cube();
  r_eyeDot2.color = [235/255, 235/255, 235/255, 1];
  r_eyeDot2.matrix = new Matrix4(headCoords2);
  r_eyeDot2.matrix.translate(0.065, 0.07, -0.035);
  r_eyeDot2.matrix.scale(0.03, 0.045, 0.05);
  r_eyeDot2.render();
  var r_eyelid = new Cube();
  r_eyelid.color = feathers2;
  r_eyelid.matrix = new Matrix4(headCoords2);
  r_eyelid.matrix.translate(0.05, 0.05, -0.04 + g_eyeLidZ);
  r_eyelid.matrix.scale(0.07, 0.085, 0.06);
  r_eyelid.render();

  // Left Eye
  var l_eye2 = new Cube();
  l_eye2.color = [35/255, 35/255, 35/255, 1];
  l_eye2.matrix = new Matrix4(headCoords2);
  l_eye2.matrix.translate(0.06, 0.04, 0.14);
  l_eye2.matrix.scale(0.05, 0.085, 0.05);
  l_eye2.render();
  var l_eyeDot2 = new Cube();
  l_eyeDot2.color = [235/255, 235/255, 235/255, 1];
  l_eyeDot2.matrix = new Matrix4(headCoords2);
  l_eyeDot2.matrix.translate(0.065, 0.07, 0.145);
  l_eyeDot2.matrix.scale(0.03, 0.045, 0.05);
  l_eyeDot2.render();
  var l_eyelid = new Cube();
  l_eyelid.color = feathers2;
  l_eyelid.matrix = new Matrix4(headCoords2);
  l_eyelid.matrix.translate(0.05, 0.05, 0.15 - g_eyeLidZ);
  l_eyelid.matrix.scale(0.07, 0.085, 0.06);
  l_eyelid.render();
}