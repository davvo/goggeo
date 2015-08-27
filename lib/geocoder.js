"use strict";

var request = require('request');

module.exports = function (options) {

    options = options || {};

    var apiKey = options.key || process.env.GOOGLE_API_KEY;

    if (!apiKey) {
        console.warn('Missing google api key');
    }

    return {
        autocomplete: function (input, callback) {
            request.get('https://maps.googleapis.com/maps/api/place/autocomplete/json', {
                qs: {
                    'input': input,
                    'key': apiKey
                }
            }, function (err, res, body) {
                if (err) {
                    return callback(err);
                }
                var json = JSON.parse(body);
                callback(null, json.predictions.map(function (item) {
                    return item.description;
                }));
            });
        },

        geocode: function (address, callback) {
            request.get('https://maps.googleapis.com/maps/api/geocode/json', {
                qs: {
                    'address': address,
                    'key': apiKey
                }
            }, function (err, res, body) {
                if (err) {
                    return callback(err);
                }
                var json = JSON.parse(body),
                    res = json.results[0];

                if (!res) {
                    return callback();
                }

                callback(null, {
                    address: res.formatted_address,
                    location: res.geometry.location,
                    viewport: res.geometry.viewport
                });
            });
        }
    }

}