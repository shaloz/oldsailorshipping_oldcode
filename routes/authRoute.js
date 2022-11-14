const router = require("express").Router();
const Users = require("../models/users");
const passport = require("passport");
const localAuth = require("../authentication/localAuth");
const authFunctions = require("../functions/authfunctions");


// //user does not exist save and authenticate user
//             var newUser = new Users();
//             newUser.first_name = authFunctions.capitalize("serge");
//             newUser.last_name = authFunctions.capitalize("shalo");
//             newUser.email = "sergeshalowilson@gmail.com";
//             newUser.username = authFunctions.removeWhiteSpace("sergeshalowilson@gmail.com").toLowerCase();
//             newUser.password = newUser.encryptPassword("12");
//             newUser.save();



//SHOW LOGIN PAGE
router.get("/login", function(req, res) {
    if (req.user) {
        res.redirect('/');
    }
    else {

        res.render("main/login", { layout: false, error: req.flash('errors') });
    }
});


//LOGIN
router.post('/login', passport.authenticate('local', {
    successRedirect: '/nextpage',
    failureRedirect: '/login',
    failureFlash: true
}));


//logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});


module.exports = router
