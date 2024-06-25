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
      customerId: {       // foreign key
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Customers', // name of the target model
          key: 'id',      // key in the target model
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      guideId: {       // foreign key
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Customers', // name of the target model
          key: 'id',      // key in the target model
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(150)
      },
      tourType: {
        type: Sequelize.STRING(100)
      },
      category: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING(70)
      },
      country: {
        allowNull: false,
        type: Sequelize.STRING(70)
      },
      area: {
        type: Sequelize.STRING(70)
      },
      date: {
        type: Sequelize.STRING(20)
      },
      time: {
        allowNull: false,
        type: Sequelize.STRING(20)
      },
      duration: {
        allowNull: false,
        type: Sequelize.INTEGER(5)
      },
      inclusions: {
        allowNull: false,
        type: Sequelize.JSON(300)
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
      status: {
        type: Sequelize.STRING(15)
      },
      stars: {
        type: Sequelize.INTEGER
      },
      images: {
        allowNull: false,
        type: Sequelize.JSON(1000)
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