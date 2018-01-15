$(function(){
	socket.emit('enterchat', $('#apelido').val()) //Enviano nome assim que entrar no chat

	$('#enviar_mensagem').click(function () {

		socket.emit(
			'msgParaServidor',
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
				'msgParaServidor',
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

	socket.on('msgDoCliente', function (data) {
		var html = '';

		html += '<div class="dialogo msgCliente">';
		html += '<span class="imgCliente">' + '</span>';
		html += '<span class="arrowCliente">' + '</span>';
		html += '<h4>' + data.apelido + '</h4>';
		html += '<p>' + data.mensagem + '</p>';
		html += '</div>';

		$('#dialogos').append(html);

		window.scrollTo(0, document.body.scrollHeight);
	});

	socket.on('msgDoOperador', function (data) {
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

	//Cliente recebe aviso de novas mensagens
	socket.on('newmessage', () => {
		socket.emit('getprivate') //Cliente se comunica com o server, para o server mandar as mensagens dele
	})
})
