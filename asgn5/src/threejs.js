import * as THREE from 'three';

function main() {

  // look up the canvas
	const canvas = document.querySelector('#c');
	
  // create a renderer
  const renderer = new THREE.WebGLRenderer({antialias: true, canvas});

  // create a camera
	const fov = 75; // 75 degrees (vertical direction)
	const aspect = 2; // the canvas default (300/150)
	const near = 0.1; // anything before near won't be rendered
	const far = 5; // anything after far won't be rendered
	const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	camera.position.z = 2; // looking down the z-axis towards -z

  // create a scene
	const scene = new THREE.Scene();
	{
    // create a directional light
		const color = 0xFFFFFF;
		const intensity = 3;
		const light = new THREE.DirectionalLight(color, intensity);
		light.position.set(-1, 2, 4);
		scene.add(light);
	}

  // create a box
	const boxWidth = 1;
	const boxHeight = 1;
	const boxDepth = 1;
	const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

	function makeInstance(geometry, color, x) {
    // create a basic material and set its color
		const material = new THREE.MeshPhongMaterial({color});

    // create a mesh
    // (combines: geometry, material, and position/orientation/scale)
		const cube = new THREE.Mesh(geometry, material);
		
    // add mesh (cube) to scene
    scene.add(cube);

		cube.position.x = x;

		return cube;
	}

  // 3 cubes
	const cubes = [
		makeInstance( geometry, 0x44aa88, 0 ),
		makeInstance( geometry, 0x8844aa, -2 ),
		makeInstance( geometry, 0xaa8844, 2 ),
	];

	function render(time) {
		time *= 0.001; // convert time to seconds

		cubes.forEach((cube, ndx) => {
			const speed = 1 + ndx * .1;
			const rot = time * speed;

      // set rotations (in radians)
      // 2pi radians in 1 circle
			cube.rotation.x = rot;
			cube.rotation.y = rot;
		});

    // render the scene
		renderer.render(scene, camera);

		requestAnimationFrame(render);
	}

  // animate
  // (passes the time since the page loaded into the function render)
	requestAnimationFrame(render);

}

main();

