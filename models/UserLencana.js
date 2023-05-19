"use strict"
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class UserLencana extends Model {
        static associate(models) {
            // define association here
        }
    }

    UserLencana.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true, // Mark 'id' as the primary key
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
        },
        lencana_id: {
            type: DataTypes.INTEGER,
        },
    }, {
        sequelize,
        modelName: "UserLencana",
        timestamps: true,
    });

    UserLencana.removeAttribute('id');

    return UserLencana;

}