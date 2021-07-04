const express=require('express');
const bcrypt = require('bcrypt');
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');

const userRegister = (req,res,next)=>{
   bcrypt.hash(req.body.password,10,(err,hash)=>{
    if(err){
        console.log(err);
    }
    const user = new User({
           name:req.body.name,
           email:req.body.email,
           password:hash
       });
       user.save()
       .then(result=>{
          const accesstoken =  jwt.sign({id:user._id},'secretToken',{
            expiresIn:"1d"
           });
           res.cookie('jwt',accesstoken,{httpOnly:true,maxAge:3600000});
           res.redirect('/blog/allblogs');
           console.log(`registration successfull token: ${accesstoken}`);
       })
       .catch(err=>{
           console.log(err);
       })
   })
}

const userLogin = (req,res,next)=>{
      const email = req.body.email;
      const password =req.body.password;
      User.findOne({email})
      .then(user=>{
          if(user){
              bcrypt.compare(password,user.password,(err,result)=>{
                  if(err){
                      console.log(err);
                  }
                  if(result){
                    const accesstoken =  jwt.sign({id:user._id},'secretToken',{
                       expiresIn:"1d"
                         });
                       res.cookie('jwt',accesstoken,{httpOnly:true,maxAge:3600000});
                       res.redirect('/blog/allblogs');
                       //res.send({message:`login successfull`});
                  }else{
                      res.send({message:"incorrect password"});
                  }
              })
          }else{
              res.send({message:"user not found"});
          }
      })
}

module.exports = {
    userLogin,
    userRegister
}
