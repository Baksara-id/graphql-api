'use strict';
const { Model } = require('sequelize');
const { UserLevel } = require('./UserLevel');
module.exports = (sequelize, DataTypes) => {
  class Level extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Level.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true, // Mark 'id' as the primary key
        autoIncrement: true,
      },
      nama: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Level',
      tableName: 'levels',
    }
  );
  Level.associate = (models) => {
    Level.belongsToMany(models.User, {
      through: models.UserLevel,
      // through: 'user_level',
      // through: UserLevel,
      foreignKey: 'level_id',
      // otherKey: 'user_id',
      as: 'users',
    });
  };
  return Level;
};
