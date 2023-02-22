const express = require('express');
const router=express();
router.use(express.json())

function ensurelogedin(req,res,next){
    if(req.isAuthenticated()){
      return next();
    }
    else {
      req.flash('error','Please log in');
      res.redirect('/login');
    }
  }
  
  //ensure traiteur
  function ensuretraiteur(req,res,next){
    if(req.isAuthenticated()&& req.user.role=='assistant de suivie'){
      return next();
    }
    else {
      res.render('erreur403');
    }
  };
  function ensureverificateur(req,res,next){
    if(req.isAuthenticated()&& req.user.role=='verificateur'){
      return next();
    }
    else {
      res.render('erreur403');
    }
  };
  module.exports= router;