'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Accommodations', {
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
      images: {
        allowNull: false,
        type: Sequelize.JSON(1000)
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(150)
      },
      location: {
        allowNull: false,
        type: Sequelize.STRING(150)
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER(5)
      },
      currency: {
        allowNull: false,
        type: Sequelize.STRING(5)
      },
      in: {
        allowNull: false,
        type: Sequelize.STRING(10)
      },
      out: {
        allowNull: false,
        type: Sequelize.STRING(10)
      },
      amenities: {
        allowNull: false,
        type: Sequelize.JSON(1000)
      },
      roomCount: {
        allowNull: false,
        type: Sequelize.INTEGER(3)
      },
      bedCount: {
        allowNull: false,
        type: Sequelize.INTEGER(3)
      },
      bathCount: {
        allowNull: false,
        type: Sequelize.INTEGER(3)
      },
      rules: {
        allowNull: false,
        type: Sequelize.JSON(500)
      },
      guestCount: {
        allowNull: false,
        type: Sequelize.INTEGER(3)
      },
      promotions: {
        type: Sequelize.STRING(10)
      },
      roomType: {
        type: Sequelize.STRING(300)
      },
      about: {
        allowNull: false,
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
    await queryInterface.dropTable('Accommodation');
  }
};