(function(){

	// Camera入力用
	var videoInput = document.getElementById('video');

	// 描画用
	var canvasOverlay = document.getElementById('overlay');
	var overlayContext = canvasOverlay.getContext('2d');

	// 顔特徴認識セットアップ
	var ctracker = new clm.tracker({
		useWebGL : true
	});
	ctracker.init(pModel);

	// FPS測定用
	var stats = new Stats();
	stats.setMode(0); // 0: fps, 1: ms
	stats.domElement.style.left = '0px';
	stats.domElement.style.top = '0px';

	var statusContext = document.getElementById('stats');
	statusContext.appendChild( stats.domElement );

	// Videoセットアップ
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
	window.URL = window.URL || window.webkitURL || window.msURL || window.mozURL;

	// カメラが使えるかチェック
	if (navigator.getUserMedia) {

		// Videoストリームセットアップ
		var videoSelector = {
			video : true
		};

		navigator.getUserMedia(videoSelector, function( stream ) {
      videoInput.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
		}, function() {
			var messagep = document.getElementById('message');
			messagep.innerHTML = 'Webカメラにてなんらかのトラブルが発生しているようです。';
		});

	} else {
		var messagep = document.getElementById('message');
		messagep.innerHTML = 'このブラウザではカメラAPIがサポートされていません。';
	}

	// Videoが再生可能な場合、顔特徴認識スタート
	videoInput.addEventListener('canplay', function(){

		// Video再生
		videoInput.play();
		// 顔特徴認識スタート
		ctracker.start(videoInput);
		// 描画開始
		drawLoop();

	}, false);

	//　描画用のループ
	function drawLoop() {

		stats.begin();
		overlayContext.clearRect(0, 0, canvasOverlay.width, canvasOverlay.height);
		ctracker.draw(canvasOverlay);
		stats.end();

		requestAnimationFrame(drawLoop);

	}

})();