// Cube.js - defines Cube class

// Cube Class
class Cube {
  constructor() {
    this.type='cube';
    this.color = [1.0, 1.0, 1.0, 1.0];
    this.matrix = new Matrix4();
  }

  render() {
    var rgba = this.color;

    // Pass the matrix to u_ModelMatrix attribute
    gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

    // lightest
    // Pass the color of a point to u_FragColor variable
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
   
    // Front
    drawTriangle3D([0, 0, 0,  1, 1, 0,  1, 0, 0]);
    drawTriangle3D([0, 0, 0,  0, 1, 0,  1, 1, 0]);

    // darkest
    // Pass the color of a point to u_FragColor variable
    gl.uniform4f(u_FragColor, rgba[0]*0.7, rgba[1]*0.7, rgba[2]*0.7, rgba[3]);
   
    // Back
    drawTriangle3D([0, 0, 1,  1, 1, 1,  1, 0, 1]);
    drawTriangle3D([0, 0, 1,  0, 1, 1,  1, 1, 1]);

    // lighter
    // Pass the color of a point to u_FragColor variable
    gl.uniform4f(u_FragColor, rgba[0]*0.9, rgba[1]*0.9, rgba[2]*0.9, rgba[3]);
   
    // Right
    drawTriangle3D([1, 1, 0,  1, 0, 1,  1, 0, 0]);
    drawTriangle3D([1, 1, 0,  1, 0, 1,  1, 1, 1]);

    // Left
    drawTriangle3D([0, 1, 0,  0, 0, 1,  0, 0, 0]);
    drawTriangle3D([0, 1, 0,  0, 0, 1,  0, 1, 1]);

    // darker
    // Pass the color of a point to u_FragColor variable
    gl.uniform4f(u_FragColor, rgba[0]*0.8, rgba[1]*0.8, rgba[2]*0.8, rgba[3]);
   
    // Top
    drawTriangle3D([1, 1, 0,  0, 1, 1,  1, 1, 1]);
    drawTriangle3D([1, 1, 0,  0, 1, 1,  0, 1, 0]);
    
    // Bottom
    drawTriangle3D([1, 0, 0,  0, 0, 1,  1, 0, 1]);
    drawTriangle3D([1, 0, 0,  0, 0, 1,  0, 0, 0]);
  } 
}
