const express = require('express');
const router = express.Router();
const { check, validationResult } = require("express-validator");
const passport = require('passport');
require('../utility/passport')(passport);
const {signupHandler,loginHandler} = require('../controller/user')
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

router.post('/login',[
        check("name")
        .notEmpty()
        .withMessage("Name Field is Required"),
        check("plainPassword", "password should be at least 5 character long")
        .isLength({ min: 5 })
        .notEmpty()
        .withMessage("Password Field is Required")
    ],loginHandler);

module.exports = router;