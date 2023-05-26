'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('appointments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      hour: {
        allowNull: false,
        type: Sequelize.STRING
      },
      client_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'clients',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      professional_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'professionals',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      services: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.JSON)
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

    await queryInterface.addIndex('appointments', ['client_id']);
    await queryInterface.addIndex('appointments', ['professional_id']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('appointments', ['client_id']);
    await queryInterface.removeIndex('appointments', ['professional_id']);
    
    await queryInterface.dropTable('appointments')
  }
};
