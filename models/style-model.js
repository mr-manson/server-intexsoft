const {sequelize} = require("../db/db");
const {DataTypes} = require("sequelize");

const StyleModel = sequelize.define("Style", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        styleName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        imgLink: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
    }
);

/*(async () => {
    await StyleModel.sync({force: true})
})();*/

module.exports = StyleModel;