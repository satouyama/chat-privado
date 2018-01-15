const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const consign = require('consign');

//set view engine for ejs
app.set('view engine', 'ejs')
//set directory views
app.set('views','./app/views')
// directory static
app.use(express.static('./app/public'))
// config middlwaer body-parser
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())
// config inlclude static file on app
consign().include('./app/routes').then('config/dbConnection.js').then('app/cadastroDAO').into(app)

// export app
module.exports = app
