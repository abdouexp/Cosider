const LocalStrategy=require('passport-local').Strategy;
const config = require('../config/config');
const bcrypt = require('bcryptjs');
//const User = require('../models/user');
const { sequelize, User, Post, demande, listedemande, commande, listecommande, paiement, reception, listereception, remise } = require('../models');
module.exports=function(passport){
//LOCAL SIGNIN
passport.use('local', new LocalStrategy(
    {   // by default, local strategy uses username and password, we will override with username
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
 
    function(req, username, password, done) {
 
        const isValidPassword = function(userpass, password) {
            return bcrypt.compareSync(password, userpass);
        }
        User.findOne({
            where: {
                username: username
            }
        }).then(function(user) {
            if (!user) {
                return done(null, false, {
                    message: 'Aucun compte correspondant. '
                });
            }
            if (!isValidPassword(user.password, password)) {
                console.log('password invalid');
                return done(null, false, {
                    message: 'Mot de passe erroné.'
                });
            }
            const userinfo = user.get();
            return done(null, userinfo);
        }).catch(function(err) {
 
            console.log("Error:", err);
 
            return done(null, false, {
                message: 'Something went wrong with your Signin'
            });
 
        });
 
 
    }
 
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});   
passport.deserializeUser(function(id, done) {
    User.findByPk(id).then(function(user) {
        if (user) {
            done(null, user.get());
        } else {
            done(user.errors, null);
        }
    });
 
});
}