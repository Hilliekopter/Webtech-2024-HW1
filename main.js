#!/usr/bin nodejs
var http = require('http');
var fs = require('fs');
var app = require('express')();

const PORT = 8022;

fs.readFile('./index.html', function (err, html){

    http.createServer(function (req, res) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(html);
        res.end();
    }).listen(PORT, 'localhost');
});