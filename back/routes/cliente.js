'use strict'

var express=require('express');
var clienteController=require('../controllers/ClienteController');

var api=express.Router();
api.post('/registroCliente',clienteController.registroCliente);
module.exports=api;