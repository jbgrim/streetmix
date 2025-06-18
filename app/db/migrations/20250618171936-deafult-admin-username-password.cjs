'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', 
      [{
        id: '43811c3b-224e-471d-bbaa-7fb54cab315a',
        email: 'admin@streetmix.com',
        password: 'Admin@123',
        display_name: 'Admin',
        roles: ['ADMIN'],
        created_at: new Date(),
        updated_at: new Date()
      }]
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', {
      id: 'admin@streetmix.com'
    })
  }
};
