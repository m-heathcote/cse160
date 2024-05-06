// Triangle.js - defines Triangle class and drawTriangle function 

// Triangle Class
class Triangle {
  constructor() {
    this.type='triangle';
    this.position = [0.0, 0.0, 0.0];
    this.color = [1.0, 1.0, 1.0, 1.0];
    this.size = 8.0;
  }

  render() {
    var xy = this.position;
    var rgba = this.color;
    var size = this.size;

    // Pass the color of a point to u_FragColor variable
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
    
    // Pass the size of a point to u_Size variable
    gl.uniform1f(u_Size, size);

    // Draw
    var d = this.size/200.0;  // delta
    drawTriangle([xy[0], xy[1], xy[0]+d, xy[1], xy[0], xy[1]+d], gl, a_Position);
  }
}

function drawTriangle(vertices) {
  var n = 3; // The number of vertices

  console.log("drawing a triangle");

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

function drawTriangle3D(vertices) {
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
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0); // pointer to buffer
  //                                 ^ 3 pieces of data per point (x, y, z)

  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(a_Position);

  gl.drawArrays(gl.TRIANGLES, 0, n);
}

function drawTriangle3DUV(vertices, uv) {
  var n = 3; // The number of vertices

  // --- Vertex Buffer ---

  // Create a buffer object
  var vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.log('Failed to create the (vertex) buffer object');
    return -1;
  }

  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  
  // Write data into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);

  // Assign the buffer object to a_Position variable
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0); // pointer to buffer
  //                                 ^ 3 pieces of data per point (x, y, z)

  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(a_Position);

  // --- UV Buffer ---

  // Create a buffer object
  var uvBuffer = gl.createBuffer();
  if (!uvBuffer) {
    console.log('Failed to create the (uv) buffer object');
    return -1;
  }

  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
  
  // Write data into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uv), gl.DYNAMIC_DRAW);

  // Assign the buffer object to a_Position variable
  gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, 0, 0); // pointer to buffer
  //                           ^ 2 pieces of data per point (u, v)

  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(a_UV);

  // Draw the triangle
  gl.drawArrays(gl.TRIANGLES, 0, n);
}
