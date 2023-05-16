'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserLevel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserLevel.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'User',
          key: 'id',
        },
      },
      level_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Level',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'UserLevel',
      tableName: 'user_level',
    }
  );
  UserLevel.removeAttribute('id');

  UserLevel.associate = (models) => {
    UserLevel.belongsTo(models.User, {
      as: 'User',
      foreignKey: {
        name: 'user_id',
      },
    });
    UserLevel.belongsTo(models.Level, {
      as: 'Level',
      foreignKey: {
        name: 'level_id',
      },
    });
  };
  return UserLevel;
};
