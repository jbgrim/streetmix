'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Element', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()')
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nom: {
        type: Sequelize.STRING,
        allowNull: false
      },
      roulement: {
        type: Sequelize.STRING,
        allowNull: true
      },
      base: {
        type: Sequelize.STRING,
        allowNull: true
      },
      forme: {
        type: Sequelize.STRING,
        allowNull: true
      },
      count_eur: {
        type: Sequelize.STRING,
        allowNull: true
      },
      count_co2: {
        type: Sequelize.STRING,
        allowNull: true
      },
      sur30_count_eur: {
        type: Sequelize.STRING,
        allowNull: true
      },
      sur30_count_co2: {
        type: Sequelize.STRING,
        allowNull: true
      },
      colour: {
        type: Sequelize.STRING,
        allowNull: true
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Element')
  }
}
