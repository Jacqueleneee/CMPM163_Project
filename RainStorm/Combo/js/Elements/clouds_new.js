// inner variables
var canvas, ctx;
var camera, scene, renderer, meshMaterial, mesh, geometry, i, f;
var mouseX = 0, mouseY = 0;
var startTime = new Date().getTime();
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var textureLoader = new THREE.TextureLoader();

main_init();

function main_init() {

    // creating canvas and context objects
    // canvas = document.getElementById('panel');
    // var ctx = canvas.getContext('2d');


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
    geometry = new THREE.PlaneGeometry(100,10,10);

    // loading texture
     var texture = textureLoader.load('images/clouds.png');
    // texture.magFilter = THREE.LinearMipMapLinearFilter;
    // texture.minFilter = THREE.LinearMipMapLinearFilter;

    // preparing fog
    var fog = new THREE.Fog(0x251d32, - 100, 5000);

    // preparing material
    meshMaterial = new THREE.ShaderMaterial({
        uniforms: {
            'map': {type: 't', value:25, texture: texture},
            'fogColor' : {type: 'c', value: fog.color},
            'fogNear' : {type: 'f', value: fog.near},
            'fogFar' : {type: 'f', value: fog.far},

        },
        vertexShader: cloud_vs,
        fragmentShader: cloud_fs,
        depthTest: false
    });

    // preparing planeMesh
    var singleGeo = new THREE.Geometry();
    var geoMesh = new THREE.Mesh(geometry);
    var planeMesh = new THREE.Mesh(new THREE.PlaneGeometry(50, 50)); //plane of each image
    for (i = 0; i < 10000; i++) {
        // planeMesh.position.x = Math.random() * 1000 - 500;
        // planeMesh.position.y = - Math.random() * Math.random() * 200 - 15;
        // planeMesh.position.z = i;
        // planeMesh.rotation.z = Math.random() * Math.PI;
        // planeMesh.scale.x = planeMesh.scale.y = Math.random() * Math.random() * 1.5 + 0.5;
        planeMesh.position.x = Math.random() * 3500 -1800;
        planeMesh.position.y = (Math.random() * Math.random() * 300 - 15)+600;
        planeMesh.position.z = i+1000;
        planeMesh.rotation.z = Math.random() * Math.PI;
        planeMesh.scale.x =planeMesh.scale.y = Math.random() * Math.random() * 4.5 + 0.5;

        geoMesh.updateMatrix(); // as needed
        singleGeo.merge(geoMesh.geometry, geoMesh.matrix);

        planeMesh.updateMatrix(); // as needed
        singleGeo.merge(planeMesh.geometry, planeMesh.matrix);
        //THREE.GeometryUtils.merge(geometry, planeMesh);
    }

    mesh = new THREE.Mesh(singleGeo, meshMaterial);
    scene.add(mesh);

    mesh = new THREE.Mesh(singleGeo, meshMaterial);
    mesh.position.z = - 10000;
    scene.add(mesh);

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


     camera.position.x += Math.sin(position * 0.01);
     camera.position.y += Math.sin(-position * 1.9);
    // camera.position.z = - position + 10000;

    renderer.render(scene, camera);
}