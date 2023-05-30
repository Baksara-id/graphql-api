"use strict"
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Lencana extends Model {
        static associate(models) {
            // define association here
        }
    }

    Lencana.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true, // Mark 'id' as the primary key
            autoIncrement: true,
        },
        nama: DataTypes.STRING,
        url_gambar: DataTypes.STRING,
    }, {
        sequelize,
        modelName: "Lencana",
        timestamps: true,
        tableName: "lencanas",
    });

    Lencana.associate = (models) => {
        Lencana.belongsToMany(models.User, {
            through: models.UserLencana,
            foreignKey: "lencana_id",
            as: "users",
        });
    };

    return Lencana;

}