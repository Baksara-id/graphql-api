"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class RiwayatBelajar extends Model {
    static associate(models) {
      // define association here
    }
  }
  RiwayatBelajar.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true, // Mark 'id' as the primary key
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
      },
      nomor_modul: {
        type: DataTypes.INTEGER,
      },
      nomor_pelajaran: {
        type: DataTypes.INTEGER,
      },
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "RiwayatBelajar",
      timestamps: true,
    }
  );

  RiwayatBelajar.associate = (models) => {
    RiwayatBelajar.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });
  };

    return RiwayatBelajar;
};
