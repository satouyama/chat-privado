module.exports= function(app){

app.post('/chat', function(req ,res){
	var dadosForm = req.body;


		res.render("chat", {dadosForm : dadosForm});


		app.get('io').broadcast.emit(
			'clienteEspera',
			{apelido: dadosForm.apelido, mensagem: '<b>Cliente esperando atendimento'}
		)


});
}
