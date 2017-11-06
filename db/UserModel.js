var db = require('./dbConnection');
var bcrypt   = require('bcrypt-nodejs');

const User = db.sequelize.define('user', {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: db.Sequelize.STRING,
        unique: true
    },
    nickname: {
        type: db.Sequelize.STRING   // unique?
    },
    password: {
        type: db.Sequelize.STRING
    }
});

User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

User.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

User.sync().then(function() {
    // Table created
    console.log('User table created if not existed');
});



module.exports = User;