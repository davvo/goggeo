'use strict';

var express = require('express'),
    geocoder = require('./geocoder')();

var app = express();

app.get('/autocomplete/:input', function (req, res) {
    geocoder.autocomplete(req.params.input, function (err, json) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.set('Content-Type', 'application/json');
        res.send(json);
    });
});

app.get('/geocode/:address', function (req, res) {
    geocoder.geocode(req.params.address, function (err, json) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.set('Content-Type', 'application/json');
        res.send(json);
    });
});

var port = process.argv[2] || process.env.PORT || 5000;
app.listen(port);
console.log('Listen on port', port);