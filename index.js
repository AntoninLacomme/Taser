const PORT = 8000;

const express = require('express');
const app = express();
const http = require("http").Server (app);
http.listen (PORT, () => {
    console.log (`Server started on 127.0.0.1:${PORT}`)
});

app.use(express.static(__dirname + "/public/"));

app.get ("/", (req, res) => { res.sendFile ("index.html"); });