'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Tours extends Model {
    static associate(models) {
      // Association definition
      Tours.belongsTo(models.Customers, { foreignKey: 'customerId', as: 'customers' });
      Tours.belongsTo(models.Customers, { foreignKey: 'guideId', as: 'guides' });
    }
  }
  Tours.init({
    customerId: {       // foreign key
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Customers', // name of the target model
          key: 'id',      // key in the target model
        }
    },
    guideId: {       // foreign key
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Customers', // name of the target model
          key: 'id',      // key in the target model
        }
    },
    title: {
        allowNull: false,
        type: DataTypes.STRING(150)
    },
    tourType: {
        type: DataTypes.STRING(100)
    },
    category: {
        allowNull: false,
        type: DataTypes.STRING(100)
    },
    city: {
        allowNull: false,
        type: DataTypes.STRING(70)
    },
    country: {
        allowNull: false,
        type: DataTypes.STRING(70)
    },
    area: {
        type: DataTypes.STRING(70)
    },
    date: {
        type: DataTypes.STRING(20)
    },
    time: {
        allowNull: false,
        type: DataTypes.STRING(20)
    },
    duration: {
        allowNull: false,
        type: DataTypes.INTEGER(5)
    },
    inclusions: {
        allowNull: false,
        type: DataTypes.JSON(300)
    },
    price: {
        allowNull: false,
        type: DataTypes.INTEGER(5)
    },
    currency: {
        allowNull: false,
        type: DataTypes.STRING(5)
    },
    overview: {
        allowNull: false,
        type: DataTypes.TEXT
    },
    additional: {
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
    modelName: 'Tours',
    tableName: 'Tours',
    timestamps: true
  });

  return Tours;
};