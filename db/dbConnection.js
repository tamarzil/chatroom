const Sequelize = require('sequelize');

const sequelize = new Sequelize('chatrooms', 'chatrooms', '123456', {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = {
    sequelize: sequelize,
    Sequelize: Sequelize
};