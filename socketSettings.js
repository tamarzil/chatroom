module.exports = function (io) {

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
            io.sockets.in(data.room).emit('post', {nickname: data.nickname, message: data.message});
            // save msg to db.
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

        participants[room].push(name);
    };

    var removeParticipant = function (room, name) {
        if (!participants[room])
            participants[room] = [];

        const index = participants[room].indexOf(name);
        if (index > -1)
            participants[room].splice(index, 1);
    };

};