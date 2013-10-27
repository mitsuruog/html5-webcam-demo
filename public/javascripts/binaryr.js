var BinaryReceiver = function BinaryReceiver(binaryClient) {

	if (binaryClient === void 0) {
		throw new Error('binaryStream is empty');
	}

	var outputStream = document.getElementById('outputStream');
	var outputStreamContext = outputStream.getContext('2d');
	var outputStreamSize = {
		width: outputStream.width,
		height: outputStream.height
	};
	var imageFrame = outputStreamContext.getImageData(0, 0, outputStreamSize.width, outputStreamSize.height);
	var dataLength = imageFrame.data.length;

	binaryClient.on('stream', function (stream, meta) {

		if (meta === 'fromserver') {

			stream.on('data', function (data) {

				// data is from the type 'ArrayBuffer'
				// we need to build a Uint8Array out of it
				// to be able to access the actual data

				var bytes = new Uint8Array(data);
				for (var i = 0; i < dataLength; i++) {
					imageFrame.data[i] = bytes[i];
				}
				outputStreamContext.putImageData(imageFrame, 0, 0);

			});

		}
	});

}