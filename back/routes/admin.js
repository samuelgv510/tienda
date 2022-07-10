'use strict'

var express=require('express');
var adminController=require('../controllers/AdminController');

var api=express.Router();
api.post('/registroAdmin',adminController.registroAdmin);
module.exports=api;