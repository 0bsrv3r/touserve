'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Users extends Model {
    static associate(models) {
      // Association definition
      this.hasMany(models.Events, { foreignKey: 'userId', as: 'events' });
    }
  }
  Users.init({
    userId: {       // foreign key
      type: DataTypes.INTEGER,
      references: {
        model: 'Users', // name of the target model
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
    number: {
      type: DataTypes.INTEGER(20)
    },
    firstName: {
      type: DataTypes.STRING(50)
    },
    lastName: {
      type: DataTypes.STRING(70)
    },
    verifiedAt: {
      type: DataTypes.STRING(50)
    },
    image: {
      type: DataTypes.STRING(200)
    },
  }, {
    sequelize,
    modelName: 'Users',
    tableName: 'Users',
    timestamps: true
  });

  return Users;
};