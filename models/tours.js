'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Tours extends Model {
    static associate(models) {
      // Association definition
      Tours.belongsTo(models.Guides, { foreignKey: 'guideId', as: 'guides' });
      Tours.belongsTo(models.Users, { foreignKey: 'companyId', as: 'companies' });
    }
  }
  Tours.init({
    companyId: {       // foreign key
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Users', // name of the target model
          key: 'id',      // key in the target model
        }
    },
    guideId: {       // foreign key
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Guides', // name of the target model
          key: 'id',      // key in the target model
        }
    },
    title: {
        allowNull: false,
        type: DataTypes.STRING(150)
    },
    category: {
        allowNull: false,
        type: DataTypes.STRING(100)
    },
    location: {
        allowNull: false,
        type: DataTypes.STRING(150)
    },
    images: {
        allowNull: false,
        type: DataTypes.JSON(1000)
    },
    departure: {
        allowNull: false,
        type: DataTypes.STRING(30)
    },
    duration: {
        allowNull: false,
        type: DataTypes.INTEGER(5)
    },
    highlights: {
        allowNull: false,
        type: DataTypes.JSON(300)
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
    stars: {
        type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Tours',
    tableName: 'Tours',
    timestamps: true
  });

  return Tours;
};