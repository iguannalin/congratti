// Using Karim Maaloul's code as a guide (https://bit.ly/2JU9XdV)

import * as THREEOrbit from "../../utils/three-OrbitControls.js";
import * as THREE from "../../utils/three.module.js";
import {getRandomPalette, getRandomColorFromPalette} from './palette.js';

// TODO: animations of confetti to follow cursor, and Anna Lin navi home brand link to animate on hover
// TODO: encapsulate all the different vars into objects i.e. CONFETTI.confettiGroup = [...], CONFETTI.colors = [...]

// THREE VARIABLES
let scene,
    camera,
    controls,
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane,
    renderer,
    container;

// SCREEN VARIABLES
let height,
    width,
    windowHalfX,
    windowHalfY;

// EVENT VARIABLES
let resizeTimoutEventID,
    mouseX,
    isMouseMoving,
    isMouseMovingLeft;

// CONFETTI
let confetti = [],
    confettiColors = [0xC9D757, 0xDE4B72, 0xF1BA48, 0xDE7567, 0x4C94BE, 0xF4F0C9, 0xD93732, 0xC0C1BD, 0xE07F8D, 0xED3D9, 0xF9EF82, 0xFBFCF7],
    // confettiColors = getRandomPalette(),
    // bgColor = getRandomColorFromPalette(confettiColors),
    fallingSpeed = 0;

// init SCENE
function initScene() {
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
    container = document.getElementById('canvas');
    container.appendChild(renderer.domElement);
    container.setAttribute('aria-label', 'interactive graphic of falling confetti');
    windowHalfX = width / 2;
    windowHalfY = height / 2;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimoutEventID);
        resizeTimoutEventID = setTimeout(onWindowResize, 150);
    }, false);
    // window.addEventListener('mousemove', onMouseMove, false);
    controls = new THREEOrbit.OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2;
}

function onMouseMove(e) {
    isMouseMoving = true;
    isMouseMovingLeft = (e.pageX < mouseX);
    mouseX = e.pageX;
    // console.log('is mouse moving left?', isMouseMovingLeft);
    setTimeout(() => isMouseMoving = false, 100);
}

function onWindowResize() {
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
        con.threegroup.position.z = Math.random() * 500 - t;
        confetti.push(con);
        scene.add(con.threegroup);
    }
}

// CONFETTI
function Confetti(c) {
    let side = (width > height) ? width : height;
    let plane = new THREE.PlaneBufferGeometry(side / 30, side / 10);
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
}

// RESET CONFETTI
Confetti.prototype.update = function () {
    if (this.threegroup.position.y < height && this.threegroup.position.y > -height) {
        this.threegroup.position.y -= 1;
        this.threegroup.rotateY(Math.random() * 0.05);
        this.threegroup.rotateZ(Math.random() * 0.01);
    } else {
        this.threegroup.position.y = height - 1;
    }
    // if (isMouseMoving) this.threegroup.position.y += (isMouseMovingLeft) ? -1 : 2;
};

// METHODS
function loop() {
    render();
    for (let i = 0; i < confetti.length; i++) {
        confetti[i].update();
    }
    setTimeout(() => {
        requestAnimationFrame(loop)
    }, fallingSpeed);
}

function render() {
    if (controls) controls.update();
    renderer.render(scene, camera);
}

function handleClick() {
    const r = Math.random() < .5;
    fallingSpeed = r && 25 || 0;
    // confettiColors = getRandomPalette();
    // bgColor = getRandomColorFromPalette(confettiColors);
}

function init() {
    // document.addEventListener('click', handleClick);
    initScene();
    createConfetti(25);
    loop();
    // document.body.style.backgroundColor = "#" + bgColor.toString();
}

document.addEventListener("DOMContentLoaded", init);
