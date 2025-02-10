import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import font from 'three/examples/fonts/helvetiker_bold.typeface.json';

console.log(font)
// initialize the scene
const scene = new THREE.Scene();

// initialize a group
const group = new THREE.Group();

const loader = new GLTFLoader();
loader.load('/glb/heart.glb', function(glb){
   const root = glb.scene;
   root.scale.set(20,20,20)
   root.position.y = 100
   root.position.x = 8

   const heart2 = root.clone();
   heart2.scale.set(20,20,20)
   heart2.position.y = 100
   heart2.position.x = -680

   const heartLast = root.clone();
   heartLast.scale.set(20,20,20)
   heartLast.position.y = 100
   heartLast.position.x = 712

   const heartSign = root.clone();
   heartSign.scale.set(20,20,20)
   heartSign.position.y = 3
   heartSign.position.x = 835

   group.add(root,heart2,heartLast,heartSign)
   scene.add(group);
}, function(xhr){
  console.log('gtlf loader',xhr.loaded/xhr.total * 100) + "% loaded"
}, function(error){
  console.log('gtlf error',error)
})


scene.background = new THREE.Color( 0xf0f0f0 );

const loaderfont = new FontLoader();
loaderfont.load(
	"/fonts/helvetiker_regular.typeface.json",  // Adjust the path based on your structure
	function ( font ) {
    const color = 0x006699;

					const matDark = new THREE.LineBasicMaterial( {
						color: "#FF0080",
						side: THREE.DoubleSide
					} );

					const matLite = new THREE.MeshBasicMaterial( {
						color: "#FF0080",
						transparent: true,
						opacity: 0.4,
						side: THREE.DoubleSide
					} );

					const message = 'Quieres ser mi san valentin?';

					const shapes = font.generateShapes( message, 100 );

					const geometry = new THREE.ShapeGeometry( shapes );

					geometry.computeBoundingBox();

					const xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );

					geometry.translate( xMid, 0, 0 );

					// make shape ( N.B. edge view not visible )

					const text = new THREE.Mesh( geometry, matLite );
					text.position.z = -5;
					scene.add( text );

					// make line shape ( N.B. edge view remains visible )

					const holeShapes = [];

					for ( let i = 0; i < shapes.length; i ++ ) {

						const shape = shapes[ i ];

						if ( shape.holes && shape.holes.length > 0 ) {

							for ( let j = 0; j < shape.holes.length; j ++ ) {

								const hole = shape.holes[ j ];
								holeShapes.push( hole );

							}

						}

					}

					shapes.push.apply( shapes, holeShapes );

					const lineText = new THREE.Object3D();

					for ( let i = 0; i < shapes.length; i ++ ) {

						const shape = shapes[ i ];

						const points = shape.getPoints();
						const geometry = new THREE.BufferGeometry().setFromPoints( points );

						geometry.translate( xMid, 0, 0 );

						const lineMesh = new THREE.Line( geometry, matDark );
						lineText.add( lineMesh );

					}
					scene.add( lineText );
          renderloop();
	},
	function ( xhr ) {
		console.log((xhr.loaded / xhr.total * 100) + '% loaded');
	},
	function ( err ) {
		console.log('Error loading font:', err);
	}
);

//   const message = "🌸Quieres ser mi san valentin?🌸";


// const axes = new THREE.AxesHelper(2);
// scene.add(axes);

const light = new THREE.AmbientLight(0xffffff,0.2);
 light.position.set(2, 2, 5);
scene.add(light);

const pointLight = new THREE.DirectionalLight(0xffcc6c,2);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);


// initialize the camera
const camera = new THREE.PerspectiveCamera(
  75, 
  window.innerWidth / window.innerHeight,
  1,
  10000
);
  
  camera.position.z = 5;
  
  // initialize the renderer
  const canvas = document.querySelector("canvas.threejs");
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
  });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  
  //instantiate the controls
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  //controls.autoRotate = true;
  
  
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
  
  // render the scene
  const renderloop = () => {
    group.children.forEach((child) => {
    if(child instanceof THREE.Group){
      child.rotation.y += 0.01;
    }
  })
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(renderloop);
  };
  
  renderloop();
  