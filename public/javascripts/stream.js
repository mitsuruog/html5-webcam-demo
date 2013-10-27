(function () {

	var videoInput = document.getElementById('video');

	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
	window.URL = window.URL || window.webkitURL || window.msURL || window.mozURL;

	//
	var inputStream = document.getElementById('inputStream');
	var inputStreamContext = inputStream.getContext('2d');
	var inputStreamSize = {
		width: inputStream.width,
		height: inputStream.height
	};

	//
	var wsEndpoint = 'ws://' + location.hostname + ':9000';
	var binaryClient = new BinaryClient(wsEndpoint);
	var videoStream;
	var streamData;
	var streamRate = 100;

	// the stream is ready
	binaryClient.on('open', function (stream) {

		videoStream = binaryClient.createStream(stream, 'toserver');

	});

	//streamするためのループ
	var streamLoop = function streamLoop() {

		inputStreamContext.drawImage(videoInput, 0, 0, inputStreamSize.width, inputStreamSize.height);
		streamData = inputStreamContext.getImageData(0, 0, inputStreamSize.width, inputStreamSize.height);

		if (typeof videoStream !== 'undefined') {
			videoStream.write(streamData.data);
		}
		setTimeout(streamLoop, streamRate);

	};
	streamLoop();

	if (navigator.getUserMedia) {
		var videoSelector = {video: true};
		navigator.getUserMedia(videoSelector, function (stream) {

			videoInput.src = window.URL.createObjectURL(stream);

		}, function (e) {
			alert('エラー');
		});
	}

	var binaryReceiver = new BinaryReceiver(binaryClient);

})();