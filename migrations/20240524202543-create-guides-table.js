'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Guides', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {       // foreign key
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // name of the target model
          key: 'id',      // key in the target model
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(70)
      },
      surname: {
        allowNull: false,
        type: Sequelize.STRING(70)
      },
      languages: {
        allowNull: false,
        type: Sequelize.STRING(300)
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING(70)
      },
      country: {
        allowNull: false,
        type: Sequelize.STRING(70)
      },
      age: {
        allowNull: false,
        type: Sequelize.INTEGER(3)
      },
      experience: {
        allowNull: false,
        type: Sequelize.INTEGER(3)
      },
      gender: {
        allowNull: false,
        type: Sequelize.STRING(10)
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      stars: {
        type: Sequelize.INTEGER
      },
      image: {
        allowNull: false,
        type: Sequelize.STRING(200)
      },
      certificate: {
        allowNull: false,
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
    await queryInterface.dropTable('Guides');
  }
};