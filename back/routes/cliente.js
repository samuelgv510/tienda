'use strict'

var express=require('express');
var clienteController=require('../controllers/ClienteController');

var api=express.Router();

api.post('/registroCliente',clienteController.registroCliente);
api.post('/loginCliente',clienteController.loginCliente);

module.exports=api;