"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Laporan extends Model {
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
      user_id: {
        type: DataTypes.INTEGER,
        // allowNull: true,
      },
      judul: DataTypes.STRING,
      isi: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Laporan",
      timestamps: true,
      tableName: "laporans",
    }
  );

  Laporan.associate = (models) => {
    Laporan.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });
  };

  return Laporan;
};
