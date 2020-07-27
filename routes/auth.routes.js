const express = require("express");
const router = express.Router();

// User model

const User = require('../models/User.model');

// Bcrypt to encrypt passwords
const bcrypt = require("bcryptjs");
const app = require("../app");
const bcryptSalt = 10;

router.get('/signup', (req, res, next) => {
    res.render('auth/signup');
})

router.post('/signup', (req, res, next) => {
    const { name, username, password } = req.body;

    console.log(req.body)

    if (username === "" || password === "" || name === "") {
        res.render('auth/signup', {
            errorMessage: "Fields cannot be empty"
        });
        return;
    }

    User.findOne({ username })
        .then(user => {

            if(user !== null){
                res.render('auth/signup', {
                    errorMessage: "Username already exists"
                });

                return;
            }

            const salt = bcrypt.genSaltSync(bcryptSalt);
            const hashPass = bcrypt.hashSync(password, salt);

            User.create({username, password: hashPass, name})
                .then(() => {
                    res.redirect('/login')
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        .catch((error) => {
            next(error);
        });
})

router.get('/login', (req, res, next)=> {
    res.render('auth/login');
})

router.post('/login', (req, res, next)=> {
    const { username, password } = req.body;

    if (username === "" || password === "") {
        res.render('auth/login', {
            errorMessage: "Fields cannot be empty"
        });
        return;
    }

    User.findOne({username: username})
        .then( (user) => {
            if(!user){
                res.render('auth/login', {
                    errorMessage: "The username doesn't exist"
                });
                return;
            }

            if (bcrypt.compareSync(password, user.password)){
                req.session.currentUser = user;
                const name = req.session.currentUser.name;

                res.render('index', {name});
                
            } else {
                res.render('auth/login', {
                    errorMessage: "The password is incorrect"
                });
            }
        })
        .catch(err => {
            next(err)
        })
})

module.exports = router;