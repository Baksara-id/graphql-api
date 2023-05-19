"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Langganan extends Model {
    static associate(models) {
      // define association here
    }
  }
  Laporan.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true, // Mark 'id' as the primary key
        autoIncrement: true,
      },
      nama: DataTypes.STRING,
      harga: DataTypes.DOUBLE,
      durasi: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Langganan",
      timestamps: true,
    }
  );

  Langganan.associate = (models) => {
    Langganan.hasMany(models.User, {
      foreignKey: "langganan_id",
      as: "users",
    });
  };

  return Langganan;
};
