'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('services', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      professional_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'professionals',
          key: 'id'
        }
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING
      },
      price: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })

    await queryInterface.addIndex('services', ['professional_id']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('services', ['professional_id']);
    
    await queryInterface.dropTable('services')
  }
};
