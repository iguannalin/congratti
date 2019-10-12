// Using Karim Maaloul's code as a guide
// https://bit.ly/2JU9XdV

// THREE VARIABLES
let scene,
    camera,
    controls,
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane,
    renderer,
    container,
    isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
isAndroid = navigator.userAgent.match(/Android/i);

// SCREEN VARIABLES
let height,
    width,
    windowHalfX,
    windowHalfY;

// CONFETTI
let confetti = [],
    confettiColors = [0xC9D757, 0xDE4B72, 0xF1BA48, 0xDE7567, 0x4C94BE, 0xF4F0C9, 0xD93732, 0xC0C1BD, 0xE07F8D, 0xED3D9, 0xF9EF82, 0xFBFCF7];

// RANDOM
let random = [], randomX = 0;

function generateRandom() {

    for (let i = 0; i < 10; i++) {
        random[i] = Math.random();
    }

}

function getRandom(n) {

    return random[n % random.length];

}

// INIT SCENE
function init() {

    generateRandom();
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
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    container = document.body;
    container.appendChild(renderer.domElement);
    container.setAttribute('aria-label', 'Interactive graphic of falling confetti');
    windowHalfX = width / 2;
    windowHalfY = height / 2;
    window.addEventListener('resize', onWindowResize, false);
    controls = new THREE.OrbitControls(camera, renderer.domElement);

}

function onWindowResize() {

    if (isMobile) return;

    height = window.innerHeight;
    width = window.innerWidth;
    windowHalfX = width / 2;
    windowHalfY = height / 2;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

}

function createConfetti(t) {

    for (let i = 0; i < t; i++) {

        let con = new Confetti(confettiColors[Math.round(Math.random() * 10) % confettiColors.length]);
        con.threegroup.position.x = Math.sin(Math.PI * (Math.random())) * (width / 6) - (Math.random() * 300);
        con.threegroup.position.y = Math.cos(Math.PI * (Math.random())) * (height) - (Math.random() * 350);
        con.threegroup.position.z = 50 * Math.random() * 10 - t;
        confetti.push(con);
        scene.add(con.threegroup);

    }

}

// CONFETTI
Confetti = function (c) {

    let plane = new THREE.PlaneBufferGeometry(width / 40, width / 20);
    this.material = new THREE.MeshBasicMaterial({

        color: c,
        transparent: true,
        opacity: Math.random() * 1.2,
        side: THREE.DoubleSide

    });
    this.confetto = new THREE.Mesh(plane, this.material);

    this.threegroup = new THREE.Group();
    this.threegroup.add(this.confetto);
    this.threegroup.lookAt(new THREE.Vector3(Math.random() * 10, Math.random() * 80, 60));

};

// RESET CONFETTI
Confetti.prototype.update = function () {

    if (this.threegroup.position.y < height && this.threegroup.position.y > -height) {
        this.threegroup.position.y -= 1;
        this.threegroup.rotateY(Math.random() * 0.05);
        this.threegroup.rotateZ(Math.random() * 0.01);
    } else {
        this.threegroup.position.y = height - 1;
    }

};

// METHODS
function loop() {
    render();

    for (let i = 0; i < confetti.length; i++) {
        confetti[i].update();
    }

    requestAnimationFrame(loop);
}

function render() {
    if (controls) controls.update();
    renderer.render(scene, camera);
}

// CALLS
init();
createConfetti(25);
loop();
