'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Accommodations extends Model {
    static associate(models) {
        this.hasMany(models.Reviews, { foreignKey: 'accommodationId', as: 'reviews' });
        Accommodations.belongsTo(models.Customers, { foreignKey: 'customerId', as: 'customers' });
    }
  }
  Accommodations.init({
    customerId: {       // foreign key
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Customers', // name of the target model
          key: 'id',      // key in the target model
        }
    },
    title: {
        allowNull: false,
        type: DataTypes.STRING(70)
    },
    accommodationType: {
        allowNull: false,
        type: DataTypes.STRING(70)
    },
    country: {
        allowNull: false,
        type: DataTypes.STRING(70)
    },
    city: {
        allowNull: false,
        type: DataTypes.STRING(70)
    },
    street: {
        type: DataTypes.STRING(100)
    },
    price: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    currency: {
        allowNull: false,
        type: DataTypes.STRING(5)
    },
    in: {
        allowNull: false,
        type: DataTypes.STRING(10)
    },
    out: {
        allowNull: false,
        type: DataTypes.STRING(10)
    },
    amenities: {
        allowNull: false,
        type: DataTypes.JSON(1000)
    },
    roomCount: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    bedCount: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    bathCount: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    guestCount: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    roomType: {
        type: DataTypes.STRING(300)
    },
    rules: {
        type: DataTypes.JSON(500)
    },
    promotions: {
        type: DataTypes.STRING(10)
    },
    weeklyDiscount: {
        type: DataTypes.STRING(10)
    },
    monthlyDiscount: {
        type: DataTypes.STRING(10)
    },
    about: {
        allowNull: false,
        type: DataTypes.TEXT
    },
    status: {
        type: DataTypes.STRING(15)
    },
    stars: {
        type: DataTypes.INTEGER
    },
    images: {
        allowNull: false,
        type: DataTypes.JSON(1000)
    },
  }, {
    sequelize,
    modelName: 'Accommodations',
    tableName: 'Accommodations',
    timestamps: true
  });

  return Accommodations;
};