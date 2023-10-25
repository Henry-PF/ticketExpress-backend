const { Router } = require("express");
const router = Router();
const { login, Register } = require("../handlers/authHandler");
const passport = require("passport");

router.post("/login", login);
router.post("/register", Register);

router.get('/google',passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/callback', passport.authenticate('google', { failureRedirect: '/login' }),function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('http://localhost:3000');
 });
router.get('/perfil', (req, res) => {
    if (req.isAuthenticated()) {
        const user = req.user;
        res.cookie('userData', JSON.stringify(user));
        res.redirect('http://localhost:3000');
    }
});
module.exports = router;