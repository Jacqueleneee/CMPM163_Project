var camera, tick = 0,
			scene, renderer_rain, clock = new THREE.Clock(),
			controls, container, gui = new dat.GUI( { width: 350 } ),
			options, spawnerOptions, particleSystem;

		init();
		animate();

		function init() {

			container = document.getElementById( 'container' );
			camera = new THREE.PerspectiveCamera( 28, window.innerWidth / window.innerHeight, 1, 10000 );
			camera.position.z = 100;
			scene = new THREE.Scene();

			//Angus
			particleSystem = new THREE.GPUParticleSystem( {
				maxParticles: 10000
			} );

			scene.add( particleSystem );

			//Rain
			particleSystem2 = new THREE.GPUParticleSystem2( {
				maxParticles: 10000
			} );

			scene.add( particleSystem2 );

			//Rain
			particleSystem3 = new THREE.GPUParticleSystem2( {
				maxParticles: 10000
			} );

			scene.add( particleSystem3 );

			//Rain
			particleSystem4 = new THREE.GPUParticleSystem2( {
				maxParticles: 10000
			} );

			scene.add( particleSystem4 );

			//Rain
			particleSystem5 = new THREE.GPUParticleSystem2( {
				maxParticles: 10000
			} );

			scene.add( particleSystem5 );

			//Rain
			particleSystem6 = new THREE.GPUParticleSystem2( {
				maxParticles: 10000
			} );

			scene.add( particleSystem6 );
			
			//Angus 
			options = {
				position: new THREE.Vector3(),
				positionRandomness: 0,
				velocity: new THREE.Vector3(),
				velocityRandomness: 0,
				color: 0x0088ff,
				colorRandomness: 0,
				turbulence: 0,
				lifetime: 0,
				size: 1000,
				sizeRandomness: 0
			};

			spawnerOptions = {
				spawnRate: 0.00000001,
				horizontalSpeed: 1,
				verticalSpeed: 1,
				timeScale: 1
			};

			//Rain
			options2 = {
				position: new THREE.Vector3(),
				positionRandomness: 1,
				velocity: new THREE.Vector3(),
				velocityRandomness: 3,
				color: 0x0088ff,
				colorRandomness: 0,
				turbulence: 0,
				lifetime: 200,
				size: 10,
				sizeRandomness: 2
			};

			spawnerOptions2 = {
				spawnRate: 1000,
				horizontalSpeed: 1.2,
				verticalSpeed: 1.4,
				timeScale: 1
			};
			//Rain
			options3 = {
				position: new THREE.Vector3(),
				positionRandomness: 1,
				velocity: new THREE.Vector3(),
				velocityRandomness: 3,
				color: 0x0088ff,
				colorRandomness: 0,
				turbulence: 0,
				lifetime: 200,
				size: 10,
				sizeRandomness: 2
			};
			
			spawnerOptions3 = {
				spawnRate: 1000,
				horizontalSpeed: 1.2,
				verticalSpeed: 1.4,
				timeScale: 1
			};
			//Rain
			options4 = {
				position: new THREE.Vector3(),
				positionRandomness: 1,
				velocity: new THREE.Vector3(),
				velocityRandomness: 5,
				color: 0x0088ff,
				colorRandomness: 0,
				turbulence: 0,
				lifetime: 200,
				size: 10,
				sizeRandomness: 2
			};

			spawnerOptions4 = {
				spawnRate: 1000,
				horizontalSpeed: 1.2,
				verticalSpeed: 1.4,
				timeScale: 1
			};
			//Rain
			options5 = {
				position: new THREE.Vector3(),
				positionRandomness: 1,
				velocity: new THREE.Vector3(),
				velocityRandomness: 5,
				color: 0x0088ff,
				colorRandomness: 0,
				turbulence: 0,
				lifetime: 200,
				size: 10,
				sizeRandomness: 2
			};

			spawnerOptions5 = {
				spawnRate: 1000,
				horizontalSpeed: 1.2,
				verticalSpeed: 1.4,
				timeScale: 1
			};
			//Rain
			options6 = {
				position: new THREE.Vector3(),
				positionRandomness: 1,
				velocity: new THREE.Vector3(),
				velocityRandomness: 3,
				color: 0x0088ff,
				colorRandomness: 0,
				turbulence: 0,
				lifetime: 200,
				size: 10,
				sizeRandomness: 2
			};

			spawnerOptions6 = {
				spawnRate: 1000,
				horizontalSpeed: 1.2,
				verticalSpeed: 1.4,
				timeScale: 1
			};
	
			//Angus comes alive
			gui.add(options, 'lifetime', 0, 0.01);

			renderer_rain = new THREE.WebGLRenderer();
			renderer_rain.setPixelRatio( window.devicePixelRatio );
			renderer_rain.setSize( window.innerWidth, window.innerHeight );
			container.appendChild( renderer_rain.domElement );

			window.addEventListener( 'resize', onWindowResize, false );

		}

		function onWindowResize() {

			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();

			renderer_rain.setSize( window.innerWidth, window.innerHeight );
		}

		function animate() {

			requestAnimationFrame( animate );
			var delta = clock.getDelta() * spawnerOptions.timeScale;
			tick += delta;
			if ( tick < 0 ) tick = 0;
			if ( delta > 0 ) {

				//Rain
				//options2.position.x = Math.sin( tick * spawnerOptions.horizontalSpeed ) * 25;
				options2.position.y = 75;//Math.sin( tick * spawnerOptions.verticalSpeed )*2;
				options3.position.y = 75;//Math.sin( tick * spawnerOptions.verticalSpeed )*2;
				options4.position.y = 75;//Math.sin( tick * spawnerOptions.verticalSpeed )*2;
				options5.position.y = 75;//Math.sin( tick * spawnerOptions.verticalSpeed )*2;
				options6.position.y = 75;//Math.sin( tick * spawnerOptions.verticalSpeed )*2;

				options3.position.x =  -110;//Math.sin( tick * spawnerOptions.horizontalSpeed ) * 25;
				options4.position.x =  -60;//Math.sin( tick * spawnerOptions.horizontalSpeed ) * 15;
				options5.position.x =  -75;//-Math.sin( tick * spawnerOptions.horizontalSpeed ) * 15;
				options6.position.x =  -45;//Math.sin( tick * spawnerOptions.horizontalSpeed ) * 25;

				particleSystem2.rotation.y = Math.PI / 4;
				particleSystem3.rotation.y = Math.PI / 4;
				particleSystem4.rotation.y = Math.PI / 2.5;
				particleSystem5.rotation.y = Math.PI / 3;
				particleSystem6.rotation.y = Math.PI / 4;


				for ( var x = 0; x < spawnerOptions.spawnRate * delta; x++ ) {
					//Angus
					particleSystem.spawnParticle( options );

					//Rain
					particleSystem2.spawnParticle( options2 );
					particleSystem3.spawnParticle( options3 );
					particleSystem4.spawnParticle( options4 );
					particleSystem5.spawnParticle( options5 );
					particleSystem6.spawnParticle( options6 );

				}

			}
			//Angus
			particleSystem.update( tick );

			//Rain
			particleSystem2.update( tick );
			particleSystem3.update( tick );
			particleSystem6.update( tick );
			particleSystem5.update( tick );
			particleSystem4.update( tick );

			render();
		}

		function render() {
			renderer_rain.render( scene, camera );
		}