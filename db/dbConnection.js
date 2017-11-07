const Sequelize = require('sequelize');

var sequelize = null;
if (process.env.DATABASE_URL) {
    // Heroku config
    sequelize = new Sequelize(process.env.DATABASE_URL);
} else {
    // local config
    sequelize = new Sequelize('chatrooms', 'chatrooms', '123456', {
        host: 'localhost',
        dialect: 'postgres'
    });
}

/*
 if (process.env.HEROKU_POSTGRESQL_BRONZE_URL) {
 // the application is executed on Heroku ... use the postgres database
 sequelize = new Sequelize(process.env.HEROKU_POSTGRESQL_BRONZE_URL, {
 dialect:  'postgres',
 protocol: 'postgres',
 port:     match[4],
 host:     match[3],
 logging:  true //false
 })
 } else {
 // the application is executed on the local machine ... use mysql
 sequelize = new Sequelize('example-app-db', 'root', null)
 }
 */

module.exports = {
    sequelize: sequelize,
    Sequelize: Sequelize
};