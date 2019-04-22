const express = require('express');
const app = express();
const path = require('path');
const indexRoute= require('./routes/index');
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
//settings
app.set('port', 3000);
app.set('view engine', 'ejs');
app.use(indexRoute);
//app.use(require('./routes/index'))

//middlewares


//static files

app.use(express.static('public'));

app.listen(app.get('port'), ()=> {
    console.log('escuchando en el puerto 3000')

})