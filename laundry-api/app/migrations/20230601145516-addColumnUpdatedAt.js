'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('statusLaundries', 'updatedAt', {
      type: Sequelize.DATE,
      defaultValue: Sequelize.DATE,
      allowNull: false
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('statusLaundries', 'updatedAt')
  }
};
