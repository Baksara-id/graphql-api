"use strict";
const { Model } = require("sequelize");
const { UserLevel } = require("./UserLevel");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true, // Mark 'id' as the primary key
        autoIncrement: true,
      },
      langganan_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      token: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      exp: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      level: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      jumlah_scan: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      kadaluwarsa: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "User",
      timestamps: true,
    }
  );
  User.associate = (models) => {
    User.belongsToMany(models.Level, {
      through: models.UserLevel,
      // through: models.UserLevel,
      foreignKey: "user_id",
      // otherKey: 'level_id',
      as: "levels",
    });

    User.belongsToMany(models.Lencana, {
      through: models.UserLencana,
      foreignKey: "user_id",
      as: "lencanas",
    });


    User.hasMany(models.Laporan, {
      as: "laporans",
      foreignKey: {
        name: "user_id",
      },
    });

    User.belongsTo(models.Langganan, {
      as: "langganan",
      foreignKey: {
        name: "langganan_id",
      },
    });

    User.hasMany(models.RiwayatBelajar, {
      as: "riwayat_belajars",
      foreignKey: {
        name: "user_id",
      },
    });

    

    User.belongsToMany(models.Tantangan, {
      through: models.UserTantangan,
      foreignKey: "user_id",
      as: "tantangans",
    });
    
  };
  return User;
};
