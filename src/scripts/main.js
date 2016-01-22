'use strict';

var THREE = require('three');

window.addEventListener('load', function() {
    var width  = window.innerWidth;
    var height = window.innerHeight;
    var loader = new THREE.TextureLoader();

    // Renderer settings
    var renderer = new THREE.WebGLRenderer({ antialiasing: true });
    var scene = new THREE.Scene();
    renderer.setSize(width, height);
    renderer.setClearColor(0x222222, 1);

    // Camera settings
    var camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 10000);
    camera.position.z = 25;
    camera.lookAt(scene.position);

    var globe;

    // Build globe
    loader.load('../images/world.topo.bathy.200412.3x5400x2700.jpg', function(texture) {
        var material = new THREE.MeshPhongMaterial({ map: texture });
        var geometry = new THREE.SphereGeometry(5, 32, 32);
        globe = new THREE.Mesh(geometry, material);
        scene.add(globe);
    })

    // Add light
    var ambientLight = new THREE.AmbientLight(0xFFFFFF)
    var sun = new THREE.DirectionalLight(0xFFFFFF, 1.3);
    sun.position.set(-10, 0, 5);
    scene.add(ambientLight);
    scene.add(sun);

    // Draw
    (function animate() {
        requestAnimationFrame(animate);

        globe.rotation.y += 0.01

        sun.position.x = sun.position.x + 0.01;
        renderer.render(scene, camera);
        document.body.appendChild(renderer.domElement);
    })();
});
