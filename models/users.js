'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Users extends Model {
    static associate(models) {
      // Association definition
      this.hasMany(models.Events, { foreignKey: 'userId', as: 'events' });
      this.hasMany(models.Guides, { foreignKey: 'userId', as: 'guides' });
      this.hasMany(models.Tours, { foreignKey: 'companyId', as: 'tours' });
    }
  }
  Users.init({
    uname: {
        allowNull: false,
        type: DataTypes.STRING(70)   
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING(100)
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING
    },
    role: {
        allowNull: false,
        type: DataTypes.STRING(30)
    }
  }, {
    sequelize,
    modelName: 'Users',
    tableName: 'Users',
    timestamps: true
  });

  return Users;
};