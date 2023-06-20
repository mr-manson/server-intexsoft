const {sequelize} = require("../db/db");
const {DataTypes} = require("sequelize");
const Style = require("./style-model");
const User = require("./user-model");

const ArtistModel = sequelize.define("Artist", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        artistName: {
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

/* TODO - связи */

Style.hasMany(ArtistModel, {
    foreignKey: {
        allowNull: false,
    }
});
ArtistModel.belongsTo(Style);

/*(async () => {
    await ArtistModel.sync({force: true})
})();*/

module.exports = ArtistModel;