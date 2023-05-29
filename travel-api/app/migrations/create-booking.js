'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bookings', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      userName: {
        type: Sequelize.STRING,
      },
      jadwalKeberangkatan: {
        type: Sequelize.DATEONLY
      },
      jadwalKepulangan: {
        type: Sequelize.DATEONLY
      },
      kendaraanId: {
        type: Sequelize.STRING,
      },
      tujuanId: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('bookings');
  }
};