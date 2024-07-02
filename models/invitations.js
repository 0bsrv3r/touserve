'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Invitations extends Model {
    static associate(models) {
      // Association definition
      Invitations.belongsTo(models.Customers, { foreignKey: 'companyId', as: 'guides' });
    }
  }
  Invitations.init({
    companyId: {       // foreign key
        type: DataTypes.INTEGER,
        references: {
          model: 'Customers', // name of the target model
          key: 'id',      // key in the target model
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING(100)
    },
    token: {
        allowNull: false,
        type: DataTypes.STRING
    },
    status: {
      allowNull: false,
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'Invitations',
    tableName: 'Invitations',
    timestamps: true
  });

  return Invitations;
};