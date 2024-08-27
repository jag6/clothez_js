const express = require('express');
const { body, validationResult } = require('express-validator');
const userRouter = express.Router();
const User = require('../models/userModel');
const { generateToken, isAuth, isAdmin } = require('../utils');


//GET PAGES

//login
userRouter.get('/login', (req, res) => {
    res.render('users/login', {
        //metadata
        meta_title: 'Login',
        meta_description: 'Log in to your account',
        meta_image: 'woman-sunglasses.webp',
        meta_url: '/users/login',
        //css
        css: '',
        //script
        script: '<script type="module" src="/scripts/users/login.js" defer></script>'
    });
});

//register
userRouter.get('/register', (req, res) => {
    res.render('users/register', {
        //metadata
        meta_title: 'Register',
        meta_description: 'Register your account',
        meta_image: 'woman-sunglasses.webp',
        meta_url: '/users/register',
        //css
        css: '',
        //script
        script: '<script type="module" src="/scripts/users/register.js" defer></script>'
    });
});

//user profile
userRouter.get('/profile', async (req, res) => {
    res.render('users/profile', {
        //metadata
        meta_title: 'Profile',
        meta_description: 'View and change your user information',
        meta_image: 'woman-sunglasses.webp',
        meta_url: '/users/profile',
        //css
        css: '<link rel="stylesheet" href="/css/dashboard.css">',
        //script
        script: '<script type="module" src="/scripts/users/profile.js" defer></script>'
    });
});


//POST

//log in user
userRouter.post('/login', [
    //sanitize post data
    body('email').isEmail().normalizeEmail(),
    body('password').trim().escape()
], async (req, res) => {
    //find user in database
    const loginUser = await User.findOne({
        email: req.body.email
    });
    //redirect user or deny entry
    if(!loginUser) {
        return res.status(401).send({
            message: 'Invalid Email or Password'
        });
    }else {
        if(loginUser.validPassword(req.body.password)) {
            res.status(200).send({
                _id: loginUser._id,
                first_name: loginUser.first_name,
                last_name: loginUser.last_name,
                email: loginUser.email,
                isAdmin: loginUser.isAdmin,
                token: generateToken(loginUser)
            });
        }else {
            return res.status(400).send({
                message: 'Incorrect password, please try again'
            });
        }
    }
});

//register user
userRouter.post('/register', [
    //sanitize post data
    body('first_name').isLength({ min: 2 }).trim().escape(),
    body('last_name').isLength({ min: 2 }).trim().escape(),
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8 }).trim().escape()
], async (req, res) => {
    //validate data
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).send({
            message: 'Please re-enter your details and try again'
        });
    }

    //prepare user to be saved
    const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password
    });
    
    //hash password
    user.setPassword(req.body.password);

    //save user
    const createdUser = await user.save();
    if(!createdUser) {
        res.status(401).send({
            message: 'Invalid User Data'
        });
    }else {
        res.status(201).send({
            _id: createdUser._id,
            first_name: createdUser.first_name,
            last_name: createdUser.last_name,
            email: createdUser.email,
            isAdmin: createdUser.isAdmin,
            token: generateToken(createdUser)
        });
    }
});

module.exports = userRouter;