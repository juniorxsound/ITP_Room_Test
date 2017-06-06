'use strict'

//three.js and dependencies
import * as THREE from 'three';
import OrbitControls from '../node_modules/three/examples/js/controls/OrbitControls.js';

//attach to the three object
OrbitControls(THREE);

//paths
const MODEL_PATH = '../assets/';


let scene, camera,
    manager,
    renderer,
    loader,
    light,
    room,
    controls;

window.onload = () => {
    setupScene();
}

let setupScene = () => {
    //Loading Manager
    manager = new THREE.LoadingManager();

    manager.onLoad = () =>{
        console.log('Finished loading all assets');
        render();
    }
    manager.onProgress = (item, loaded, total) =>{
        console.log((loaded / total * 100) + '%');
    }

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
    camera.position.set(0, 15, -10);
    scene.add(camera);
    light = new THREE.DirectionalLight(0xffffff);
    scene.add(light);

    // let gridHelper = new THREE.GridHelper( 10, 10 );
    // scene.add( gridHelper );

    loader = new THREE.JSONLoader(manager);
    loader.load(MODEL_PATH + 'shiffman.json', (geometry, material) => {
        room = new THREE.Mesh(geometry, material);
        scene.add(room);
    });


    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);   

    window.scene = scene;

    window.addEventListener('resize', onWindowResize);

}

let onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

let render = () => {
    requestAnimationFrame(render);
    room.rotation.y += 0.001;
    renderer.render(scene, camera);
}
