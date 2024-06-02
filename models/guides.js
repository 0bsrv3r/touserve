'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Guides extends Model {
    static associate(models) {
      // Association definition
      this.hasMany(models.Tours, { foreignKey: 'guideId', as: 'tours' });
      Guides.belongsTo(models.Users, { foreignKey: 'companyId', as: 'companies' });
    }
  }
  Guides.init({
    companyId: {       // foreign key
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Users', // name of the target model
          key: 'id',      // key in the target model
        }
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING(50)
    },
    surname: {
        allowNull: false,
        type: DataTypes.STRING(70)
    },
    languages: {
        allowNull: false,
        type: DataTypes.STRING(300)
    },
    location: {
        allowNull: false,
        type: DataTypes.STRING(150)
    },
    stars: {
        type: DataTypes.INTEGER
    },
    image: {
        allowNull: false,
        type: DataTypes.STRING(150)
    },
    certificate: {
        allowNull: false,
        type: DataTypes.STRING(150)
    },
    visa: {
        allowNull: false,
        type: DataTypes.STRING(5)
    },
    currency: {
        allowNull: false,
        type: DataTypes.STRING(5)
    },
    description: {
        allowNull: false,
        type: DataTypes.TEXT
    },
    age: {
        allowNull: false,
        type: DataTypes.INTEGER(3)
    },
    experience: {
        allowNull: false,
        type: DataTypes.INTEGER(3)
    },
    gender: {
        allowNull: false,
        type: DataTypes.STRING(10)
    }
  }, {
    sequelize,
    modelName: 'Guides',
    tableName: 'Guides',
    timestamps: true
  });

  return Guides;
};