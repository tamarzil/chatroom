var roomModel = require('./db/RoomModel');

module.exports = function (io) {

    var profanityFilter = require('./profanityCensor');

    var participants = {};
    io.on('connection', function (socket) {
        console.log('got connection...');

        socket.on('joinRoom', function (data) {
            socket.join(data.room);
            addParticipant(data.room, data.nickname);
            socket.emit('roomDetails', {participants: participants[data.room]});
            io.sockets.in(data.room).emit('userJoined', {
                nickname: data.nickname,
                participants: participants[data.room]
            });
        });

        socket.on('send', function (data) {
            profanityFilter(data.message, function(msg) {
                io.sockets.in(data.room.name).emit('post', {nickname: data.nickname, message: msg});
                persistMessage(data.room.id, {nickname: data.nickname, message: msg});
                console.log('finished handling post: ' + msg);
            });
        });

        socket.on('leaveRoom', function (data) {
            console.log('user ' + data.nickname + ' is leaving room ' + data.room);
            socket.leave(data.room);
            removeParticipant(data.room, data.nickname);
            io.sockets.in(data.room).emit('userLeft', {nickname: data.nickname, participants: participants[data.room]})
        });
    });

    var addParticipant = function (room, name) {
        if (!participants[room])
            participants[room] = [];

        if (participants[room].indexOf(name) < 0 )
            participants[room].push(name);
    };

    var removeParticipant = function (room, name) {
        if (!participants[room])
            participants[room] = [];

        const index = participants[room].indexOf(name);
        if (index > -1)
            participants[room].splice(index, 1);
    };

    var addMsg = function(existing, newMsg) {
        existing.push(newMsg);
        return existing;
    }

    var persistMessage = function(roomId, msg) {
        roomModel.findById(roomId).then(function(room) {
            room.set('chatHistory', addMsg(room.get('chatHistory'), msg));
            room.save();
        });
    };

    var isSocketInRoom = function(socketId, socketsInRoom) {
        socketsInRoom.forEach(function (client) {
            if (socketId == client.id)
                return true;
        });
        return false;
    };
};