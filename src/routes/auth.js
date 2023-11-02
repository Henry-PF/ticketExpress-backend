const { Router } = require("express");
const router = Router();
const { login, Register, forgoPassword} = require("../handlers/authHandler");
const passport = require("passport");

router.post("/login", login);
router.post("/register", Register);
router.post("/forgoPassword", forgoPassword);

router.get('/google',
    passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/callback', passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        const user = req.user;
        res.cookie('userData', JSON.stringify(user));
        res.redirect('https://ticketexpress.onrender.com');
    }
);

module.exports = router;