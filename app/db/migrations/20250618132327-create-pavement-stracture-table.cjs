'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PavementStructure', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()') // For Postgres; see note below
      },
      nom: {
        type: Sequelize.STRING,
        allowNull: false
      },
      colour: {
        type: Sequelize.STRING,
        allowNull: true
      },
      prix_projet: {
        type: Sequelize.STRING
      },
      co2_projet: {
        type: Sequelize.STRING
      },
      prix_sur_30_ans: {
        type: Sequelize.STRING
      },
      co2_sur_30_ans: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('PavementStructure')
  }
}
