var db = require('./dbConnection');

const Room = db.sequelize.define('room', {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: db.Sequelize.STRING,
        unique: true
    },
    chatHistory: {
        type: db.Sequelize.JSON
    }
});

Room.sync().then(function() {
    // Table created
    console.log('Rooms table created if not existed');
});

module.exports = Room;