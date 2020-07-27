const express = require('express');
const router = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
    console.log('user:',req.session.currentUser)
    if(req.session.currentUser){
        const userName = req.session.currentUser.username;
        res.render('index', {userName})
    }
    res.render('index')
});

router.use( (req, res, next) => {
    if(req.session.currentUser){
        next()
    } else {
        res.redirect('/login')
    }
})

router.get('/main', (req, res, next) => {
    res.render('main');
})

router.get('/private', (req, res, next) => {
    res.render('private');
})

router.get("/logout", (req, res, next) => {
    req.session.destroy((err) => {
      // si no puede acceder a los datos de sesión, redirige a /login
      res.redirect("/login");
    });
  });

module.exports = router;
