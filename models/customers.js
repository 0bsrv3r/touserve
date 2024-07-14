'use strict';
const { Model, DataTypes } = require('sequelize');
const PasswordService = require('../services/passwordServicce.js');

module.exports = (sequelize) => {
  class Customers extends Model {
    static associate(models) {
      // Association definition
      this.hasMany(models.Customers,  { foreignKey: 'companyId', as: 'companyGuides' });
      this.hasMany(models.Tours,  { foreignKey: 'customerId', as: 'companyTours' });
      this.hasMany(models.Tours,  { foreignKey: 'guideId', as: 'tours' });
      this.hasMany(models.Accommodations, { foreignKey: 'customerId', as: 'accommodations' });
      this.hasMany(models.Reviews, { foreignKey: 'guideId', as: 'reviews' });
    }
  }
  Customers.init({
    companyId: {       // foreign key
        type: DataTypes.INTEGER,
        references: {
          model: 'Customers', // name of the target model
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
    role: {
        allowNull: false,
        type: DataTypes.STRING(30)
    },
    number: {
        type: DataTypes.STRING(20)
    },
    firstName: {
        type: DataTypes.STRING(70)
    },
    lastName: {
        type: DataTypes.STRING(70)
    },
    languages: {
        type: DataTypes.JSON(300)
    },
    country: {
        type: DataTypes.STRING(70)
    },
    city: {
        type: DataTypes.STRING(70)
    },
    age: {
        type: DataTypes.INTEGER
    },
    experience: {
        type: DataTypes.INTEGER
    },
    description: {
        type: DataTypes.TEXT
    },
    image: {
        type: DataTypes.STRING(200)
    },
    verifiedAt: {
        type: DataTypes.BOOLEAN()
    },
  }, {
    sequelize,
    modelName: 'Customers',
    tableName: 'Customers',
    timestamps: true,
    hooks: {
        beforeCreate: async (customer) => {
          customer.password = await PasswordService.hashPassword(customer.password);
        },
        beforeUpdate: async (customer) => {
          if (customer.changed('password')) {
            customer.password = await PasswordService.hashPassword(customer.password);
          }
        }
    }
  });

  Customers.prototype.validPassword = async function(password) {
    return await PasswordService.comparePassword(password, this.password);
  };

  return Customers;
};