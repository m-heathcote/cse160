// Heart.js - defines Heart class

// Heart Class
class Heart {
  constructor() {
    this.type='heart';
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
    
    // Draw
    var d = this.size/400.0;  // delta
  
    this.drawHalf(-1, d, [xy[0], xy[1]+d/2], gl, a_Position);  // left
    this.drawHalf( 1, d, [xy[0], xy[1]+d/2], gl, a_Position);  // right
  }

  drawHalf(x, d, mid, gl, a_pos) {
    drawTriangle([mid[0], mid[1],   mid[0]+(x*2*d), mid[1],
                  mid[0]+(x*1*d), mid[1]+(1*d)],   gl, a_pos);
    drawTriangle([mid[0], mid[1],   mid[0]+(x*2*d), mid[1],
                  mid[0], mid[1]-(2*d)],   gl, a_pos);
  }
  
  renderDisplay() {
    var xy = this.position;
    var rgba = this.color;
    var size = this.size;
    var segments = this.segments;

    // Pass the color of a point to u_FragColor variable
    gl2.uniform4f(u_FragColor2, rgba[0], rgba[1], rgba[2], rgba[3]);
    
    // Draw
    var d = this.size/100.0;  // delta
  
    this.drawHalf(-1, d, [xy[0], xy[1]+d/2], gl2, a_Position2);  // left
    this.drawHalf( 1, d, [xy[0], xy[1]+d/2], gl2, a_Position2);  // right
  }
}
