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
        type: Sequelize.INTEGER
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
        type: Sequelize.INTEGER
      },
      bedCount: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      bathCount: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      guestCount: {
        allowNull: false,
        type: Sequelize.INTEGER
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
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Accommodations');
  }
};