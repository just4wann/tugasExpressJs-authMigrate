'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('laundries', {
      id: {
        allowNull: false,
        autoIncrement:true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customerUsername: {
        type: Sequelize.STRING,
        references: {
          model: 'customers',
          key: 'username'
        },
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT'
      },
      estimate: {
        type: Sequelize.STRING
      },
      qty: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('laundries');
  }
};