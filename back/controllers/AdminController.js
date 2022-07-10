'use strict'

var admin=require('../models/admin');
var bcrypt=require('bcrypt-nodejs');
var jwt=require('../helpers/jwt');

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

const loginAdmin=async function(req,res){
    var data=req.body;
    var admins=[];
    admins=await admin.find({email:data.email});
    if(admins.length==0){
        res.status(200).send({message:'No se encontro el correo',data:undefined});
    }else{//login
        let user=admins[0];
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
    registroAdmin,
    loginAdmin
}