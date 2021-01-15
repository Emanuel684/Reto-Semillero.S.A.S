const express = require('express');
const morgan = require('morgan');
const app = express();

const vehiculos = require('./routes/vehiculos');
const tipo_linea = require('./routes/tipo_linea');
const tipo_marca = require('./routes/tipo_marca');

require('dotenv').config();

app.use(morgan('dev'));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>Bienvenido!!</h1>');
});

// Routes

app.use('/vehiculos', vehiculos);
app.use('/tipo_marca', tipo_marca);
app.use('/tipo_linea', tipo_linea);

// Fin routes

app.set('port', process.env.PORT || 4040);
app.listen(app.get('port'), () => {
    console.log(`Server on port:`,app.get('port'));
});