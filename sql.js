const Sequelize = require('sequelize');
const sequelize = new Sequelize('kiosk_rb', 'postgres', 'postgres', {
    host: 'localhost',
    port: '5432',
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