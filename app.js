/* importar as configurações do servidor */
var app = require('./config/server');
let lastid = 0

/* parametrizar a porta de escuta */
var server = app.listen(80, function(){
	console.log('Servidor online');
});


var contador = 0;
let messages = [] //Array para mensagens privadas
let clients = [] //Array de clientes

var io = require('socket.io').listen(server);

app.set('io', io);

/* criar a conexão por websocket */
io.on('connection', function(socket){
	let id = ++lastid //Atribuindo um id ao usuario
	console.log('Usuario connectou');

	socket.on('disconnect', function(){
		console.log('Usuario saiu');
	})

	// socket do cliente
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

	//socket do Operador
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

	socket.on('private', data => {
		//Adicionando mensagem privada no array
		messages.push({
			from: id,
			to: data.to,
			message: data.message
		})

		socket.broadcast.emit('newmessage') //Avisa a todos que tem novas mensagens
	})

	socket.on('getprivate', () => {
		let msg = messages.find(m => m.from == id) //Busca a mensagem que foi destinado ao id dele
		socket.emit('msgDoOperador', {apelido: 'Operador', mensagem: msg.message}) //To usando emit, então vai apenas pro cliente que pediu
	})

	//Para pegar a lista de clientes
	socket.on('getclients', () => {
		socket.emit('clients', clients)
	})

	socket.on('disconnect', () => {
		clients = clients.filter(x => x.id != id)
	})

	//Evento para pegar os dados do cliente ao se conectar
	socket.on('enterchat', name => {
		clients.push({
			id,
			name
		})
	})

});



/* dialogo */

/* dialogo */
