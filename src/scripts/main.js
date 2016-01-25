'use strict';

var THREE = require('three');
var $ = require('jquery');

var globe = require('./src/globe.js');
var Stats = require('./src/stats.js');

$(function() {
    console.log(globe);
    var width  = window.innerWidth;
    var height = window.innerHeight;

    // Renderer settings
    var renderer = new THREE.WebGLRenderer({ antialiasing: true });
    var scene = new THREE.Scene();
    renderer.setSize(width, height);
    renderer.setClearColor(0x00090C, 1);
    $('body').append(renderer.domElement);

    // Camera settings
    var camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 10000);
    camera.position.z = 35;
    camera.lookAt(scene.position);

    // Add globe
    scene.add(globe);

    // Add light
    var ambient = new THREE.AmbientLight(0xFFFFEE);
    var sun = new THREE.DirectionalLight(0xFFFFFF, 0.25);
    sun.position.set(10, 50, 50);
    scene.add(ambient);
    scene.add(sun);

    // Draw
    (function animate() {
        setTimeout(function() {
            Stats.begin();

            requestAnimationFrame(animate);

            sun.position.x = Math.cos(Date.now() / 2000) * 15;

            renderer.render(scene, camera);

            Stats.end();
        }, 1000 / 60)
    })();
});
