const {sequelize} = require("../db/db");
const {DataTypes, Sequelize} = require("sequelize");
const trace_events = require("trace_events");

const Token = sequelize.define("Token", {
            user: {
                type: DataTypes.STRING,
                default: false,
            },
            refreshToken: {
                type: DataTypes.STRING,
                require: true,
            },
        },
        {
            timestamps: false,
            freezeTableName: true,
        }
    )
;

/*sequelize.sync({force: true});*/

module.exports = Token;