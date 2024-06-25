'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Customers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      companyId: {       // foreign key
        type: Sequelize.INTEGER,
        references: {
          model: 'Customers', // name of the target model
          key: 'id',      // key in the target model
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      uname: {
        allowNull: false,
        type: Sequelize.STRING(70)
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(70)
      },
      role: {
        allowNull: false,
        type: Sequelize.STRING(30)
      },
      number: {
        type: Sequelize.INTEGER(20)
      },
      firstName: {
        type: Sequelize.STRING(70)
      },
      lastName: {
        type: Sequelize.STRING(70)
      },
      languages: {
        type: Sequelize.STRING(300)
      },
      country: {
        type: Sequelize.STRING(70)
      },
      city: {
        type: Sequelize.STRING(70)
      },
      age: {
        type: Sequelize.INTEGER(3)
      },
      experience: {
        type: Sequelize.INTEGER(3)
      },
      gender: {
        type: Sequelize.STRING(10)
      },
      description: {
        type: Sequelize.TEXT
      },
      image: {
        type: Sequelize.STRING(200)
      },
      verifiedAt: {
        type: Sequelize.STRING(50)
      },
      image: {
        type: Sequelize.STRING(200)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Customers');
  }
};