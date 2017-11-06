var express = require('express');
var router = express.Router();
var roomModel = require('../db/RoomModel');

router.get('/:id', function (req, res) {
    var id = req.params.id;
    if (isNaN(id)) {
        res.status(404).send('Not found');
        return;
    }

    roomModel.findById(id).then(function(room) {
        res.json(room);
    });
});

router.get('/', function (req, res) {
    roomModel.findAll().then(function(rooms) {
        res.json(rooms);
    })
});

router.post('/', function (req, res) {
    var roomname = req.body.name;
    if (!roomname) {
        res.status(404).send('Not found');
    } else {
        roomModel.create({
            name: roomname,
            chatHistory: []
        }).then(function(newRoom) {
            res.json(newRoom);
        }).catch(function(err) {
            console.log(err);
            res.status(422).send('Name is not unique');
        });
    }
});

module.exports = router;