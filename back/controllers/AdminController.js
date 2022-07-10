'use strict'

var admin=require('../models/admin');
var bcrypt=require('bcrypt-nodejs');

const registroAdmin=async function(req,res){
    var data=req.body;
    var admins=[];
    admins=await admin.find({email:data.email});
    if(admins.length==0){
        
        if(data.password){
            bcrypt.hash(data.password,null,null,async function(err,hash){
                if(hash){
                    data.password=hash;
                    var reg=await admin.create(data);
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

module.exports={
    registroAdmin
}