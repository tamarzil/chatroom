const request = require('request');

module.exports = function (text, callback) {

    request('http://www.purgomalum.com/service/json?text=' + encodeURI(text), { json: true },
        function (err, res, body) {
            if (body && body.result) {
                callback(body.result);
                return;
            }

            if (err) {
                console.log(err);
            }

            callback(text);    // failure to filter profanities should not fail message post
        });
};