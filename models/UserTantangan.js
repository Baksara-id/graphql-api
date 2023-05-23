"use strict"
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class UserTantangan extends Model {
        static associate(models) {
            // define association here
        }
    }

    UserTantangan.init({
        // id: {
        //     type: DataTypes.INTEGER,
        //     primaryKey: true, // Mark 'id' as the primary key
        //     autoIncrement: true,
        // },
        user_id: {
            type: DataTypes.INTEGER,
        },
        tantangan_id: {
            type: DataTypes.INTEGER,
        },
        is_approved: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        jawaban: {
            type : DataTypes.TEXT,
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: "UserTantangan",
        tableName: "user_tantangan",
        timestamps: true,
    });

    UserTantangan.removeAttribute('id');

    return UserTantangan;
}