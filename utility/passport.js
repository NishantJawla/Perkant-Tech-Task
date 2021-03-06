const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = require('../models/user');
const secret = require('./secret');
const keys = secret.SECRET;
const opts ={};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secret.SECRET;

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload,done) => {
        User.findById(jwt_payload.id).then((user) => {
            if(user) {
                return done(null, user);
            }
            return done(null,null);
        }).catch((error) => {
            console.log(error);
        })
    }));
}