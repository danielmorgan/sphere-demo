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
mc.add(new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 }));

$(function() {
    $('body').append(stats.domElement);

    var width  = window.innerWidth;
    var height = window.innerHeight;
    var manager = new THREE.LoadingManager();
    var loader = new THREE.TextureLoader(manager);

    manager.onLoad = function() {
        console.log('loaded');
        addGlobe();
    }

    // Renderer settings
    var renderer = new THREE.WebGLRenderer({ antialiasing: true });
    var scene = new THREE.Scene();
    renderer.setSize(width, height);
    renderer.setClearColor(0x00090C, 1);
    $('body').append(renderer.domElement);

    // Camera settings
    var camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 10000);
    camera.position.z = 25;
    camera.lookAt(scene.position);

    // Build globe
    var material = new THREE.MeshPhongMaterial();
    var geometry = new THREE.SphereGeometry(10, 64, 64);
    var globe = new THREE.Mesh(geometry, material);
    var map = loader.load('../images/world.topo.bathy.200412.3x5400x2700.jpg', t => t);
    var specularMap = loader.load('../images/earth_lights.gif', t => t);

    function addGlobe() {
        globe.material.map = map;
        globe.material.specularMap = specularMap;
        globe.material.specular = new THREE.Color(0x997722);
        globe.rotation.x = 0.6;
        scene.add(globe);
    }

    // Add light
    var sun = new THREE.DirectionalLight(0xFFFFFF, 1);
    sun.position.set(10, 10, 5);
    scene.add(sun);

    // Event binding
    mc.on('pan', rotateGlobe);

    // Draw
    (function animate() {
        setTimeout(function() {
            stats.begin();

            requestAnimationFrame(animate);

            globe.rotation.y -= 0.0005;
            sun.position.x = Math.cos(Date.now() / 2000) * 15;
            //$('#log').text('sun.position.x: ' + sun.position.x);

            renderer.render(scene, camera);

            stats.end();
        }, 1000 / 60)
    })();

    // Input actions
    function rotateGlobe(event) {
        console.log(event.overallVelocityX);
        globe.rotation.y += event.velocityX / 10;
        globe.rotation.x += event.velocityY / 10;
    }
});
