'use strict';

var geocoder = require('../lib/geocoder'),
    test = require('tape');

test('autocomplete', function (t) {
    geocoder().autocomplete('ågestav', function (err, res) {
        t.error(err);
        t.equal(res.length, 2);
        t.equal(res[0], 'Ågestavägen, Huddinge, Sweden');
        t.equal(res[1], 'Ågestaverket, Vidjavägen, Agesta, Sweden');
        t.end();
    });
});

test('autocomplete no match', function (t) {
    geocoder().autocomplete('q34rasdf', function (err, res) {
        t.error(err);
        t.equal(res.length, 0);
        t.end();
    });
});

test('geocode', function (t) {
    geocoder().geocode('Ågestaväg', function (err, res) {
        t.error(err);
        t.equal(res.address, 'Ågestavägen, Huddinge, Sweden');
        t.same(res.location, { lat: 59.2338676, lng: 18.040265 });
        t.same(res.viewport, {
            northeast: { lat: 59.2506017, lng: 18.0851486 },
            southwest: { lat: 59.2272261, lng: 18.008966 }
        });
        t.end();
    });
});

test('geocode no match', function (t) {
    geocoder().geocode('23jkh42', function (err, res) {
        t.error(err);
        t.equal(res, undefined)
        t.end();
    });
});