'use strict';
const { Model, DataTypes } = require('sequelize');
const PasswordService = require('./../services/passwordServicce');

module.exports = (sequelize) => {
  class Admin extends Model {
    static associate(models) {
    }
  }
  Admin.init({
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
  }, {
    sequelize,
    modelName: 'Admin',
    tableName: 'Admin',
    timestamps: true,
    hooks: {
      beforeCreate: async (admin) => {
        admin.password = await PasswordService.hashPassword(admin.password);
      },
      beforeUpdate: async (admin) => {
        if (admin.changed('password')) {
            admin.password = await PasswordService.hashPassword(admin.password);
        }
      }
    }
  });

  Admin.prototype.validPassword = async function(password) {
    return await PasswordService.comparePassword(password, this.password);
  };

  return Admin;
};