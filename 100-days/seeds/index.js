import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';

let colors = [
  "rgb(240, 249, 33)",
  "rgb(253, 197, 39)",
  "rgb(248, 149, 64)",
  "rgb(230, 108, 92)",
  "rgb(204, 71, 120)",
  "rgb(170, 35, 149)",
  "rgb(126, 3, 168)",
  "rgb(76, 2, 161)",
  "rgb(13, 8, 135)"
]

window.addEventListener("load", () => {
  const input = document.getElementById('prompt');
  input.oninput = onType;
  let seed;
  let petals, d;
  
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  
  const renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor(0x232323);
  document.body.appendChild( renderer.domElement );
  
    function onType(e) {
      let seedling;
      if (!e || !e.data) seedling = 0;
      else seedling = e.target.value;
      seed = new Math.seedrandom(seedling);
      petals = Math.floor(Math.min(seed() * 15, 100)); 
      d = Math.floor(360 / petals);
      scene.clear();
      // console.log(seedling, petals);
      makeFlower();
    }

  let petalGroup = [];

  function makePetal(x, y, z, r) {
    const pgeometry = new THREE.CircleGeometry( 5, 50, 0, 0.5 ); 
    const pmaterial = new THREE.MeshBasicMaterial( { color: 0xffffff } ); 
    const petal = new THREE.Mesh( pgeometry, pmaterial );
    petal.position.x = x;
    petal.rotateZ(r);
    petal.position.y = y;
    petal.position.z = z;
    petalGroup.push(petal);
    
    scene.add(petal);
  }
  
  function makeFlower() {
    const geometry = new THREE.CircleGeometry( 5, 50 ); 
    console.log(petals, Math.floor(colors.length % Math.max(petals, 1)));
    const material = new THREE.MeshBasicMaterial( { color: new THREE.Color(colors[ Math.floor(colors.length % Math.max(petals, 1)) ]) } ); 
    const circle = new THREE.Mesh( geometry, material );
    circle.position.z = -100;
    scene.add(circle)
    
    if (!petals) return;
    for (let i = 0; i <= 360; i+=d) {
      let x = 5 * (Math.cos(i));
      let y = 5 * (Math.sin(i));
      makePetal(x, y, -100, i);
    }
  }

  let angle = 0;

  function animate() {
    requestAnimationFrame( animate );
    petalGroup.forEach((p, a) => p.rotateZ(0.025));
    renderer.render( scene, camera );
  }

  animate();
});
