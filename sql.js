const Sequelize = require('sequelize');
const conf = require('./conf/back');
const sequelize = new Sequelize(conf.sqlBase, conf.sqlLogin, conf.sqlPass, {
    host: conf.sqlServ,
    port: conf.sqlPort,
    dialect: 'postgres',
    logging: false
});


sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize