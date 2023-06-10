const {sequelize} = require("../db/db");
const {DataTypes, Sequelize} = require("sequelize");

const Task = sequelize.define("Test", {
            content: {
                type: DataTypes.STRING,
                validate: {
                    max: 150,
                },
            },
            description: DataTypes.TEXT,
            is_complete: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            }
        },
        {
            timestamps: false,
            freezeTableName: true,
        }
    )
;

/*sequelize.sync({force: true});*/

module.exports = Task;