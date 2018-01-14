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

var contador = 0;


var io = require('socket.io').listen(server);

app.set('io', io);



/* criar a conexão por websocket */
io.on('connection', function(socket){

 console.log('Usuario connectou');

socket.on('disconnect', function(){
	console.log('Usuario saiu');
})

 socket.on('msgParaServidor', function(data){
	 console.log(data.mensagem);
	 socket.emit(
	 	'msgDoCliente',
	 	{apelido: data.apelido, mensagem :data.mensagem}
	 )
	 socket.broadcast.emit(
	 'msgDoCliente',
	 {apelido: data.apelido, mensagem :data.mensagem}
	)
 });

 socket.on('msgTeste', function(data){ 
		console.log(data.mensagem);
        socket.emit(
					'msgDoOperador',
					{apelido: data.apelido, mensagem :data.mensagem}
			);
			socket.broadcast.emit(
				'msgDoOperador',
				{apelido: data.apelido, mensagem :data.mensagem}
		);
 });






});



		/* dialogo */

		/* dialogo */
