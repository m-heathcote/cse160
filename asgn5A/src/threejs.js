import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js';
import {MTLLoader} from 'three/addons/loaders/MTLLoader.js';

function main() {

  // look up the canvas
	const canvas = document.querySelector('#c');
	
  // create a renderer
  const renderer = new THREE.WebGLRenderer({antialias: true, canvas});
  renderer.shadowMap.enabled = true; // Enable shadow mapping

  // create a camera
	const fov = 45;
	const aspect = 2; // the canvas default
	const near = 0.1;
	const far = 100;
	const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	camera.position.set(0, 10, 40);

  // orbit controls
	const controls = new OrbitControls(camera, canvas);
	controls.target.set(0, 5, 0);
	//controls.target.set(5.4, 5.86, -7.9);
	controls.update();

  // create a scene
	const scene = new THREE.Scene();
	scene.background = new THREE.Color(0xADD9FF);
	
  // -- Checkered Empty Floor --
  {
		const planeSize = 50;

    // texture loader
		const loader = new THREE.TextureLoader();
		const texture = loader.load( 'https://threejs.org/manual/examples/resources/images/checker.png' );
		texture.colorSpace = THREE.SRGBColorSpace;
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.magFilter = THREE.NearestFilter;
		const repeats = planeSize / 2;
		texture.repeat.set(repeats, repeats);

    // create plane and add texture
		const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
		const planeMat = new THREE.MeshPhongMaterial({
			map: texture,
			side: THREE.DoubleSide,
		});

    // mesh
		const mesh = new THREE.Mesh(planeGeo, planeMat);
		mesh.rotation.x = Math.PI * - .5;
		scene.add(mesh);
	}
  // -- (end Checkered Empty Floor) --

  // -- Hemisphere Light --
	{
		const skyColor = 0xC4E4FF; // light blue
		//const groundColor = 0xB97A20; // brownish orange
		const groundColor = 0x596090; // grayish purple
		const intensity = 3;
		const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
		scene.add(light);
	}
  // -- (end Hemisphere Light) --


  // -- Directional Light --
	{
		const color = 0xFFFFFF;
		const intensity = 3;
		const light = new THREE.DirectionalLight(color, intensity);
		//light.position.set(5, 10, 2);
		light.position.set(-10, 10, 20);
    light.castShadow = true;
    light.shadow.mapSize.width = 512;  // Shadow map width
    light.shadow.mapSize.height = 512; // Shadow map height
    light.shadow.camera.near = 0.5;    // Near shadow camera distance
    light.shadow.camera.far = 50;      // Far shadow camera distance
		scene.add(light);
		scene.add(light.target);
	}
  // -- (end Directional Light) --

  // function to make a geometry object and add it to the scene
	function makeInstance(geometry, color) {
    // create a material and set its color
    // MeshPhongMaterial IS affected by lights
    const material = new THREE.MeshPhongMaterial({color});

    // create a mesh
    // (combines: geometry, material, and position/orientation/scale)
		const shape = new THREE.Mesh(geometry, material);
		
    // add mesh to scene
    scene.add(shape);

		return shape;
	}

  // function to make a textured geometry object and add it to the scene
	function makeInstTextured(geometry, path, num) {
    // load the texture
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(path);

    // configure repeating pattern
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(num, num);

    // create a material with the texture
    const material = new THREE.MeshPhongMaterial({map: texture});

    // create a mesh
    // (combines: geometry, material, and position/orientation/scale)
		const shape = new THREE.Mesh(geometry, material);
		
    // add mesh to scene
    scene.add(shape);

		return shape;
	}

  // function to get the side lengths of an isosceles right triangle
  // if you know the hypotenuse
  function getSide(hypotenuse) {
    return Math.sqrt(Math.pow(hypotenuse, 2) / 2);
  }

  // function to get the hypotenuse of an isosceles right triangle
  // if you know the side lengths
  function getHypotenuse(side) {
    return Math.sqrt(2 * Math.pow(side, 2));
  }

  // -- Room Walls --
  {
  // define size
  const size = 20;
  const height = size * 0.8;
  const thickness = 0.4;

	// (width, height, depth)
  const floor_geo = new THREE.BoxGeometry(size, thickness, size);
  const wall_geo = new THREE.BoxGeometry(size, height, thickness);
  const corner_geo = new THREE.BoxGeometry(thickness, height, thickness);

	const floor = makeInstTextured(floor_geo, '../imgs/wood.png', 5);
  //const floor = makeInstance(floor_geo, 0x877057); // dark brown
  const r_wall = makeInstance(wall_geo, 0xC4ACDF); // light purple
  const l_wall = makeInstance(wall_geo, 0xC4ACDF);
  const corner = makeInstance(corner_geo, 0XC4ACDF);

  // rotate
  floor.rotation.y = Math.PI / 4;    // 45 degrees
  r_wall.rotation.y = - Math.PI / 4; // -45 degrees
  l_wall.rotation.y = Math.PI / 4;   // 45 degrees
  corner.rotation.y = Math.PI / 4;    // 45 degrees
  
  // move y
  floor.position.y = thickness/2;
  r_wall.position.y = height/2;
  l_wall.position.y = height/2;
  corner.position.y = height/2;
  
  // move xz
  const shift1 = getSide(size/2);
  const shift2 = getSide(thickness/2);
  const shift3 = getHypotenuse(size/2);
  const shift4 = getHypotenuse(thickness/2);

  r_wall.position.x = shift1 + (shift2);
  r_wall.position.z = (-1 * shift1) - (shift2);
  
  l_wall.position.x = (-1 * shift1) - (shift2);
  l_wall.position.z = (-1 * shift1) - (shift2);
  
  corner.position.z = (-1 * shift3) - (shift4);
  }
  // -- (end Room Walls) --

  // -- Bookshelf --
	{
    // load the MTL file
		const mtlLoader = new MTLLoader();
		mtlLoader.load('../objs/Shelf1/materials.mtl', (mtl) => {
			mtl.preload();

      // load the OBJ file
			const objLoader = new OBJLoader();
			objLoader.setMaterials(mtl);
			objLoader.load('../objs/Shelf1/model.obj', (root) => {
        // create different material
        const material = new THREE.MeshPhongMaterial({color: 0x956D56});

        // apply new material to each mesh in the object
        root.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material = material;
          }
        });

        // scale
        const scaleFactor = 5.5;
        root.scale.set(scaleFactor, scaleFactor, scaleFactor);

        // rotate
        root.rotation.y = Math.PI / 4

        // move
        const newPosition = new THREE.Vector3(6.4, 2, -6.4);
        root.position.copy(newPosition);

        // turn on shadows
        root.recieveShadow = true;

        // add to scene
				scene.add(root);
			});
		});
	}
  // -- (end Bookshelf) --

  // -- Books --
	{
    // load the MTL file
		const mtlLoader = new MTLLoader();
		mtlLoader.load('../objs/Books/materials.mtl', (mtl) => {
			mtl.preload();

      // load the OBJ file
			const objLoader = new OBJLoader();
			objLoader.setMaterials(mtl);
			objLoader.load('../objs/Books/model.obj', (root) => {
        // scale
        const scaleFactor = 4.5;
        root.scale.set(scaleFactor, scaleFactor, scaleFactor);

        // rotate
        root.rotation.y = - Math.PI / 4

        // move
        const newPosition = new THREE.Vector3(6.2, 1.5, -6.2);
        root.position.copy(newPosition);

        // add to scene
				scene.add(root);
			});
		});
	}
  // -- (end Books) --

  // -- D20 --
  var d20;
  {
	// (radius, detail)
  const d20_geo = new THREE.IcosahedronGeometry(0.22, 0);

  d20 = makeInstance(d20_geo, 0xA73265);

  // turn on shadow
  d20.castShadow = true;

  // move
  const newPosition = new THREE.Vector3(4.4, 5.89, -8.3);
  d20.position.copy(newPosition);
  }
  // -- (end D20) --

  // -- D12 --
  var d12;
  {
	// (radius, detail)
  const d12_geo = new THREE.DodecahedronGeometry(0.17, 0);

  d12 = makeInstance(d12_geo, 0xA73265);

  // turn on shadow
  d12.castShadow = true;

  // move
  const newPosition = new THREE.Vector3(5.4, 5.86, -7.9);
  d12.position.copy(newPosition);
  }
  // -- (end D20) --

  // resize to match window dimensions if necessary 
	function resizeRendererToDisplaySize(renderer) {
		const canvas = renderer.domElement;
		const width = canvas.clientWidth;
		const height = canvas.clientHeight;
		const needResize = canvas.width !== width || canvas.height !== height;
		
    if (needResize) {
			renderer.setSize(width, height, false);
		}

		return needResize;
	}

  // animation loop
	function render(time) {
		if (resizeRendererToDisplaySize(renderer)) {
			const canvas = renderer.domElement;
			camera.aspect = canvas.clientWidth / canvas.clientHeight;
			camera.updateProjectionMatrix();
		}

    // determine speed and rotation
    time *= 0.001; // convert to seconds
    const speed = 1.5;
    const rot = time * speed;

    // set rotations (in radians)
    d20.rotation.x = rot;
    d20.rotation.y = rot;
    d12.rotation.x = rot;
    d12.rotation.y = rot;

    // render the scene
		renderer.render(scene, camera);

    // animate
		requestAnimationFrame(render);
	}

  // begin animation
	requestAnimationFrame(render);
}

main();

