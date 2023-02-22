const express = require('express');
const router=express()
const passport=require('passport')
const {User} = require('../models');
router.use(express.json())
const bcrypt=require('bcryptjs')

//register new user
router.post('/users', async(req, res) => {
    const { name, email, role, username, password } = req.body
    console.log(req.body.password);
    try{
      const user = await User.create({ name, username, email, password, role })
      bcrypt.genSalt(10,function (err,salt){
       bcrypt.hash(user.password, salt, function (err, hash) {
          if (err) {
            console.log(err);
          }
  
          user.password = hash;
          user.save(function (err) {
            if (err) {
              console.log(err);
              return;
            }
          });
  
        });
       
      });
      
  
      return res.redirect('/login')
    } catch(err){
      console.log(err)
      return res.status(500).json(err)
    }
  })
  //register endpoint
  router.get('/register', function(req, res) { 
    res.render('register')
  });
  //login endpoint
  router.get('/login', function(req, res) { 
    res.render('auth')
  });
  //Authentification
  router.post('/login',async(req,res) => {
    await passport.authenticate('local', { successRedirect: '/',
                                     failureRedirect: '/login',
                                     failureFlash: true })(req,res) 
  });
  //Logging out
  router.get('/logout', function(req, res) { 
    req.logout();
    res.redirect('/login')
  });
  module.exports= router;