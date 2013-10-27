// 9000ポートで開始
var BinaryServer = require('binaryjs').BinaryServer,
	binaryServer = BinaryServer({
		port: 9000
	});

var clients = [];

exports.start = function () {

	binaryServer.on('connection', function (client) {

		client.on('stream', function (stream) {

			clients.push(client);

			//var responseStream = client.createStream('fromserver');
			//responseStream.write(data);

//			// broadcast to all other clients
//			for (var id in binaryServer.clients) {
//				if (binaryServer.clients.hasOwnProperty(id)) {
//					var otherClient = binaryServer.clients[id];
//					if (otherClient != client) {
//						var responseStream2 = client.createStream('fromserver');
//						stream.pipe(responseStream2);
//					}
//				}
//			}

			// pipe didnt work :(
			stream.on('data', function (data) {

				clients.forEach(function(client) {
					var responseStream = client.createStream('fromserver');
					responseStream.write(data);
				});

			});

		});

	});

};
