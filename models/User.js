'use strict';
const { Model } = require('sequelize');
const { UserLevel } = require('./UserLevel');
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
      // langganan_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      avatar: DataTypes.STRING,
      exp: DataTypes.DOUBLE,
      level: DataTypes.INTEGER,
      jumlah_scan: DataTypes.INTEGER,
      kadaluwarsa: DataTypes.DATE,
      token: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  User.associate = (models) => {
    User.belongsToMany(models.Level, {
      through: models.UserLevel,
      // through: models.UserLevel,
      foreignKey: 'user_id',
      // otherKey: 'level_id',
      as: 'levels',
    });
  };
  return User;
};
