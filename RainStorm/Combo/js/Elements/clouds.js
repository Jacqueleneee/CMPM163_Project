// inner variables
var container;
var canvas, ctx;
var camera, scene, renderer, meshMaterial, mesh, geometry, i, f;
var mouseX = 0, mouseY = 0;
var startTime = new Date().getTime();
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

if (window.attachEvent) {
    window.attachEvent('onload', main_init);
} else {
    if(window.onload) {
        var curronload = window.onload;
        var newonload = function() {
            curronload();
            main_init();
        };
        window.onload = newonload;
    } else {
        window.onload = main_init;
    }
}

function main_init() {

    // creating canvas and context objects
    // canvas = document.getElementById('panel');
    // var ctx = canvas.getContext('2d');
    container = document.getElementById('container');


    // preparing camera
    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 5000);
    camera.position.z = 6000;

    //adds a default mouse listener to control the camera rotation and zoom
    // var controls = new THREE.OrbitControls( camera );
    // //camera.position.z = 5;
    // controls.update();


    // preparing scene
    scene = new THREE.Scene();

    // preparing geometry
    geometry = new THREE.PlaneGeometry(100,100,100);

    // loading texture
    var texture = THREE.ImageUtils.loadTexture('images/clouds.png');
    texture.magFilter = THREE.LinearMipMapLinearFilter;
    texture.minFilter = THREE.LinearMipMapLinearFilter;

    // preparing fog
    var fog = new THREE.Fog(0x251d32, - 100, 5000);

    // preparing material
    meshMaterial = new THREE.MeshShaderMaterial({
        uniforms: {
            'map': {type: 't', value:2, texture: texture},
            'fogColor' : {type: 'c', value: fog.color},
            'fogNear' : {type: 'f', value: fog.near},
            'fogFar' : {type: 'f', value: fog.far},

        },
        vertexShader: cloud_vs,
        fragmentShader: cloud_fs,
        depthTest: false
    });

    // preparing planeMesh
    var planeMesh = new THREE.Mesh(new THREE.PlaneGeometry(100, 100));
    for (i = 0; i < 10000; i++) {
        // planeMesh.position.x = Math.random() * 1000 - 500;
        // planeMesh.position.y = - Math.random() * Math.random() * 200 - 15;
        // planeMesh.position.z = i;
        // planeMesh.rotation.z = Math.random() * Math.PI;
        // planeMesh.scale.x = planeMesh.scale.y = Math.random() * Math.random() * 1.5 + 0.5;
        planeMesh.position.x = i-1500;
        planeMesh.position.y = (Math.random() * Math.random() * 90 - 15)+700;
        planeMesh.position.z = Math.random() * 5500+50; //i+1000;
        planeMesh.rotation.z = Math.random() * Math.PI;
        planeMesh.scale.x =planeMesh.scale.y = Math.random() * Math.random() * 3.5 + 0.5;

        THREE.GeometryUtils.merge(geometry, planeMesh);
    }

    mesh = new THREE.Mesh(geometry, meshMaterial);
    scene.addObject(mesh);

    mesh = new THREE.Mesh(geometry, meshMaterial);
    mesh.position.z = - 10000;
    scene.addObject(mesh);

    // preparing new renderer and drawing it
    renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // change positions by mouse
    document.addEventListener('mousemove', onMousemove, false);

    // change canvas size on resize
    window.addEventListener('resize', onResize, false);
    container.appendChild(renderer.domElement);

    setInterval(drawScene, 30); // loop drawScene
}

function onMousemove(event) {
    mouseX = (event.clientX - windowHalfX) * 0.3;
    mouseY = (event.clientY - windowHalfY) * 0.2;
}

function onResize(event) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function drawScene() {
 position = ((new Date().getTime() - startTime) * 0.1) % 10000;


     camera.position.x += .9;
     camera.position.y += Math.sin(-position * .03);
     //camera.position.z = - position + 10000;

    renderer.render(scene, camera);
}