// Cube.js - defines Cube class

// Cube Class
class Cube {
  constructor() {
    this.type='cube';
    this.color = [1.0, 1.0, 1.0, 1.0];
    this.matrix = new Matrix4();
    this.textureNum = -2;
  }

  render() {
    var rgba = this.color;

    // Pass the matrix to u_ModelMatrix attribute
    gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

    // Pass the texture number to u_WhichTexture
    // (1i = 1 integer)
    gl.uniform1i(u_WhichTexture, this.textureNum);

    // lightest
    // Pass the color of a point to u_FragColor variable
    let light = 0.9;
    gl.uniform4f(u_FragColor, rgba[0]*light, rgba[1]*light, rgba[2]*light, rgba[3]);
   
    // Front
    drawTriangle3DUV([0,0,0,  1,1,0,  1,0,0], [0,0,  1,1,  1,0]);
    drawTriangle3DUV([0,0,0,  0,1,0,  1,1,0], [0,0,  0,1,  1,1]);

    // darkest
    // Pass the color of a point to u_FragColor variable
    light = 0.7;
    gl.uniform4f(u_FragColor, rgba[0]*light, rgba[1]*light, rgba[2]*light, rgba[3]);
   
    // Back
    drawTriangle3DUV([0,0,1,  1,1,1,  1,0,1], [1,0,  0,1,  0,0]);
    drawTriangle3DUV([0,0,1,  0,1,1,  1,1,1], [1,0,  1,1,  0,1]);

    // lighter
    // Pass the color of a point to u_FragColor variable
    light = 0.8;
    gl.uniform4f(u_FragColor, rgba[0]*light, rgba[1]*light, rgba[2]*light, rgba[3]);
   
    // Right
    drawTriangle3DUV([1,1,0,  1,0,1,  1,0,0], [0,1,  1,0,  0,0]);
    drawTriangle3DUV([1,1,0,  1,0,1,  1,1,1], [0,1,  1,0,  1,1]);

    // Left
    drawTriangle3DUV([0,1,0,  0,0,1,  0,0,0], [1,1,  0,0,  1,0]);
    drawTriangle3DUV([0,1,0,  0,0,1,  0,1,1], [1,1,  0,0,  0,1]);

    // darker
    // Pass the color of a point to u_FragColor variable
    light = 1;
    gl.uniform4f(u_FragColor, rgba[0]*light, rgba[1]*light, rgba[2]*light, rgba[3]);
   
    // Top
    drawTriangle3DUV([1,1,0,  0,1,1,  1,1,1], [1,0,  0,1,  1,1]);
    drawTriangle3DUV([1,1,0,  0,1,1,  0,1,0], [1,0,  0,1,  0,0]);
    
    // darker
    // Pass the color of a point to u_FragColor variable
    light = 0.6;
    gl.uniform4f(u_FragColor, rgba[0]*light, rgba[1]*light, rgba[2]*light, rgba[3]);
   
    // Bottom
    drawTriangle3DUV([1,0,0,  0,0,1,  1,0,1], [1,1,  0,0,  1,0]);
    drawTriangle3DUV([1,0,0,  0,0,1,  0,0,0], [1,1,  0,0,  0,1]);
  }
}
