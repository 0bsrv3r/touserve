'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tours', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      companyId: {       // foreign key
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // name of the target model
          key: 'id',      // key in the target model
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      guideId: {       // foreign key
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Guides', // name of the target model
          key: 'id',      // key in the target model
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(150)
      },
      category: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      location: {
        allowNull: false,
        type: Sequelize.STRING(150)
      },
      images: {
        allowNull: false,
        type: Sequelize.STRING(1000)
      },
      departure: {
        allowNull: false,
        type: Sequelize.STRING(30)
      },
      duration: {
        allowNull: false,
        type: Sequelize.INTEGER(5)
      },
      highlights: {
        allowNull: false,
        type: Sequelize.STRING(300)
      },
      inclusions: {
        allowNull: false,
        type: Sequelize.STRING(300)
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER(5)
      },
      currency: {
        allowNull: false,
        type: Sequelize.STRING(5)
      },
      overview: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      additional: {
        type: Sequelize.TEXT
      },
      stars: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Tours');
  }
};