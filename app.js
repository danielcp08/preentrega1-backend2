const express = require('express');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const initializePassport = require('./config/passport.config');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

initializePassport();

app.use('/api/sessions', require('./routes/sessions.router'));

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
});