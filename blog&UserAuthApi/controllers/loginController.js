const express=require('express');
const bcrypt = require('bcrypt');
const User = require('../models/UserModel');

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
           res.send(`registration successfull ${result}`);
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
                      res.send({message:`login successfull`});
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
