'use strict';
const { Model, DataTypes } = require('sequelize');
const PasswordService = require('../services/passwordServicce.js');

module.exports = (sequelize) => {
  class Users extends Model {
    static associate(models) {
      // Association definition
      this.hasMany(models.Events, { foreignKey: 'userId', as: 'events' });
      this.hasMany(models.Reviews, { foreignKey: 'userId', as: 'reviews' });
    }
  }
  Users.init({
    userId: {       // foreign key
      type: DataTypes.INTEGER,
      references: {
        model: 'Users', // name of the target model
        key: 'id',      // key in the target model
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
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
      type: DataTypes.STRING(70)
    },
    number: {
      type: DataTypes.STRING(20)
    },
    firstName: {
      type: DataTypes.STRING(50)
    },
    lastName: {
      type: DataTypes.STRING(70)
    },
    verifiedAt: {
      type: DataTypes.BOOLEAN()
    },
    image: {
      type: DataTypes.STRING(200)
    },
  }, {
    sequelize,
    modelName: 'Users',
    tableName: 'Users',
    timestamps: true,
    hooks: {
      beforeCreate: async (user) => {
        user.password = await PasswordService.hashPassword(user.password);
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          user.password = await PasswordService.hashPassword(user.password);
        }
      }
    }
  });

  Users.prototype.validPassword = async function(password) {
    return await PasswordService.comparePassword(password, this.password);
  };

  return Users;
};