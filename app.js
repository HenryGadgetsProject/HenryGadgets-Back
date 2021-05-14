const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const indexRouter = require('./src/routes')
const db = require('./db')
const cors = require('cors')

const REQUESTS =
  process.env.DATABASE_URL !== undefined
    ? "https://henrygadgets.vercel.app"
    : "http://localhost:3000";

const app = express();
app.use(cors());


app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);


//eliminar cuando hagamos deploy
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', REQUESTS);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


// Control de Errores (Error catching endware)
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
});


module.exports = app;
