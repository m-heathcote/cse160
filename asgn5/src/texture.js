import * as THREE from 'three';

function main() {

  // look up the canvas
	const canvas = document.querySelector('#c');
	
  // create a renderer
  const renderer = new THREE.WebGLRenderer({antialias: true, canvas});

  // create a camera
	const fov = 75;
	const aspect = 1;
	const near = 0.1;
	const far = 5;
	const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	camera.position.z = 2;

  // create a scene
	const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xAEB3EF);
  //scene.background = new THREE.Color(0xFFFFFF);

  // create a box
	const boxWidth = 1;
	const boxHeight = 1;
	const boxDepth = 1;
	const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  // list of cubes
	const cubes = []; // just an array we can use to rotate the cubes
	
  // create a texture loader
  const loadManager = new THREE.LoadingManager();
  const loader = new THREE.TextureLoader(loadManager);

  // list of materials (for each side of the cube)
	const materials = [
    // oops all spaghetti
		new THREE.MeshBasicMaterial({map: loadColorTexture('../imgs/space-spaghet.png')}),
		new THREE.MeshBasicMaterial({map: loadColorTexture('../imgs/space-spaghet.png')}),
		new THREE.MeshBasicMaterial({map: loadColorTexture('../imgs/space-spaghet.png')}),
		new THREE.MeshBasicMaterial({map: loadColorTexture('../imgs/space-spaghet.png')}),
		new THREE.MeshBasicMaterial({map: loadColorTexture('../imgs/space-spaghet.png')}),
		new THREE.MeshBasicMaterial({map: loadColorTexture('../imgs/space-spaghet.png')}),
		//new THREE.MeshBasicMaterial({map: loadColorTexture('../imgs/flower-2.jpg')}),
		//new THREE.MeshBasicMaterial({map: loadColorTexture('../imgs/flower-3.jpg')}),
		//new THREE.MeshBasicMaterial({map: loadColorTexture('../imgs/flower-4.jpg')}),
		//new THREE.MeshBasicMaterial({map: loadColorTexture('../imgs/flower-5.jpg')}),
		//new THREE.MeshBasicMaterial({map: loadColorTexture('../imgs/flower-6.jpg')}),
	];

  // wait until textured loaded
  const loadingElem = document.querySelector('#loading');
  const progressBarElem = loadingElem.querySelector('.progressbar');

  loadManager.onLoad = () => {
    loadingElem.style.display = 'none';
    // create a mesh
	  const cube = new THREE.Mesh(geometry, materials);
	  scene.add(cube);
	  cubes.push(cube); // add to our list of cubes to rotate
  };

  loadManager.onProgress = (urlOfLastItemLoaded, itemsLoaded, itemsTotal) => {
    const progress = itemsLoaded / itemsTotal;
    progressBarElem.style.transform = 'scaleX(${progress})';
  };

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

	function loadColorTexture(path) {
		const texture = loader.load(path);
		texture.colorSpace = THREE.SRGBColorSpace;
		return texture;
	}

	function render(time) {
		time *= 0.001;

		if (resizeRendererToDisplaySize(renderer)) {
			const canvas = renderer.domElement;
			camera.aspect = canvas.clientWidth / canvas.clientHeight;
			camera.updateProjectionMatrix();
		}

		cubes.forEach((cube, ndx) => {
			//const speed = .2 + ndx * .1;
			const speed = 1 + ndx * .1;
			const rot = time * speed;
			//cube.rotation.x = rot;
			cube.rotation.y = rot;
		});

    // render the scene
		renderer.render(scene, camera);

    // animate
		requestAnimationFrame(render);
	}

  // start animation
	requestAnimationFrame(render);
}

main();

