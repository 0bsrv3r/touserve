'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Reviews extends Model {
    static associate(models) {
      // Association definition
      Reviews.belongsTo(models.Users, { foreignKey: 'userId', as: 'users' });
      Reviews.belongsTo(models.Tours, { foreignKey: 'tourId', as: 'tours' });
      Reviews.belongsTo(models.Accommodations, { foreignKey: 'accommodationId', as: 'accommodations' });
      Reviews.belongsTo(models.Customers, { foreignKey: 'guideId', as: 'guides' });
    }
  }
  Reviews.init({
    userId: {       // foreign key
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Users', // name of the target model
          key: 'id',      // key in the target model
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    tourId: {       // foreign key
        type: DataTypes.INTEGER,
        references: {
          model: 'Tours', // name of the target model
          key: 'id',      // key in the target model
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    accommodationId: {       // foreign key
        type: DataTypes.INTEGER,
        references: {
          model: 'Accommodations', // name of the target model
          key: 'id',      // key in the target model
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    guideId: {       // foreign key
        type: DataTypes.INTEGER,
        references: {
          model: 'Customers', // name of the target model
          key: 'id',      // key in the target model
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    review: {
        allowNull: false,
        type: DataTypes.TEXT
    },
    stars: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'Reviews',
    tableName: 'Reviews',
    timestamps: true
  });

  return Reviews;
};