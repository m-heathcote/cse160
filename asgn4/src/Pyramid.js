// Pyramid.js - defines Pyramid class

// Pyramid Class
class Pyramid {
  constructor() {
    this.type='pyramid';
    this.color = [1.0, 1.0, 1.0, 1.0];
    this.textureNum = -2;
    this.useFakeLighting = false;
    this.shiny = 0.5;
    this.segments = 6;
    this.matrix = new Matrix4();
    this.normalMatrix = new Matrix4();
  }
  
  render() {
    var rgba = this.color;
    var segments = this.segments;

    // Pass the matrix to u_ModelMatrix attribute
    gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

    // Update normalMatrix
    this.normalMatrix.setInverseOf(this.matrix).transpose();

    // Pass the normalMatrix to u_NormalMatrix attribute
    gl.uniformMatrix4fv(u_NormalMatrix, false, this.normalMatrix.elements);

    // Pass the texture number to u_WhichTexture
    // (1i = 1 integer)
    if (g_normalsOn) {
      gl.uniform1i(u_WhichTexture, -3);
    }
    else {
      gl.uniform1i(u_WhichTexture, this.textureNum);
    }

    // Pass shiny-ness to u_HowShiny
    gl.uniform1f(u_HowShiny, this.shiny);

    // Light Level
    var light = 1;
    
    // Draw
    var d = 1;
    let angleStep = 360 / this.segments;
    let count = 0;
    for (var angle = 0; angle < 360; angle = angle + angleStep) {
      let xy = [0, 0, 0];
      let angle1 = angle;
      let angle2 = angle + angleStep;
      let vec1 = [Math.cos(angle1 * Math.PI/180)*d, 0, Math.sin(angle1 * Math.PI/180)*d];
      let vec2 = [Math.cos(angle2 * Math.PI/180)*d, 0, Math.sin(angle2 * Math.PI/180)*d];
      let pt1 = [xy[0] + vec1[0], xy[1] + vec1[1], xy[2] + vec1[2]];
      let pt2 = [xy[0] + vec2[0], xy[1] + vec2[1], xy[2] + vec2[2]];

      // Pass the color of a point to u_FragColor variable
      light = this.useFakeLighting ? 0.6 : 1;
      gl.uniform4f(u_FragColor, rgba[0]*light, rgba[1]*light, rgba[2]*light, rgba[3]);
    
      // Part of Base
      drawTriangle3DUVNormal(
        [xy[0],xy[1],xy[2],  pt1[0],pt1[1],pt1[2],  pt2[0],pt2[1],pt2[2]],
        [0,0, 0,0, 0,0],
        [xy[0],xy[1],xy[2],  pt1[0],pt1[1],pt1[2],  pt2[0],pt2[1],pt2[2]]
      );

      // Set Light
      if(this.useFakeLighting) {
        if (count == 4) { light = 1; }
        else if (count == 3 || count == 5) { light = 0.9; }
        else if (count == 0 || count == 2) { light = 0.8; }
        else if (count == 1) { light = 0.7; }
      }

      // Pass the color of a point to u_FragColor variable
      gl.uniform4f(u_FragColor, rgba[0]*light, rgba[1]*light, rgba[2]*light, rgba[3]);

      // Part of Point
      drawTriangle3DUVNormal(
        [xy[0],1,xy[2],  pt1[0],pt1[1],pt1[2],  pt2[0],pt2[1],pt2[2]],
        [0,0, 0,0, 0,0],
        [xy[0],1,xy[2],  pt1[0],pt1[1],pt1[2],  pt2[0],pt2[1],pt2[2]]
      );

      // Increment loop count
      count += 1;
    }
  }
}
