'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('statusLaundries', {
      laundryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'laundries',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT'
      },
      laundryStatus: {
        type: Sequelize.STRING,
        references: {
          model: 'statuses',
          key: 'status'
        },
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('statusLaundries')
  }
};
