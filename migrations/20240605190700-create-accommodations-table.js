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
      title: {
        allowNull: false,
        type: Sequelize.STRING(70)
      },
      accommodationType: {
        allowNull: false,
        type: Sequelize.STRING(70)
      },
      country: {
        allowNull: false,
        type: Sequelize.STRING(70)
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING(70)
      },
      street: {
        type: Sequelize.STRING(100)
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
      guestCount: {
        allowNull: false,
        type: Sequelize.INTEGER(3)
      },
      roomType: {
        allowNull: false,
        type: Sequelize.STRING(300)
      },
      rules: {
        type: Sequelize.JSON(500)
      },
      promotions: {
        type: Sequelize.STRING(10)
      },
      weeklyDiscount: {
        type: Sequelize.STRING(10)
      },
      monthlyDiscount: {
        type: Sequelize.STRING(10)
      },
      about: {
        allowNull: false,
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('Accommodation');
  }
};