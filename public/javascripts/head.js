(function(){

	// Camera入力用
	var videoInput = document.getElementById('video');

	//
	var canvasInput = document.getElementById('compare');

	// FPS測定用
	var stats = new Stats();
	stats.setMode(0); // 0: fps, 1: ms
	stats.domElement.style.left = '0px';
	stats.domElement.style.top = '0px';

	var statusContext = document.getElementById('stats');
	statusContext.appendChild( stats.domElement );

	// 短径描画用
	var canvasOverlay = document.getElementById('overlay');
	var overlayContext = canvasOverlay.getContext('2d');

	// デバック描画用
	var debugOverlay = document.getElementById('debug');

	// 顔認識セットアップ
	var htracker = new headtrackr.Tracker({
		calcAngles : true,
		ui : false,
		headPosition : false,
		debug : debugOverlay
	});
	htracker.init(videoInput, canvasInput);

	// 顔認識スタート
	htracker.start();

	// ステータス用メッセージ
	statusMessages = {
		"whitebalance" : "カメラのホワイトバランスをチェックしています...",
		"detecting" : "顔を検出中...",
		"hints" : "顔検出に時間が掛かっているようです...",
		"redetecting" : "顔検出に失敗しました。再検出してください。",
		"lost" : "顔検出に失敗しました。",
		"found" : "顔検出しています。"
	};

	// カメラサポート用メッセージ
	supportMessages = {
		"no getUserMedia" : "このブラウザではカメラAPIがサポートされていません。",
		"no camera" : "カメラが見つかりませんでした。カメラを接続してください。"
	};

	// headtrackrStatusEventを受信したら画面にステータスを表示する
	document.addEventListener("headtrackrStatus", function(event) {
		if (event.status in supportMessages) {
			var messagep = document.getElementById('message');
			messagep.innerHTML = supportMessages[event.status];
		} else if (event.status in statusMessages) {
			var messagep = document.getElementById('status');
			messagep.innerHTML = statusMessages[event.status];
		}
	}, true);

	// facetrackingEventを受信したらCanvasに描画する
	document.addEventListener("facetrackingEvent", function( event ) {

		stats.begin();

		// Canvasクリア
		overlayContext.clearRect(0, 0, 320, 240);

		// トラッキングが安定したら短径を描画する
		if (event.detection == "CS") {
			overlayContext.translate(event.x, event.y);
			overlayContext.rotate(event.angle-(Math.PI/2));
			overlayContext.strokeStyle = "#00CC00";
			overlayContext.strokeRect((-(event.width/2)) >> 0, (-(event.height/2)) >> 0, event.width, event.height);
			overlayContext.rotate((Math.PI/2)-event.angle);
			overlayContext.translate(-event.x, -event.y);
		}

		stats.end();

	});

	// 確立分布マップ表示用
	var button = document.getElementById('debugToggle');
	button.addEventListener("click", function( event ) {

		event.preventDefault();

		var debugCanvas = document.getElementById('debug');
		if (debugCanvas.classList.contains('hide')) {
			debugCanvas.classList.remove('hide');
			canvasOverlay.classList.add('hide');
		} else {
			canvasOverlay.classList.remove('hide');
			debugCanvas.classList.add('hide');
		}
	});

})();