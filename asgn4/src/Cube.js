// Cube.js - defines Cube class

// Cube Class
class Cube {
  constructor() {
    this.type='cube';
    this.color = [1.0, 1.0, 1.0, 1.0];
    this.textureNum = -2;
    this.matrix = new Matrix4();
  }

  render() {
    var rgba = this.color;

    // Pass the matrix to u_ModelMatrix attribute
    gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

    // Pass the texture number to u_WhichTexture
    // (1i = 1 integer)
    if (g_normalsOn) {
      gl.uniform1i(u_WhichTexture, -3);
    }
    else {
      gl.uniform1i(u_WhichTexture, this.textureNum);
    }

    // lightest
    // Pass the color of a point to u_FragColor variable
    let light = 0.9;
    gl.uniform4f(u_FragColor, rgba[0]*light, rgba[1]*light, rgba[2]*light, rgba[3]);
   
    // Front
    drawTriangle3DUVNormal(
      [0,0,0,  1,1,0,  1,0,0],
      [0,0,  1,1,  1,0],
      [0,0,-1, 0,0,-1, 0,0,-1]);
    drawTriangle3DUVNormal(
      [0,0,0,  0,1,0,  1,1,0],
      [0,0,  0,1,  1,1],
      [0,0,-1, 0,0,-1, 0,0,-1]);

    // darkest
    // Pass the color of a point to u_FragColor variable
    light = 0.7;
    gl.uniform4f(u_FragColor, rgba[0]*light, rgba[1]*light, rgba[2]*light, rgba[3]);
   
    // Back
    drawTriangle3DUVNormal(
      [0,0,1,  1,1,1,  1,0,1],
      [1,0,  0,1,  0,0],
      [0,0,1, 0,0,1, 0,0,1]);
    drawTriangle3DUVNormal(
      [0,0,1,  0,1,1,  1,1,1],
      [1,0,  1,1,  0,1],
      [0,0,1, 0,0,1, 0,0,1]);

    // lighter
    // Pass the color of a point to u_FragColor variable
    light = 0.8;
    gl.uniform4f(u_FragColor, rgba[0]*light, rgba[1]*light, rgba[2]*light, rgba[3]);
   
    // Right
    drawTriangle3DUVNormal(
      [1,1,0,  1,0,1,  1,0,0],
      [0,1,  1,0,  0,0],
      [1,0,0, 1,0,0, 1,0,0]);
    drawTriangle3DUVNormal(
      [1,1,0,  1,0,1,  1,1,1],
      [0,1,  1,0,  1,1],
      [1,0,0, 1,0,0, 1,0,0]);

    // Left
    drawTriangle3DUVNormal(
      [0,1,0,  0,0,1,  0,0,0],
      [1,1,  0,0,  1,0],
      [-1,0,0, -1,0,0, -1,0,0]);
    drawTriangle3DUVNormal(
      [0,1,0,  0,0,1,  0,1,1],
      [1,1,  0,0,  0,1],
      [-1,0,0, -1,0,0, -1,0,0]);

    // darker
    // Pass the color of a point to u_FragColor variable
    light = 1;
    gl.uniform4f(u_FragColor, rgba[0]*light, rgba[1]*light, rgba[2]*light, rgba[3]);
   
    // Top
    drawTriangle3DUVNormal(
      [1,1,0,  0,1,1,  1,1,1],
      [1,0,  0,1,  1,1],
      [0,1,0, 0,1,0, 0,1,0]);
    drawTriangle3DUVNormal(
      [1,1,0,  0,1,1,  0,1,0],
      [1,0,  0,1,  0,0],
      [0,1,0, 0,1,0, 0,1,0]);
    
    // darker
    // Pass the color of a point to u_FragColor variable
    light = 0.6;
    gl.uniform4f(u_FragColor, rgba[0]*light, rgba[1]*light, rgba[2]*light, rgba[3]);
   
    // Bottom
    drawTriangle3DUVNormal(
      [1,0,0,  0,0,1,  1,0,1],
      [1,1,  0,0,  1,0],
      [0,-1,0, 0,-1,0, 0,-1,0]);
    drawTriangle3DUVNormal(
      [1,0,0,  0,0,1,  0,0,0],
      [1,1,  0,0,  0,1],
      [0,-1,0, 0,-1,0, 0,-1,0]);
  }
}
