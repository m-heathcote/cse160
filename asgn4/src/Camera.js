// Camera.js - defines camera class

// -- Global Camera --
var camera;

// ----- Camera Class -----
class Camera {
  constructor() {
    this.type = 'camera';
    this.fov = 60;
    this.eye = new Vector3([0, 0.5, 3.4]);
    this.at = new Vector3([0, -2, -20]);
    this.up = new Vector3([0, 1, 0]);
    this.speed = 0.1;
    this.alpha = 1.1;

    this.viewMat = new Matrix4();
    this.viewMat.setLookAt(this.eye.elements[0],this.eye.elements[1],this.eye.elements[2],
                           this.at.elements[0], this.at.elements[1], this.at.elements[2],
                           this.up.elements[0], this.up.elements[1], this.up.elements[2]);
    this.projMat = new Matrix4();
    this.projMat.setPerspective(this.fov, canvas.width/canvas.height, 0.1, 100);
  }

  setGroundView() {
    this.eye = new Vector3([0, 0.5, 3.4]);
    this.at = new Vector3([0, -2, -20]);
    this.up = new Vector3([0, 1, 0]);

    this.viewMat.setLookAt(this.eye.elements[0],this.eye.elements[1],this.eye.elements[2],
                           this.at.elements[0], this.at.elements[1], this.at.elements[2],
                           this.up.elements[0], this.up.elements[1], this.up.elements[2]);
  }

  setSkyView() {
    this.eye = new Vector3([0, 7.7, 0]);
    this.at = new Vector3([0, -100, 0]);
    this.up = new Vector3([0, 0, -1]);

    this.viewMat.setLookAt(this.eye.elements[0],this.eye.elements[1],this.eye.elements[2],
                           this.at.elements[0], this.at.elements[1], this.at.elements[2],
                           this.up.elements[0], this.up.elements[1], this.up.elements[2]);
  }

  moveIfInBounds(toAdd) {
    var future = new Vector3(this.eye.elements);
    future.add(toAdd);

    if (-7.8 < future.elements[0] && future.elements[0] < 7.8) {
      if (-0.5 < future.elements[1] && future.elements[1] < 7.8) {
        if (-7.8 < future.elements[2] && future.elements[2] < 7.8) {
          //console.log("in bounds");
          this.eye.set(future);
          return true;
        }
      }
    }
    //console.log("OUT OF BOUNDS");
    return false;
  }

  moveForward() {
    let f = new Vector3();
    f.set(this.at);
    f.sub(this.eye);
    f.normalize();
    f.mul(this.speed);

    if (this.moveIfInBounds(f)) {
      this.at.add(f);
    }

    //this.eye.add(f);
    //this.at.add(f);

    this.viewMat.setLookAt(this.eye.elements[0],this.eye.elements[1],this.eye.elements[2],
                           this.at.elements[0],this.at.elements[1],this.at.elements[2],
                           this.up.elements[0],this.up.elements[1],this.up.elements[2]);
  }

  moveBackward() {
    let b = new Vector3();
    b.set(this.eye);
    b.sub(this.at);
    b.normalize();
    b.mul(this.speed);

    if (this.moveIfInBounds(b)) {
      this.at.add(b);
    }

    //this.eye.add(b);
    //this.at.add(b);

    this.viewMat.setLookAt(this.eye.elements[0],this.eye.elements[1],this.eye.elements[2],
                           this.at.elements[0],this.at.elements[1],this.at.elements[2],
                           this.up.elements[0],this.up.elements[1],this.up.elements[2]);
  }

  moveLeft() {
    let f = new Vector3();
    f.set(this.at);
    f.sub(this.eye);
    f.normalize();
    f.mul(this.speed);

    let s = Vector3.cross(this.up, f);
    s.normalize();
    s.mul(this.speed);

    if (this.moveIfInBounds(s)) {
      this.at.add(s);
    }

    //this.eye.add(s);
    //this.at.add(s);

    this.viewMat.setLookAt(this.eye.elements[0],this.eye.elements[1],this.eye.elements[2],
                           this.at.elements[0],this.at.elements[1],this.at.elements[2],
                           this.up.elements[0],this.up.elements[1],this.up.elements[2]);
  }

  moveRight() {
    let f = new Vector3();
    f.set(this.at);
    f.sub(this.eye);
    f.normalize();
    f.mul(this.speed);

    let s = Vector3.cross(f, this.up);
    s.normalize();
    s.mul(this.speed);

    if (this.moveIfInBounds(s)) {
      this.at.add(s);
    }

    //this.eye.add(s);
    //this.at.add(s);

    this.viewMat.setLookAt(this.eye.elements[0],this.eye.elements[1],this.eye.elements[2],
                           this.at.elements[0],this.at.elements[1],this.at.elements[2],
                           this.up.elements[0],this.up.elements[1],this.up.elements[2]);
  }

  moveUp() {
    let f = new Vector3([0, 1, 0]);
    f.mul(this.speed);

    if (this.moveIfInBounds(f)) {
      this.at.add(f);
    }

    //this.eye.add(f);
    //this.at.add(f);

    this.viewMat.setLookAt(this.eye.elements[0],this.eye.elements[1],this.eye.elements[2],
                           this.at.elements[0],this.at.elements[1],this.at.elements[2],
                           this.up.elements[0],this.up.elements[1],this.up.elements[2]);
  }

  moveDown() {
    let f = new Vector3([0, -1, 0]);
    f.mul(this.speed);

    if (this.moveIfInBounds(f)) {
      this.at.add(f);
    }

    //this.eye.add(f);
    //this.at.add(f);

    this.viewMat.setLookAt(this.eye.elements[0],this.eye.elements[1],this.eye.elements[2],
                           this.at.elements[0],this.at.elements[1],this.at.elements[2],
                           this.up.elements[0],this.up.elements[1],this.up.elements[2]);
  }

  panLeft(x) {
    let f = new Vector3();
    f.set(this.at);
    f.sub(this.eye);
    f.normalize();

    let r = new Matrix4().rotate(this.alpha * -x, this.up.elements[0],this.up.elements[1],this.up.elements[2]);
    let f_prime = r.multiplyVector3(f);

    this.at.set(this.eye);
    this.at.add(f_prime);

    this.viewMat.setLookAt(this.eye.elements[0],this.eye.elements[1],this.eye.elements[2],
                           this.at.elements[0],this.at.elements[1],this.at.elements[2],
                           this.up.elements[0],this.up.elements[1],this.up.elements[2]);
  }

  panRight(x) {
    let f = new Vector3();
    f.set(this.at);
    f.sub(this.eye);
    f.normalize();

    let r = new Matrix4().rotate(this.alpha * -x, this.up.elements[0],this.up.elements[1],this.up.elements[2]);
    let f_prime = r.multiplyVector3(f);

    this.at.set(this.eye);
    this.at.add(f_prime);

    this.viewMat.setLookAt(this.eye.elements[0],this.eye.elements[1],this.eye.elements[2],
                           this.at.elements[0],this.at.elements[1],this.at.elements[2],
                           this.up.elements[0],this.up.elements[1],this.up.elements[2]);
  }

  panUp(y) {
    let f = new Vector3();
    f.set(this.at);
    f.sub(this.eye);
    f.normalize();

    let s = Vector3.cross(f, this.up);
    s.normalize();

    let r = new Matrix4().rotate(this.alpha * y, s.elements[0],s.elements[1],s.elements[2]);
    let f_prime = r.multiplyVector3(f);

    this.at.set(this.eye);
    this.at.add(f_prime);

    this.viewMat.setLookAt(this.eye.elements[0],this.eye.elements[1],this.eye.elements[2],
                           this.at.elements[0],this.at.elements[1],this.at.elements[2],
                           this.up.elements[0],this.up.elements[1],this.up.elements[2]);
  }

  panDown(y) {
    let f = new Vector3();
    f.set(this.at);
    f.sub(this.eye);
    f.normalize();

    let s = Vector3.cross(f, this.up);
    s.normalize();

    let r = new Matrix4().rotate(this.alpha * y, s.elements[0],s.elements[1],s.elements[2]);
    let f_prime = r.multiplyVector3(f);

    this.at.set(this.eye);
    this.at.add(f_prime);

    this.viewMat.setLookAt(this.eye.elements[0],this.eye.elements[1],this.eye.elements[2],
                           this.at.elements[0],this.at.elements[1],this.at.elements[2],
                           this.up.elements[0],this.up.elements[1],this.up.elements[2]);
  }
}