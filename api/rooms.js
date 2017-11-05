var express = require('express');
var router = express.Router();

var lastId = 5;
var tempRooms = [
    { id: 1, name: 'News', chatHistory: {} },
    { id: 2, name: 'Entertainment', chatHistory: {} },
    { id: 3, name: 'Sports', chatHistory: {} },
    { id: 4, name: 'Health', chatHistory: {} },
    { id: 5, name: 'Donald Trump', chatHistory: {} }
];

var isNameExist = function(name) {
    return tempRooms.some(function(room) {
        console.log('checking ' + room.name + ' with ' + name);
        return room.name == name;
    })
};

router.get('/:id', function (req, res) {
    var id = req.params.id; // verify it's a number
    res.json(tempRooms[parseInt(id) - 1]);
    // change code here to query DB based on id.
});

router.get('/', function (req, res) {
    res.json(tempRooms);
    // change code here to query DB.
});

router.post('/', function (req, res) {
    var roomname = req.body.name;
    var newRoom = {};
    if (!roomname)
        res.status(404).send('Not found');
    else if (isNameExist(roomname))
        res.status(422).send('Name is not unique');
    else {
        newRoom = { id: ++lastId, name: roomname, chatHistory: {}};
        tempRooms.push(newRoom);
        res.json(newRoom);
    }
});

module.exports = router;