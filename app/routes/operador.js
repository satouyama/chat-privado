module.exports = function(app){

 app.get('/operador', function(req,res) {
      res.render('operador');
 });

 app.post('/operador', function(req,res) {
      var dadosForm = {
         apelido : 'Operador',
         email : null
      }
      console.log(dadosForm);
      res.render('operador-chat',{dadosForm : dadosForm});
 });
}
