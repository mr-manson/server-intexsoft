const {Sequelize} = require('sequelize');

const sequelize = new Sequelize( /*TODO add variables*/
    "intexsoft_courses_oleg_n",
    "oleg",
    "ndwJJ787w/ww",
    {
        dialect: "mysql",
        host: "nisnas.synology.me"
    });

const connect = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

}

module.exports = {sequelize, connect};