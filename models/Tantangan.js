"use strict"
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Tantangan extends Model {
        static associate(models) {
            // define association here
        }
    }

    Tantangan.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true, // Mark 'id' as the primary key
            autoIncrement: true,
        },
        nama: DataTypes.STRING,
        exp: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        soal: DataTypes.TEXT,
        pertanyaan: DataTypes.TEXT,
        kunci_jawaban: DataTypes.TEXT,
        url_gambar: DataTypes.STRING,
    }, {
        sequelize,
        modelName: "Tantangan",
        timestamps: true,
    });

    Tantangan.associate = (models) => {
        Tantangan.belongsToMany(models.User, {
            through: models.UserTantangan,
            foreignKey: "tantangan_id",
            as: "users",
        });
    };

    return Tantangan;
}