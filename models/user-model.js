const {sequelize} = require("../db/db");
const {DataTypes} = require("sequelize");

const UserModel = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isActivated: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        activationLink: {
            type: DataTypes.STRING,
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
    }
);

(async () => {
    await UserModel.sync({alter: true})
})();

module.exports = UserModel;