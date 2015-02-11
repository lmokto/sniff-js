var util = require('util'),
	url = require('url');

exports.sniffOn = function(server){
	//emitido cada ves que haya una request
	// request es una instancia de http.ServerRequest
	// response es una instancia de http.ServerResponse
	server.on('request', function(req, res){
		util.log('request');
		util.log(reqToString(req));
	});

	// llamado cuando un nuevo stream tcp es establecido
	// stream es un objeto de tipo net.Stream
	// en general los usuarios no quieren acceder a este evento
	// el stream puede tambien ser accedido en request.connection
	// var e_connection = function(stream) {}


	// emitido cuando el servidor se cierras
	server.on('close', function(errno){
		util.log('close errno='+errno);
	});

	// emitido cada vez que una request con un http exepct: 100-continue es recibida
	// si el evento no lo esta escuchando,
	// el servidor automaticamente respondera con un 100 continue como apropiado
	// manejar este evento incluye llamada a response.writecontinue
	// si el cliente debe continuar enviando el cuerpo request
	// o generando una respuesta HTTP apropiada (pe, 400 bad request)
	// si el cliente no debe continuar enviando el cuerpo request
	server.on('checkContinue', function(req, res){
		util.log('checkContinue');
		util.log(reqToString(req));
		res.writeContinue();
	});

	//emitidio cada vez que el cliente requeste una ctualizacion http
	// si el cliente no lo esta oyendo
	// entonces los clientes que han solicitado la actualizacion tendras uan conexxion cerrada

	server.on('upgrade', function(req, socket, head){
		util.log('upgrade');
		util.log(reqToString(req));
	});


	// si una conexion cliente emite un evento error, event = sera transmitido aqui
	server.on('clientError', function(){
		util.log('clientError')
	});

}

var reqToString = function(req){
	var ret = 'request ' + req.method + ' ' + req.httpVersion + ' ' + req.url + '\n';
	ret += JSON.stringify(url.parse(req.url, true)) + '\n';
	var keys = Object.keys(req.headers);
	for (var i = 0, l = keys.length; i<l;i++){
		var key = keys[i];
		ret += i + ' ' + key +': ' + req.headers[key] + '\n';
	}
	if(req.trailers)
		ret+=req.trailers+'\n';
	return ret;
}

exports.reqToString = reqToString