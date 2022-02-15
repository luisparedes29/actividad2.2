var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var eliminarPacienteRouter = require('./routes/eliminar-paciente');
var pacientesNuevosRouter = require('./routes/pacientes-nuevos');
var verRouter = require('./routes/listar-pacientes');
var cambiarDatosRouter= require('./routes/cambiar-datos');
var pacienteUciRouter= require('./routes/nuevo-paciente-uci');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/listar-pacientes', verRouter);
app.use('/eliminar-paciente', eliminarPacienteRouter);
app.use('/pacientes-nuevos', pacientesNuevosRouter);
app.use('/cambiar-datos',cambiarDatosRouter);
app.use('/nuevo-paciente-uci',pacienteUciRouter);

module.exports = app;
