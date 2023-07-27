import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
let object;

const ambientLight = new THREE.AmbientLight( 0xcc0099, 0.3 );
scene.add( ambientLight );

const pointLight = new THREE.PointLight( 0xff0000, 0.4 );
camera.add( pointLight );
scene.add( camera );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0x232323);
document.body.appendChild( renderer.domElement );

// ORBIT CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);

// LOW-POLY HEART from https://www.turbosquid.com/3d-models/love-3d-model-1263821
new MTLLoader().load('./Love_OBJ/Love.mtl',
	function ( material ) {
    material.preload();
    new OBJLoader().setMaterials(material).load( './Love_OBJ/Love.obj', function ( obj ) {
      object = obj;
      obj.scale.y = 1;
      obj.position.y = -50;
      obj.position.z = -150;
      scene.add( obj );
    }, undefined, function ( error ) {
      console.error( error );
    } );
  },
	// onProgress callback
	function ( xhr ) {
		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
	},
	// onError callback
	function ( err ) {
		console.log( 'An error happened' );
	}
);

let inhale = true;

//controls.update() must be called after any manual changes to the camera's transform
camera.position.set( 0, 20, 100 );
controls.update();

function animate() {
  if (object) {
    if (inhale) {
      object.position.z -= 1;
      if (object.position.z <= -200) inhale = false;
    }
    else {
      object.position.z += 1;
      if (object.position.z >= -100) inhale = true;
    }
  }
	requestAnimationFrame( animate );
  controls.update();
	renderer.render( scene, camera );
}

animate();