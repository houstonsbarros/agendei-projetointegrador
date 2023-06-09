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
        type: Sequelize.ARRAY(Sequelize.INTEGER),
      },
      schedule: {
        allowNull: false,
        type: Sequelize.JSON
      },
      payment: {
        allowNull: false,
        type: Sequelize.JSON
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM('Finalizado', 'Pendente', 'Cancelado'),
        defaultValue: 'Pendente'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.addIndex('appointments', ['client_id']);
    await queryInterface.addIndex('appointments', ['professional_id']);
    await queryInterface.addIndex('appointments', ['services']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('appointments', ['client_id']);
    await queryInterface.removeIndex('appointments', ['professional_id']);
    await queryInterface.removeIndex('appointments', ['services']);

    await queryInterface.dropTable('appointments');
  }
};
