'use strict';

var THREE = require('three');
var $ = require('jquery');
var Hammer = require('hammerjs');
var Stats = require('stats-js');

var stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';

var mc = new Hammer.Manager(window);
mc.add(new Hammer.Pan({ direction: Hammer.DIRECTION_HORIZONTAL, threshold: 0 }));

$(function() {
    $('body').append(stats.domElement);

    var width  = window.innerWidth;
    var height = window.innerHeight;
    var loader = new THREE.TextureLoader();

    // Renderer settings
    var renderer = new THREE.WebGLRenderer({ antialiasing: true });
    var scene = new THREE.Scene();
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 1);
    document.body.appendChild(renderer.domElement);

    // Camera settings
    var camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 10000);
    camera.position.z = 25;
    camera.lookAt(scene.position);

    // Build globe
    var material = new THREE.MeshPhongMaterial();
    var geometry = new THREE.SphereGeometry(5, 32, 32);
    var globe = new THREE.Mesh(geometry, material);
    loader.load('../images/world.topo.bathy.200412.3x5400x2700.jpg', function(texture) {
        globe.material.map = texture;
        scene.add(globe);
    });

    // Add light
    var ambientLight = new THREE.AmbientLight(0x999999)
    var sun = new THREE.DirectionalLight(0xFFDDBB, 2);
    sun.position.set(-30, 10, 10);
    scene.add(ambientLight);
    scene.add(sun);

    // Event binding
    mc.on('pan', rotateGlobe);

    // Draw
    (function animate() {
        setTimeout(function() {
            stats.begin();

            requestAnimationFrame(animate);
            sun.position.x = Math.sin(Date.now() / 10000) * 30;
            renderer.render(scene, camera);

            stats.end();
        }, 1000 / 60)
    })();

    // Input actions
    function rotateGlobe(event) {
        console.log(event.overallVelocityX);
        globe.rotation.y += event.velocityX / 10;
    }
});
