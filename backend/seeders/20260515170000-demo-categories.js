'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      {
        name: 'Work',
        color: '#1890ff',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Personal',
        color: '#52c41a',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Urgent',
        color: '#f5222d',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Shopping',
        color: '#faad14',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
