//App en ES5 en
const express = require('express');
const session = require('express-session');
const fileStoreSession = require('session-file-store')(session);
const bodyParser = require('body-parser');
const cookie = require('cookie');
const cookieParser = require('cookie-parser');
const http = require('http');
const url = require('url');
const path = require('path');
const dotenv = require('dotenv').config();

let PORT = process.env.PORT;

//instanciamos una app de express
const app = express();

//uso de bodyParser para leer form
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    store: new fileStoreSession({
        path: path.join(__dirname, 'sessions'),
        ttl: 60
    }),
    secret: 'proyecto17',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

const isAuthenticated = (req, res, next) => {
    var query = url.parse(req.url, true).query;
    if(!query || !query.nombre){
        if(req.session && req.session.name){
            req.session.contador++;
            next();
        }else{
            res.send(`{error:'set-cookie: usuario no loggeado'}`)
        }
    }else{
        req.session.name = query.nombre;
        req.session.contador = 1;
        next();
    }
}

app.use('/', isAuthenticated);

app.get('/', (req, res) => {
    res.send(`Bienvenido ${req.session.name}, visitas: ${req.session.contador}`);
});

//Levantamos el server
app.listen(PORT, () => {
    console.log(`Server trabajando en http://localhost:${PORT}`);
})