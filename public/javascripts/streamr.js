(function () {

	//
	var wsEndpoint = 'ws://' + location.hostname + ':9000';
	var binaryClient = new BinaryClient(wsEndpoint);

	// the stream is ready
	binaryClient.on('open', function (stream) {

		binaryClient.createStream(stream, 'toserver');
		console.log('binary opened.');

	});

	var binaryReceiver = new BinaryReceiver(binaryClient);

})();