'use strict'

var cliente=require('../models/cliente');
var bcrypt=require('bcrypt-nodejs');
var jwt=require('../helpers/jwt');

const registroCliente=async function(req,res){
    var data=req.body;
    var clientes=[];
    clientes=await cliente.find({email:data.email});
    if(clientes.length==0){
        
        if(data.password){
            bcrypt.hash(data.password,null,null,async function(err,hash){
                if(hash){
                    data.password=hash;
                    //registro
                    var reg=await cliente.create(data);
                    //console.log(hash);
                    res.status(200).send({data:reg});
                }else{
                    res.status(200).send({message:'ErrorServer',data:undefined});
                }
            });
        }else{
            res.status(200).send({message:'No hay una contraseña',data:undefined});
        }  
    }else{
        res.status(200).send({message:'El correo ya existe en la base de datos',data:undefined});
    }    
}

const loginCliente=async function(req,res){
    var data=req.body;
    var clientes=[];
    clientes=await cliente.find({email:data.email});
    if(clientes.length==0){
        res.status(200).send({message:'No se encontro el correo',data:undefined});
    }else{//login
        let user=clientes[0];
        //console.log(user);
        bcrypt.compare(data.password,user.password,async function(error,check){
            if(check){
                res.status(200).send({data:user,token:jwt.createToken(user)});
            }else{
                res.status(200).send({message:'La contraseña no coincide',data:undefined});
            }
        });       
        
    }
}

module.exports={
    registroCliente,
    loginCliente
}