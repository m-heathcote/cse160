// Point.js - defines point class

// Point Class
class Point {
  constructor() {
    this.type='point';
    this.position = [0.0, 0.0, 0.0];
    this.color = [1.0, 1.0, 1.0, 1.0];
    this.size = 5.0;
  }

  render() {
    var xy = this.position;
    var rgba = this.color;
    var size = this.size;

    console.log("in render(): size=", size, " color=", rgba);

    // Quit using the buffer to send the attribute
    gl.disableVertexAttribArray(a_Position);

    // Pass the position of a point to a_Position variable
    gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);
    
    // Pass the color of a point to u_FragColor variable
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
    
    // Pass the size of a point to u_Size variable
    gl.uniform1f(u_Size, size);

    // Draw
    gl.drawArrays(gl.POINTS, 0, 1);
  }

  renderDisplay() {
    var xy = this.position;
    var rgba = this.color;
    var size = this.size;

    // Quit using the buffer to send the attribute
    gl2.disableVertexAttribArray(a_Position2);

    // Pass the position of a point to a_Position variable
    gl2.vertexAttrib3f(a_Position2, xy[0], xy[1], 0.0);
    
    // Pass the color of a point to u_FragColor variable
    gl2.uniform4f(u_FragColor2, rgba[0], rgba[1], rgba[2], rgba[3]);
    
    // Pass the size of a point to u_Size variable
    gl2.uniform1f(u_Size2, size);

    // Draw
    gl2.drawArrays(gl2.POINTS, 0, 1);
  }
}

