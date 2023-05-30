"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Artikel extends Model {
    static associate(models) {
      // define association here
    }
  }

  Artikel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true, // Mark 'id' as the primary key
        autoIncrement: true,
      },
      judul: DataTypes.STRING,
      isi: DataTypes.TEXT,
      url_gambar: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Artikel",
      timestamps: true,
      tableName: "artikels",
    }
  );

  Artikel.associate = (models) => {
    Artikel.belongsTo(models.Kategori, {
      as: "kategori",
      foreignKey: {
        name: "kategori_id",
      },
    });
  };

  return Artikel;
};
