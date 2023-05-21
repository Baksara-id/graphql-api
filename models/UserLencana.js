"use strict"
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class UserLencana extends Model {
        static associate(models) {
            // define association here
        }
    }

    UserLencana.init({
        user_id: {
            type: DataTypes.INTEGER,
        },
        lencana_id: {
            type: DataTypes.INTEGER,
        },
    }, {
        sequelize,
        modelName: "UserLencana",
        tableName: "user_lencana",
        // timestamps: true,
    });

    UserLencana.removeAttribute('id');

    return UserLencana;

}