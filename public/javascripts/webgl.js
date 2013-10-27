(function(){

	// Camera入力用
	var videoInput = document.getElementById('video');

	//
	var canvasInput = document.getElementById('compare');

	// 3Dセッティング
	if ( !Detector.webgl ) Detector.addGetWebGLMessage();
	var camera, scene, renderer;
	var plane;

	function init(){

		var container = document.createElement( 'div' );
		container.classList.add('webgl');

		var treeContext = document.getElementById('container');
		treeContext.appendChild( container );

		scene = new THREE.Scene();
		scene.fog = new THREE.Fog( 0x000000, 1, 5000 );

		camera = new THREE.PerspectiveCamera( 23, window.innerWidth / window.innerHeight, 1, 100000 );
		camera.position.z = 6000;
		scene.add( camera );

		// Planes

		//top wall
		plane1 = new THREE.Mesh( new THREE.PlaneGeometry( 500, 3000, 5, 15 ), new THREE.MeshBasicMaterial( { color: 0xcccccc, wireframe : true } ) );
		plane1.rotation.x = Math.PI/2;
		plane1.position.y = 250;
		plane1.position.z = 50-1500;
		scene.add( plane1 );

		//left wall
		plane2 = new THREE.Mesh( new THREE.PlaneGeometry( 3000, 500, 15, 5 ), new THREE.MeshBasicMaterial( { color: 0xcccccc, wireframe : true } ) );
		plane2.rotation.y = Math.PI/2;
		plane2.position.x = -250;
		plane2.position.z = 50-1500;
		scene.add( plane2 );

		//right wall
		plane3 = new THREE.Mesh( new THREE.PlaneGeometry( 3000, 500, 15, 5 ), new THREE.MeshBasicMaterial( { color: 0xcccccc, wireframe : true	} ) );
		plane3.rotation.y = -Math.PI/2;
		plane3.position.x = 250;
		plane3.position.z = 50-1500;
		scene.add( plane3 );

		//bottom wall
		plane4 = new THREE.Mesh( new THREE.PlaneGeometry( 500, 3000, 5, 15 ), new THREE.MeshBasicMaterial( { color: 0xcccccc, wireframe : true	} ) );
		plane4.rotation.x = -Math.PI/2;
		plane4.position.y = -250;
		plane4.position.z = 50-1500;
		scene.add( plane4 );

		// Create sprites with lines

		var placeTarget = function(x,y,z) {

			// Cylinder
			var cylinder = new THREE.Mesh( new THREE.CylinderGeometry(30,30,1,20,1,false), new THREE.MeshBasicMaterial( { color : 0xeeeeee} ) );
			cylinder.position.x = x;
			cylinder.rotation.x = Math.PI/2;
			cylinder.position.y = y;
			cylinder.position.z = z;
			scene.add( cylinder );

			var geometry = new THREE.Geometry();
			geometry.vertices.push( new THREE.Vertex( new THREE.Vector3( 0, 0, -80000 ) ) );
			geometry.vertices.push( new THREE.Vertex( new THREE.Vector3( 0, 0, z ) ) );
			var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0xeeeeee } ) );
			line.position.x = x;
			line.position.y = y;
			scene.add( line );

		}

		placeTarget(-150,-150,-550);
		placeTarget(0,-150,-200);
		placeTarget(100,0,500);
		placeTarget(-150,100,0);
		placeTarget(150,-100,-1050);
		placeTarget(50,0,1100);
		placeTarget(-50,-50,600);
		placeTarget(0,150,-2100);
		placeTarget(-130,0,-700);

		renderer = new THREE.WebGLRenderer({ clearAlpha: 1 });
		renderer.setSize( window.innerWidth, window.innerHeight );

		container.appendChild( renderer.domElement );

	}

	function animate(){

		stats.begin();
		renderer.render(scene, camera);
		stats.end();

		requestAnimationFrame( animate );

	}

	// FPS測定用
	var stats = new Stats();
	stats.setMode(0); // 0: fps, 1: ms
	stats.domElement.style.left = '0px';
	stats.domElement.style.top = '0px';

	var statusContext = document.getElementById('stats');
	statusContext.appendChild( stats.domElement );

	init();
	animate();

	// Tree.jsのカメラコントロール
	headtrackr.controllers.three.realisticAbsoluteCameraControl(camera, 27, [0,0,50], new THREE.Vector3(0,0,0), {damping : 0.5});

	// 顔認識セットアップ
	var htracker = new headtrackr.Tracker();
	htracker.init(videoInput, canvasInput);

	// 顔認識スタート
	htracker.start();

	// facetrackingEventを受信したらFogを調整
	document.addEventListener('headtrackingEvent', function(event) {
		scene.fog = new THREE.Fog( 0x000000, 1+(event.z*27), 3000+(event.z*27) );
	}, false);

})();