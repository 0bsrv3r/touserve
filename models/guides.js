'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Guides extends Model {
    static associate(models) {
      // Association definition
      this.hasMany(models.Tours, { foreignKey: 'guideId', as: 'tours' });
      Guides.belongsTo(models.Users, { foreignKey: 'userId', as: 'users' });
    }
  }
  Guides.init({
    userId: {       // foreign key
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Users', // name of the target model
          key: 'id',      // key in the target model
        }
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING(70)
    },
    surname: {
        allowNull: false,
        type: DataTypes.STRING(70)
    },
    languages: {
        allowNull: false,
        type: DataTypes.STRING(300)
    },
    city: {
        allowNull: false,
        type: DataTypes.STRING(70)
    },
    country: {
        allowNull: false,
        type: DataTypes.STRING(70)
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
    },
    description: {
        allowNull: false,
        type: DataTypes.TEXT
    },
    stars: {
        type: DataTypes.INTEGER
    },
    image: {
        allowNull: false,
        type: DataTypes.STRING(200)
    },
    certificate: {
        allowNull: false,
        type: DataTypes.STRING(200)
    }
  }, {
    sequelize,
    modelName: 'Guides',
    tableName: 'Guides',
    timestamps: true
  });

  return Guides;
};