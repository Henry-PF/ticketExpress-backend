const { Router } = require("express");
const router = Router();
const { login, Register } = require("../handlers/authHandler");
const passport = require("passport");

router.post("/login", login);
router.post("/register", Register);

router.get('/google',
    passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/callback', passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('http://localhost:3000')
        res.json(req.user)
    });

module.exports = router;