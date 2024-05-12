// Texture.js

// ----- initTextures -----
function initTextures() {
  createAndLoadTexture(0, '../resources/debug-floor-middle-lines.png');
  createAndLoadTexture(1, '../resources/my-sky.jpg');

  createAndLoadTexture(2, '../resources/oak-wood.png');
  createAndLoadTexture(3, '../resources/oak-wood-dark.png');
  createAndLoadTexture(4, '../resources/cobble.jpg');
  createAndLoadTexture(5, '../resources/cobble-dark.jpg');
  
  //createAndLoadTexture(5, '../resources/dirt.jpg');
  //createAndLoadTexture(5, '../resources/bricks.jpg');
  
  return true;
}
// ----- end initTextures -----

// ----- createAndLoadTexture -----
function createAndLoadTexture(index, path) {
  var image = new Image();  // Create the image object
  if (!image) {
    console.log('Failed to create the image object');
    return false;
  }

  // Register the event handler to be called on loading an image
  image.onload = function(){ sendImageToTEXTURE(image, index); console.log("loaded texture", index);};

  // Tell the browser to load an image
  image.src = path;

  return true;
}
// ----- end createAndLoadTexture -----

// ----- sendImageToTEXTURE -----
function sendImageToTEXTURE(image, index) {
  var texture = gl.createTexture();   // Create a texture object
  if (!texture) {
    console.log('Failed to create the texture object');
    return false;
  }

  // Flip the image's y axis
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);

  // Enable texture unit i (index)
  gl.activeTexture(getTexture(index));

  // Bind the texture object to the target
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Set the texture parameters
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

  // Set the texture image
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
  
  // Set the texture unit i (index) to the sampler
  gl.uniform1i(getSampler(index), index);

  // Render
  renderAllShapes();
}
// ----- end sendImageToTEXTURE -----

// ----- getTexture -----
function getTexture(index) {
  switch(index) {
    case 0:
      return gl.TEXTURE0;
    case 1:
      return gl.TEXTURE1;
    case 2:
      return gl.TEXTURE2;
    case 3:
      return gl.TEXTURE3;
    case 4:
      return gl.TEXTURE4;
    case 5:
      return gl.TEXTURE5;
    default:
      return null;
  }
}
// ----- end getTexture -----

// ----- getSampler -----
function getSampler(index) {
  switch(index) {
    case 0:
      return u_Sampler0;
    case 1:
      return u_Sampler1;
    case 2:
      return u_Sampler2;
    case 3:
      return u_Sampler3;
    case 4:
      return u_Sampler4;
    case 5:
      return u_Sampler5;
    default:
      return null;
  }
}
// ----- end getSampler -----
