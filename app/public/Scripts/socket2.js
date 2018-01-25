$('#enviar_mensagem').click(function () {

	socket.emit(
		'msgTeste',
		{
			apelido: $('#apelido').val(),
			mensagem: $('#mensagem').val(),
			apelido_atualizado_nos_clientes: $('#apelido_atualizado_nos_clientes').val()
		}
	);

	$('#mensagem').val("");
	$('#apelido_atualizado_nos_clientes').val(1);
});


window.scrollTo(0, document.body.scrollHeight);
$('.input').keypress(function (e) {
	if (e.which == 13) {
		socket.emit(
			'msgTeste',
			{
				apelido: $('#apelido').val(),
				mensagem: $('#mensagem').val(),
				apelido_atualizado_nos_clientes: $('#apelido_atualizado_nos_clientes').val()
			}
		);

		$('#mensagem').val("");
		$('#apelido_atualizado_nos_clientes').val(1);
	}
});


socket.on('msgDoOperador', function (data) {
	var html = '';

	html += '<div class="dialogo msgClient">';
	html += '<span class="imgCliente">' + '</span>';
	html += '<span class="arrowCliente">' + '</span>';
	html += '<h4>' + data.apelido + '</h4>';
	html += '<p>' + data.mensagem + '</p>';
	html += '</div>';

	$('#dialogos').append(html);

	window.scrollTo(0, document.body.scrollHeight);
});

socket.on('msgDoCliente', function (data) {
	var html = '';

	html += '<div class="dialogo msgBot">';
	html += '<span class="imgCliente">' + '</span>';
	html += '<span class="arrowBot">' + '</span>';
	html += '<h4>' + data.apelido + '</h4>';
	html += '<p>' + data.mensagem + '</p>';
	html += '</div>';

	$('#dialogos').append(html);

	window.scrollTo(0, document.body.scrollHeight);
});

socket.on('clienteEspera', function (data) {
	var html = '';

	html += '<div class="dialogo msgBot">';
	html += '<span class="imgCliente">' + '</span>';
	html += '<span class="arrowBot">' + '</span>';
	html += '<p>' + data.apelido + data.mensagem + '</p>';
	html += '</div>';
	$('#dialogos').append(html);

	window.scrollTo(0, document.body.scrollHeight);
});

//Receber lista de clientes
socket.on('clients', clients =>{
	console.log(clients)
	//Lista de clientes aqui
})
