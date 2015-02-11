var http = require('http'),
	sniffer = require('./sniffer');


var server = http.createServer(function(req, res){
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('hola mundo\n');
});

sniffer.sniffOn(server);
server.listen(3000);