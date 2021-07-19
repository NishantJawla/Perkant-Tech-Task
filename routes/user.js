const express = require('express');
const router = express.Router();
const { check, validationResult } = require("express-validator");
const passport = require('passport');
require('../utility/passport')(passport);
const {signupHandler} = require('../controller/user')
router.post('/signup',[
    check("name")
    .notEmpty()
    .withMessage("Name Field is Required")
    .isLength({ min: 4 })
    .withMessage("Name should be at least 3 char")
    .matches(/^[a-zA-Z_ ]*$/, "i")
    .withMessage("Name Field is inValid"),
    check("plainPassword")
    .isLength({ min: 5 })
    .withMessage( "Password should be at least 5 character long")
    .notEmpty()
    .withMessage("Password Field is Required")
    ],signupHandler);

    
module.exports = router;