const express = require('express');
const http = require('http');
const join = require('path').join;
const rutes = require("./rutes");

// Setup
const app = express();
const server = http.createServer(app);

// Config
const PORT = process.env.PORT || 1403;

// rutes
rutes(app);

server.listen(PORT, () => {
    console.log("Server active");
})