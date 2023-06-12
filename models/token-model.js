const {sequelize} = require("../db/db");
const {DataTypes} = require("sequelize");
const User = require("./user-model");

const TokenModel = sequelize.define("Token", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            refreshToken: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            timestamps: false,
            freezeTableName: true,
        }
    );

User.hasOne(TokenModel, {
    foreignKey: {
        allowNull: false,
    }
});
TokenModel.belongsTo(User);

/*(async () => {
    await TokenModel.sync({alter: true})
})();*/

module.exports = TokenModel;