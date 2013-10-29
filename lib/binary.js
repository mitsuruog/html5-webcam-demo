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

			//Streamデータ受信時
			stream.on('data', function (data) {

				clients.forEach(function(client) {
					var responseStream = client.createStream('fromserver');
					// pipe didnt work :(
					responseStream.write(data);
				});

			});

			//クライアントConnction切断時
			stream.on('close', function(){

				clients = clients.filter(function(item){
					return client.id != item.id;
				});
			});

		});

	});

};
