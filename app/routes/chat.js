module.exports= function(app){
app.get('/chat', function(req ,res){
	var dadosForm = req.body;




		app.get('io').emit(
			'msgParaCliente',
			{apelido: dadosForm.apelido, mensagem: ' acabou de entrar no chat'}
		)

		res.render("chat", {dadosForm : dadosForm});

});
app.post('/chat', function(req ,res){
	var dadosForm = req.body;



     var list = [];
		 app.set('list', list);
     list.push(dadosForm);
     
		res.render("chat", {dadosForm : list[0]});


		app.get('io').emit(
			'clienteEspera',
			{apelido: dadosForm.apelido, mensagem: '<b>Cliente esperando atendimento'}
		)


});
}
