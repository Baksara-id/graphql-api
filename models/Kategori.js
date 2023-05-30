"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Kategori extends Model {
    static associate(models) {
      // define association here
    }
  }

  Kategori.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true, // Mark 'id' as the primary key
        autoIncrement: true,
      },
      nama: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Kategori",
      timestamps: false,
      tableName: "kategoris",
    }
  );

  Kategori.associate = (models) => {
    Kategori.hasMany(models.Artikel, {
      as: "artikel",
      foreignKey: {
        name: "kategori_id",
      },
    });
  };

  return Kategori;
};
