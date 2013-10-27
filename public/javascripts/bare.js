(function () {

	var videoInput = document.getElementById('video');

	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
	window.URL = window.URL || window.webkitURL || window.msURL || window.mozURL;

	if (navigator.getUserMedia) {
		var videoSelector = {video: true};
		navigator.getUserMedia(videoSelector, function (stream) {

			videoInput.src = window.URL.createObjectURL(stream);

		}, function (e) {
			alert('エラー');
		});
	}

})();