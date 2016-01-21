var THREE = require('three');

window.addEventListener('load', function() {
    var renderer = new THREE.WebGLRenderer({ antialiasing: true });
    renderer.setSize(640, 480);
    document.body.appendChild( renderer.domElement );

    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera( 35, 640/480, 0.1, 10000 );
    camera.position.set( -15, 10, 15 );
    camera.lookAt( scene.position );
    
    var geometry   = new THREE.SphereGeometry(5, 64, 64)
    var material  = new THREE.MeshPhongMaterial()
    var mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    var light = new THREE.PointLight( 0xFFFFFF );
    light.position.set( -12.5, 10, 15 );
    scene.add( light );

    renderer.setClearColor( 0xFFFFFF, 1);

    renderer.render( scene, camera );

});
