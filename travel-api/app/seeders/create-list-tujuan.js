'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const list_destinasi = [
      {
        destinasi: 'BANDUNG'
      },
      {
        destinasi: 'YOGYAKARTA'
      },
      {
        destinasi: 'SURABAYA'
      }
    ]

    await queryInterface.bulkInsert('tujuans', list_destinasi)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
