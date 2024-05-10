// Texture.js

// ----- initTextures -----
function initTextures() {
  createAndLoadTexture(0, '../resources/grass-top.png');
  createAndLoadTexture(1, '../resources/my-sky.jpg');
  //createAndLoadTexture(2, '../resources/oak-wood.png');
  //createAndLoadTexture(2, '../resources/oak-wood-2.jpg');
  createAndLoadTexture(2, '../resources/uv-rainbow.jpg');
  //createAndLoadTexture(3, '../resources/stone-bricks.jpg');
  //createAndLoadTexture(3, '../resources/dirt.jpg');
  //createAndLoadTexture(3, '../resources/pinkflower.jpg');
  createAndLoadTexture(3, '../resources/grass-side.jpg');
  
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
      console.log("grabbing TEXTURE2");
      return gl.TEXTURE2;
    case 3:
      console.log("grabbing TEXTURE3");
      return gl.TEXTURE3;
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
      console.log("grabbing Sampler2");
      return u_Sampler2;
    case 3:
      console.log("grabbing Sampler3");
      return u_Sampler3;
    default:
      return null;
  }
}
// ----- end getSampler -----
