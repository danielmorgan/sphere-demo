'use strict';

var THREE = require('three');
var Hammer = require('hammerjs');

var TextureLoader = new THREE.TextureLoader();
var TouchManager = new Hammer.Manager(window);

var geometry = new THREE.SphereGeometry(10, 64, 64);
var material = new THREE.MeshPhongMaterial({
    map: TextureLoader.load('../images/world.png', t => t),
    specularMap: TextureLoader.load('../images/bathymetry.jpg', t => t),
    specular: new THREE.Color(0xBBDDFF)
});

var globe = new THREE.Mesh(geometry, material);

TouchManager.add(new Hammer.Pan({direction: Hammer.DIRECTION_ALL, threshold: 0}));
TouchManager.on('pan', function rotateGlobe(event) {
    console.log(event.overallVelocityX);
    globe.rotation.y += event.velocityX / 10;
    globe.rotation.x += event.velocityY / 10;
});

export default globe;