"use strict"
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Cerita extends Model {
        static associate(models) {
            // define association here
        }
    }

    Cerita.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true, // Mark 'id' as the primary key
            autoIncrement: true,
        },
        judul: DataTypes.STRING,
        deskripsi: DataTypes.TEXT,
        url_isi: DataTypes.STRING,
        url_gambar: DataTypes.STRING,
    }, {
        sequelize,
        modelName: "Cerita",
        timestamps: true,
        tableName: "ceritas",
    });


    return Cerita;
}