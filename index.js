// TODO: COMBINE TYPEWRITE TO INDEX AND MINIFY

// Using Karim Maaloul's code as a guide
// https://bit.ly/2JU9XdV

// THREE VARIABLES
var scene,
    camera,
    controls,
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane,
    renderer,
    container;

// SCENE
var confetti = [],
    confettiColors = [0xC9D757, 0xDE4B72, 0xF1BA48, 0xDE7567, 0x4C94BE, 0xF4F0C9, 0xD93732, 0xC0C1BD, 0xE07F8D, 0xED3D9, 0xF9EF82, 0xFBFCF7];

// SCREEN VARIABLES
var height,
    width,
    windowHalfX,
    windowHalfY;

// SCENE
function init() {
  
  scene = new THREE.Scene();
  height = window.innerHeight;
  width = window.innerWidth;
  aspectRatio = width / height;
  fieldOfView = 60;
  nearPlane = 1;
  farPlane = 2000;
  camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane
  );
  camera.position.y = 0;
  camera.position.z = 800;
  camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );
  renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( width, height );
  container = document.body;
  container.appendChild( renderer.domElement );
  windowHalfX = width / 2;
  windowHalfY = height / 2;
  window.addEventListener('resize', onWindowResize, false);

  controls = new THREE.OrbitControls( camera, renderer.domElement );
  
}// Using Karim Maaloul's code as a guide

// THREE VARIABLES
var scene,
        camera,
        controls,
        fieldOfView,
        aspectRatio,
        nearPlane,
        farPlane,
        shadowLight,
        backLight,
        light,
        renderer,
        container;

// SCENE
var confetti = [],
        confettiColors = [0xC9D757, 0xDE4B72, 0xF1BA48, 0xDE7567, 0x4C94BE, 0xF4F0C9, 0xD93732, 0xC0C1BD, 0xE07F8D, 0xED3D9, 0xF9EF82, 0xFBFCF7];

// SCREEN VARIABLES
var height,
        width,
        windowHalfX,
        windowHalfY,
        mousePos = { x: 0, y: 0 },
        dist = 0;

function init() {
  
  scene = new THREE.Scene();
  height = window.innerHeight;
  width = window.innerWidth;
  aspectRatio = width / height;
  fieldOfView = 60;
  nearPlane = 1;
  farPlane = 2000;
  camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane
  );
  camera.position.y = 0;
  camera.position.z = 800;
  camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );
  renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( width, height );
  container = document.body;
  container.appendChild( renderer.domElement );
  windowHalfX = width / 2;
  windowHalfY = height / 2;
  window.addEventListener('resize', onWindowResize, false);
  window.addEventListener('mousemove', handleMouseMove, false);
  document.addEventListener('mouseup', handleMouseUp, false);
  controls = new THREE.OrbitControls( camera, renderer.domElement);
  controls.mouseButtons = {
    ORBIT: THREE.MOUSE.LEFT,
    ZOOM: THREE.MOUSE.MIDDLE,
    PAN: THREE.MOUSE.RIGHT
  }
  
}

function onWindowResize() {
  
  height = window.innerHeight;
  width = window.innerWidth;
  windowHalfX = width / 2;
  windowHalfY = height / 2;
  renderer.setSize( width, height );
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  
}

function handleMouseMove(event) {
  controls.update();
}

function handleMouseUp(event) {
  // createConfetti(20);
  console.log(event.clientY, height);
}

function createConfetti( t ) {
  
  for ( let i = 0; i < t; i++ ) {
    
    var con = new Confetti( confettiColors[Math.round(Math.random() * 10) % confettiColors.length] );
    con.threegroup.position.x = Math.sin(Math.PI / ( Math.random() )) * 300;
    con.threegroup.position.y = Math.cos(Math.PI / ( Math.random() )) * 350 - Math.random()*10;
    con.threegroup.position.z = 50 * Math.random() * 10 - t;
    confetti.push( con );
    scene.add( con.threegroup );
  
  }
  
}

Confetti = function( c ) {
  
  var plane = new THREE.PlaneBufferGeometry( 20, 40, 32 );
  this.material = new THREE.MeshBasicMaterial( {
    
    color: c,
    transparent: true,
    opacity: Math.random() * 1.2,
    side: THREE.DoubleSide,
    metalness: 0.2,
  roughness: 0.8,
  refractionRatio: 0.25
    
  } );
  this.confetto = new THREE.Mesh( plane, this.material );
  
  this.threegroup = new THREE.Group();
  this.threegroup.add( this.confetto );
  this.threegroup.lookAt( new THREE.Vector3(Math.random() * 10, Math.random() * 80, 60 ) );

}
Confetti.prototype.update = function() {
  
  if ( this.threegroup.position.y < height && this.threegroup.position.y > -height ) {
    this.threegroup.position.y -= 1;
    this.threegroup.rotateY( Math.random() * 0.05 );
    this.threegroup.rotateZ( Math.random() * 0.01 );
  }
  
  else {
    this.threegroup.position.y = height - 1;
  }
  
}

Confetti.prototype.move = function( mx, my, rect ) {
  // console.log(mx, my);
  // var x = ev.clientX; var y = ev.clientY; var rect = ev.target.getBoundingClientRect();
  //  x =
  //  y = (canvas.width/2 - (y - rect.top))/(canvas.width/2);
  this.threegroup.position.y =( ( my - rect.top ) - windowHalfY ) / ( windowHalfY ) ;
  this.threegroup.position.x =  ( ( mx - rect.left ) - windowHalfX ) / ( windowHalfX ) ;
  
}

function loop() {
  render();
  
  for ( let i = 0; i < confetti.length; i++ ) {
   confetti[i].update();
  }
  
  requestAnimationFrame( loop );
}

function render() {
  if (controls) controls.update();
  renderer.render( scene, camera );
}

init();
createConfetti(20);
loop();

function onWindowResize() {
  
  height = window.innerHeight;
  width = window.innerWidth;
  windowHalfX = width / 2;
  windowHalfY = height / 2;
  renderer.setSize( width, height );
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  
}

function createConfetti( t, n ) {
  
  for ( var i = 0; i < t; i++ ) {
    
    var con = new Confetti( confettiColors[Math.round(Math.random() * 10) % confettiColors.length] );
    con.threegroup.position.x = Math.sin(Math.PI / ( Math.random() )) * ( width / n );
    con.threegroup.position.y = Math.cos(Math.PI / ( Math.random() )) * ( height / n ) - Math.random()*10;
    con.threegroup.position.z = 50 * Math.random() * 10 - t;
    confetti.push( con );
    scene.add( con.threegroup );
  
  }
  
}

// CONFETTI
Confetti = function( c ) {
  
  var plane = new THREE.PlaneBufferGeometry( width / 40, width / 20, 32 );
  this.material = new THREE.MeshBasicMaterial( {
    
    color: c,
    transparent: true,
    opacity: Math.random() * 1.2,
    side: THREE.DoubleSide
    
  } );
  this.confetto = new THREE.Mesh( plane, this.material );
  
  this.threegroup = new THREE.Group();
  this.threegroup.add( this.confetto );
  this.threegroup.lookAt( new THREE.Vector3(Math.random() * 10, Math.random() * 80, 60 ) );

}

Confetti.prototype.update = function() {
  
  if ( this.threegroup.position.y < height && this.threegroup.position.y > -height ) {
    this.threegroup.position.y -= 1;
    this.threegroup.rotateY( Math.random() * 0.05 );
    this.threegroup.rotateZ( Math.random() * 0.01 );
  }
  
  else {
    this.threegroup.position.y = height - 1;
  }
  
}

// METHODS
function loop() {
  render();
  
  for ( var i = 0; i < confetti.length; i++ ) {
   confetti[i].update();
  }
  
  requestAnimationFrame( loop );
}

function render() {
  if (controls) controls.update();
  renderer.render( scene, camera );
}

// CALLS
init();

// Make less but bigger confetti for optimal speed on phones
if (screen.width <= 480) {
  createConfetti( 4, 9 );
}
else createConfetti( 25, 1 );
loop();