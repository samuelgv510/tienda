'use strict'

var cliente=require('../models/cliente');

const registroCliente=async function(req,res){
    res.status(200).send({message:'Hola mundo'});
}

module.exports={
    registroCliente
}