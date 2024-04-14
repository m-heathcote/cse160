// MyDrawing.js - code to draw my triangle art

// Drawing Class
class Drawing {
  constructor() {
    this.type='drawing';
    this.position = [0.0, 0.0, 0.0];
    this.color = [1.0, 1.0, 1.0, 1.0];
    this.size = 10.0;
  }

  render() {
    // Define Colors
    let colors = [];
    colors.push([245/255, 210/255, 150/255, 1.0]);
    colors.push([135/255, 145/255, 200/255, 1.0]);
    colors.push([150/255, 160/255, 215/255, 1.0]);
    colors.push([120/255, 125/255, 190/255, 1.0]);
    colors.push([100/255, 100/255, 135/255, 1.0]);

    // Draw
    this.drawHalf(-1, colors);  // left
    this.drawHalf( 1, colors);  // right
  }

  drawHalf(x, C) {
    // ** set color **
    gl.uniform4f(u_FragColor, C[0][0], C[0][1], C[0][2], C[0][3]);

    // antennae
    drawTriangle([x*0.0, 0.6,   x*0.4, 0.6,   x*0.2, 0.7], gl, a_Position);
    
    // head
    drawTriangle([x*0.0, 0.6,   x*0.0, 0.4,   x*0.2, 0.4], gl, a_Position);
    drawTriangle([x*0.0, 0.4,   x*0.2, 0.4,   x*0.2, 0.2], gl, a_Position);
    drawTriangle([x*0.0, 0.4,   x*0.0, 0.2,   x*0.2, 0.2], gl, a_Position);

    // tail
    drawTriangle([x*0.0, 0.2,   x*0.0, -0.6,   x*0.2, 0.2], gl, a_Position);

    // ** set color **
    gl.uniform4f(u_FragColor, C[1][0], C[1][1], C[1][2], C[1][3]);

    // top wing
    drawTriangle([x*0.2, 0.4,   x*0.2, 0.2,   x*0.5, 0.3], gl, a_Position);
    drawTriangle([x*0.2, 0.2,   x*0.5, 0.3,   x*0.8, 0.2], gl, a_Position);
    
    drawTriangle([x*0.2, 0.2,   x*0.6, 0.2,   x*0.6, -0.2], gl, a_Position);
    
    drawTriangle([x*0.6, 0.2,   x*0.8, 0.2,   x*0.8, 0.0], gl, a_Position);
    drawTriangle([x*0.6, 0.2,   x*0.6, -0.2,   x*0.8, 0.0], gl, a_Position);

    // ** set color **
    gl.uniform4f(u_FragColor, C[2][0], C[2][1], C[2][2], C[2][3]);

    // bottom wing
    drawTriangle([x*0.2, 0.2,   x*0.2, -0.4,   x*0.1, -0.2], gl, a_Position);
    drawTriangle([x*0.2, 0.2,   x*0.2, -0.4,   x*0.4, 0.0], gl, a_Position);
    
    drawTriangle([x*0.4, 0.0,   x*0.4, -0.4,   x*0.2, -0.4], gl, a_Position);
    drawTriangle([x*0.4, 0.0,   x*0.4, -0.4,   x*0.6, -0.2], gl, a_Position);

    // ** set color **
    gl.uniform4f(u_FragColor, C[3][0], C[3][1], C[3][2], C[3][3]);
    
    // outer wing (top)
    drawTriangle([x*0.8, 0.2,   x*0.8, -0.2,   x*0.9, 0.0], gl, a_Position);
    
    drawTriangle([x*0.8, 0.0,   x*0.8, -0.2,   x*0.6, -0.2], gl, a_Position);
    drawTriangle([x*0.6, -0.2,   x*0.6, -0.3,   x*0.8, -0.2], gl, a_Position);

    // outer wing (bottom)
    drawTriangle([x*0.6, -0.2,   x*0.6, -0.4,   x*0.4, -0.4], gl, a_Position);
    
    drawTriangle([x*0.2, -0.4,   x*0.6, -0.4,   x*0.4, -0.5], gl, a_Position);
    
    // ** set color **
    gl.uniform4f(u_FragColor, C[4][0], C[4][1], C[4][2], C[4][3]);
    
    // wing dot
    drawTriangle([x*0.6, 0.2,   x*0.45, 0.05,   x*0.6, 0.0], gl, a_Position);
    drawTriangle([x*0.6, 0.2,   x*0.45, 0.05,   x*0.4, 0.2], gl, a_Position);
  }
}
