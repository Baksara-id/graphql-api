'use strict';
const { Model } = require('sequelize');
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
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      avatar: DataTypes.STRING,
      exp: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  User.associate = (models) => {
    User.belongsToMany(models.Level, {
      through: models.UserLevel,
      foreignKey: 'user_id',
      otherKey: 'level_id',
      as: 'levels',
    });
  };
  return User;
};
