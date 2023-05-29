'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const list_kendaraan = [
      {
        jenisKendaraan: 'BUS',
        kapasitas : '25 Orang' 
      },
      {
        jenisKendaraan: 'ELF',
        kapasitas : '10 Orang' 
      },
      {
        jenisKendaraan: 'PICKUP',
        kapasitas : '5 Orang' 
      }
    ]
    await queryInterface.bulkInsert('kendaraans', list_kendaraan)
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
