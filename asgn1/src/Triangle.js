// Triangle.js - defines Triangle class and drawTriangle function 

// Triangle Class
class Triangle {
  constructor() {
    this.type='triangle';
    this.position = [0.0, 0.0, 0.0];
    this.color = [1.0, 1.0, 1.0, 1.0];
    this.size = 5.0;
  }

  render() {
    var xy = this.position;
    var rgba = this.color;
    var size = this.size;

    // Pass the color of a point to u_FragColor variable
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
    
    // Pass the size of a point to u_Size variable
    gl.uniform1f(u_Size, size);

    console.log("triangle: render(): size = ", size);

    // Draw
    var d = this.size/200.0;  // delta
    console.log("tri: re: d = ", d);
    drawTriangle([xy[0], xy[1], xy[0]+d, xy[1], xy[0], xy[1]+d], gl, a_Position);
  }
  
  renderDisplay() {
    var xy = this.position;
    var rgba = this.color;
    var size = this.size;

    // Pass the color of a point to u_FragColor variable
    gl2.uniform4f(u_FragColor2, rgba[0], rgba[1], rgba[2], rgba[3]);
    
    // Pass the size of a point to u_Size variable
    gl2.uniform1f(u_Size2, size);

    console.log("triangle: renderDisplay(): size = ", size);

    // Draw
    var d = this.size/50.0;  // delta
    console.log("tri: redDis: d = ", d);
    drawTriangle([xy[0], xy[1], xy[0]+d, xy[1], xy[0], xy[1]+d], gl2, a_Position2);
  }
}

function drawTriangle(vertices, gl, a_Position) {
  var n = 3; // The number of vertices

  // Create a buffer object
  var vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }

  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  
  // Write date into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);

  // Assign the buffer object to a_Position variable
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0); // pointer to buffer
  //                                 ^ 2 pieces of data per point (x, y)

  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(a_Position);

  gl.drawArrays(gl.TRIANGLES, 0, n);
}
