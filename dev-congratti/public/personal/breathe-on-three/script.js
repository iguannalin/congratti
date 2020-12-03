// check out this helpful three.js tutorial: https://bit.ly/2m3HZ5e
import * as THREEOrbit from "../../../src/utils/three-OrbitControls.js";
import * as THREE from "../../../src/utils/three.module.js";

var width,
    height,
    scene,
    camera,
    renderer,
    controls;

var leaf,
    material,
    sphere;

var inhale = true;
var inhaleTime = 0.006,
    exhaleTime = 0.009;

function init() {
    width = window.innerWidth;
    height = window.innerHeight;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

    camera.position.set(0, 5, 50);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(width, height);
    renderer.setClearColor(0xfff6e6);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.render(scene, camera);

    // ORBIT CONTROLS
    controls = new THREEOrbit.OrbitControls(camera, renderer.domElement);
    controls.target = new THREE.Vector3(0, 0, 0);
    controls.maxPolarAngle = Math.PI / 2;
    controls.addEventListener('change', function () {
        renderer.render(scene, camera);
    });

    leaf = new THREE.SphereGeometry(7, 5, 5, 2, 6.3, 0, 3);
    material = new THREE.MeshBasicMaterial({color: 0x3d3d3d, wireframe: true});
    sphere = new THREE.Mesh(leaf, material);
    scene.add(sphere);

    var Leaf = function () {
        THREE.Group.apply(this, arguments);

        var leaf = new THREE.Mesh(
            new THREE.TorusGeometry(.8, 1.6, 3, 4),
            new THREE.MeshStandardMaterial({
                color: 0x0b8450,
                flatShading: THREE.FlatShading,
                metalness: 0,
                roughness: 0.8,
                refractionRatio: 0.25,
                wireframe: true
            })
        );
        //leaf.geometry.vertices[4].y -=1;
        leaf.rotateX(Math.random() * Math.PI * 2);
        leaf.rotateZ(Math.random() * Math.PI * 2);
        leaf.rotateY(Math.random() * Math.PI * 2);
        leaf.receiveShadow = true;
        leaf.castShadow = true;

        this.add(leaf);

    }
    Leaf.prototype = Object.create(THREE.Group.prototype);
    Leaf.prototype.constructor = Leaf;
    var firstLeaf = new Leaf();
    scene.add(firstLeaf);
}

function render() {

    if (sphere) {
        sphere.rotation.x += 0.005;
        sphere.rotation.y += 0.005;
        sphere.rotation.z += 0.005;
    }

    controls.update();

    breathe();

    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

function onWindowResize() {
    height = window.innerHeight;
    width = window.innerWidth;
    // windowHalfX = width / 2;
    // windowHalfY = height / 2;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}

function checkBreath() {
    if (sphere.scale.x >= 2) {
        inhale = false;
    } else if (sphere.scale.x <= 0.5) {
        inhale = true;
    }
}

function breathe() {
    checkBreath();
    var words = "";
    const text = document.getElementById("text");

    if (inhale) {
        sphere.scale.x += inhaleTime;
        sphere.scale.y += inhaleTime;
        sphere.scale.z += inhaleTime;
        words = "breathe in";
        text.style.animation = "inhale 2.9s ease-in-out 1";
    } else if (!inhale) {
        sphere.scale.x -= exhaleTime;
        sphere.scale.y -= exhaleTime;
        sphere.scale.z -= exhaleTime;
        words = "breathe out";
        text.style.animation = "exhale 2.9s ease-in-out 1";
    }

    text.innerHTML = words;
}

init();

requestAnimationFrame(render);

document.body.appendChild(renderer.domElement);

window.addEventListener('resize', onWindowResize, false);
