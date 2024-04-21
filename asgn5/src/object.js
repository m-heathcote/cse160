import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';

function main() {

  // look up the canvas
	const canvas = document.querySelector('#c');
	
  // create a renderer
  const renderer = new THREE.WebGLRenderer({antialias: true, canvas});

  // create a camera
	const fov = 45;
	const aspect = 2; // the canvas default
	const near = 0.1;
	const far = 100;
	const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	camera.position.set(0, 10, 20);

  // orbit controls
	const controls = new OrbitControls(camera, canvas);
	controls.target.set(0, 5, 0);
	controls.update();

  // create a scene
	const scene = new THREE.Scene();
	scene.background = new THREE.Color(0xADD9FF);
	{
		const planeSize = 40;

    // texture loader
		const loader = new THREE.TextureLoader();
		const texture = loader.load( 'https://threejs.org/manual/examples/resources/images/checker.png' );
		texture.colorSpace = THREE.SRGBColorSpace;
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.magFilter = THREE.NearestFilter;
		const repeats = planeSize / 2;
		texture.repeat.set(repeats, repeats);

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

	{
		const skyColor = 0xB1E1FF; // light blue
		const groundColor = 0xB97A20; // brownish orange
		const intensity = 3;
		const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
		scene.add(light);
	}

	{
		const color = 0xFFFFFF;
		const intensity = 3;
		const light = new THREE.DirectionalLight(color, intensity);
		light.position.set(5, 10, 2);
		scene.add(light);
		scene.add(light.target);
	}

	{
		const mtlLoader = new MTLLoader();
		//mtlLoader.load('https://threejs.org/manual/examples/resources/models/windmill/windmill-fixed.mtl', (mtl) => {
		//mtlLoader.load('../objs/Crab/Crab_01.mtl', (mtl) => {
		mtlLoader.load('../objs/Palm/materials.mtl', (mtl) => {

			mtl.preload();
			const objLoader = new OBJLoader();
			//mtl.materials.Material.side = THREE.DoubleSide;
			objLoader.setMaterials(mtl);
			//objLoader.load('https://threejs.org/manual/examples/resources/models/windmill/windmill.obj', (root) => {
			//objLoader.load('../objs/Crab/Crab_01.obj', (root) => {
			objLoader.load('../objs/Palm/model.obj', (root) => {
        // scale
        const scaleFactor = 10;
        root.scale.set(scaleFactor, scaleFactor, scaleFactor);

        // move
        const newPosition = new THREE.Vector3(0, 2.8, 0);
        root.position.copy(newPosition);

        // add to scene
				scene.add(root);
			});
		});
	}

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

	function render() {
		if (resizeRendererToDisplaySize(renderer)) {

			const canvas = renderer.domElement;
			camera.aspect = canvas.clientWidth / canvas.clientHeight;
			camera.updateProjectionMatrix();
		}

		renderer.render(scene, camera);

		requestAnimationFrame(render);
	}

	requestAnimationFrame(render);
}

main();

