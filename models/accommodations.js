'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Accommodations extends Model {
    static associate(models) {
      Accommodations.belongsTo(models.Users, { foreignKey: 'userId', as: 'users' });
    }
  }
  Accommodations.init({
    userId: {       // foreign key
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Users', // name of the target model
          key: 'id',      // key in the target model
        }
    },
    images: {
        allowNull: false,
        type: DataTypes.JSON(1000)
    },
    title: {
        allowNull: false,
        type: DataTypes.STRING(150)
    },
    location: {
        allowNull: false,
        type: DataTypes.STRING(150)
    },
    price: {
        allowNull: false,
        type: DataTypes.INTEGER(5)
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
        type: DataTypes.INTEGER(3)
    },
    bedCount: {
        allowNull: false,
        type: DataTypes.INTEGER(3)
    },
    bathCount: {
        allowNull: false,
        type: DataTypes.INTEGER(3)
    },
    rules: {
        allowNull: false,
        type: DataTypes.JSON(500)
    },
    guestCount: {
        allowNull: false,
        type: DataTypes.INTEGER(3)
    },
    promotions: {
        type: DataTypes.STRING(10)
    },
    roomType: {
        type: DataTypes.STRING(300)
    },
    about: {
        allowNull: false,
        type: DataTypes.TEXT
    },
    stars: {
        type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Accommodations',
    tableName: 'Accommodations',
    timestamps: true
  });

  return Accommodations;
};