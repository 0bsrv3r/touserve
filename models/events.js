'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Events extends Model {
    static associate(models) {
      // Association definition
      Events.belongsTo(models.Users, { foreignKey: 'userId', as: 'users' });
    }
  }
  Events.init({
    userId: {       // foreign key
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Users', // name of the target model
          key: 'id',      // key in the target model
        }
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    country: {
      allowNull: false,
      type: DataTypes.STRING(70)
    },
    city: {
      allowNull: false,
      type: DataTypes.STRING(70)
    },
    place: {
      type: DataTypes.STRING(100)
    },
    date: {
      allowNull: false,
      type: DataTypes.STRING(150)
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    image: {
      allowNull: false,
      type: DataTypes.STRING(150)
    }
  }, {
    sequelize,
    modelName: 'Events',
    tableName: 'Events',
    timestamps: true
  });

  return Events;
};