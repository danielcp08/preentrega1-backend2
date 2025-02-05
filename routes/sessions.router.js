const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
    const token = jwt.sign(
        { sub: req.user._id },
        'tu_secret_key',
        { expiresIn: '24h' }
    );

    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 horas
    });

    res.json({ status: 'success', message: 'Login exitoso' });
});

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        user: {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            age: req.user.age,
            role: req.user.role,
            cart: req.user.cart
        }
    });
});

router.post('/logout', (req, res) => {
    res.clearCookie('jwt');
    res.json({ status: 'success', message: 'Logout exitoso' });
});

module.exports = router;