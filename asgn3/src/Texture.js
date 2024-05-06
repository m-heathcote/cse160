// Texture.js

// ----- initTextures -----
function initTextures() {
  createAndLoadTexture(0, '../resources/grass-top.png');
  createAndLoadTexture(1, '../resources/my-sky.jpg');
  
  return true;
}
// ----- end initTextures -----

function createAndLoadTexture(index, path) {
  var image = new Image();  // Create the image object
  if (!image) {
    console.log('Failed to create the image object');
    return false;
  }

  // Register the event handler to be called on loading an image
  image.onload = function(){ sendImageToTEXTURE(image, index); };

  // Tell the browser to load an image
  image.src = path;

  return true;
}

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

function getTexture(index) {
  switch(index) {
    case 0:
      return gl.TEXTURE0;
    case 1:
      return gl.TEXTURE1;
    default:
      return null;
  }
}

function getSampler(index) {
  switch(index) {
    case 0:
      return u_Sampler0;
    case 1:
      return u_Sampler1;
    default:
      return null;
  }
}





/*
// ----- sendImageToTEXTURE0 -----
function sendImageToTEXTURE0(image, index) {
  var texture = gl.createTexture();   // Create a texture object
  if (!texture) {
    console.log('Failed to create the texture object');
    return false;
  }

  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // Flip the image's y axis
  // Enable texture unit0
  gl.activeTexture(gl.TEXTURE0);
  // Bind the texture object to the target
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Set the texture parameters
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  // Set the texture image
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
  
  // Set the texture unit 0 to the sampler
  gl.uniform1i(u_Sampler0, 0);

  // Render
  renderAllShapes();
}
// ----- end sendImageToTEXTURE0 -----
*/