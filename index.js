//App en ES5 en
const express = require('express');
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

//peticion de index
app.get('/set-cookie', (req, res) => {
    var query = url.parse(req.url, true).query;
    if(!query || !query.nombre || !query.valor){
        res.send(`{error:'set-cookie: falta nombre ó valor'`)
        return;
    }
    res.setHeader('Set-Cookie', cookie.serialize(query.nombre, query.valor, { maxAge: query.tiempo, path: '/' }));
    res.status(200).send('Cookie guardada' + query.tiempo);
});

app.get('/clear-cookie', (req, res) => {
    var query = url.parse(req.url, true).query;
    if(!query || !query.nombre){
        res.send(`{error:'set-cookie: falta nombre'`)
        return;
    }
    res.clearCookie(query.nombre);
    res.status(200).send('Cookie eliminada');
});

app.get('/get-cookies', (req, res) => {
    res.send(req.cookies);
});

//Levantamos el server
app.listen(PORT, () => {
    console.log(`Server trabajando en http://localhost:${PORT}`);
})