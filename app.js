/* importar as configurações do servidor */
var app = require('./config/server');

// importar o package request
const request = require('request');

//conversation params api

/* parametrizar a porta de escuta */
var server = app.listen(80, function(){
	console.log('Servidor online');
});


// função que busca o cep, utilizando a api do viacep




var io = require('socket.io').listen(server);

app.set('io', io);



/* criar a conexão por websocket */
io.on('connection', function(socket){

	console.log('Usuário conectou');

	socket.on('disconnect', function(){
		console.log('Usuário desconectou');
	});

	socket.on('msgParaServidor', function(data){
		  var msgCliente = data.mensagem;

		/* dialogo */
		socket.emit(
			'msgParaCliente',
			{apelido: data.apelido, mensagem: data.mensagem}
		);

		//


		/* participantes */
		if(parseInt(data.apelido_atualizado_nos_clientes) == 0){
			socket.emit(
				'participantesParaCliente',
				{apelido: data.apelido}
			);

			socket.broadcast.emit(
				'participantesParaCliente',
				{apelido: data.apelido}
			);
		}
	});

});
