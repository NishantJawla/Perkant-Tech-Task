const bcrypt = require('bcrypt')
require('dotenv').config();
const nodemailer = require("nodemailer");
const { check, validationResult } = require("express-validator");
const saltRounds = 10;
const jwt = require('jsonwebtoken');
var expressJwt = require("express-jwt");
const normalizeEmail = require('normalize-email');
const passport = require('passport');

const User = require('../models/user');

exports.signupHandler = (req,res)=>{
    const errors = validationResult(req);
    
if (!errors.isEmpty()) {
    return res.status(400).json({
        status: 400,
        msg: errors.array()[0].msg,
        error: errors.array()[0].msg
    });
}

    User.findOne({email:req.body.email}).exec((err,user)=>{
        if(user){
            return res.status(400).json({
                status: 400,
                msg: 'User with this email already exist!',
                error: 'User with this email already exist!',
                resCode: '109'
            })
        }
        bcrypt.hash(req.body.plainPassword, saltRounds, (err, hash) => {
            const user = new User(req.body);
            user.email = normalizeEmail(req.body.email);
            // console.log(normalizeEmail(req.body.email));
            // console.log(user.email);
            user.encryptedPassword = hash;
            
                const randString = () => {
                    const len = 64;
                    let randStr = '';
                    for(let i = 0; i<len; i++){
                        const ch = Math.floor((Math.random()*10)+1)
                        randStr += ch
                    }
                    return randStr;
                }
                const uniqueString = randString()
                user.uniqueString = uniqueString
            
        user.save((err,user) => {
            if(err){
                if(err.keyPattern.phoneNumber === 1){
                    return res.status(400).json({
                        status: 400,
                        msg: 'User with this Phone Number already exist!',
                        error: 'User with this Phone Number already exist!'
                    })
                }
            return res.status(400).json({
                    status: 400,
                    msg: 'Failed to save user',
                    error: 'Failed to save user'
                })
            }
            res.status(200).json({
                status:200,
                msg: "User Created Succesfully"
            });
        });
        });
    });
    
}