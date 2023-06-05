'use strict';
const {
  Model
} = require('sequelize');
const auditLog = require('./index').auditLog;
module.exports = (sequelize, DataTypes) => {
  class customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      customer.hasMany(models.laundry, {
        foreignKey: 'customerUsername',
        as: 'laundry'
      })
    }
  }
  customer.init({
    name: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, 
  {
    hooks: {
      afterCreate: async (customer, option) => {
        console.log('>>> afterCreate', sequelize?.models);
          await sequelize?.models.auditLog.create({
            tableName: 'customers',
            task: 'Insert',
            description: `Proses penambahan Customer dengan Username ${customer.username}`
          })
      },
      afterUpdate: async (customer, option) => {
        await sequelize?.models.auditLog.create({
          tableName: 'laundries',
          task: 'Update',
          description: `Proses Update Customer dengan Username ${customer.username}`
        })
      },
      afterDestroy: async (customer, option) => {
        await sequelize?.models.auditLog.create({
          tableName: 'laundries',
          task: 'Delete',
          description: `Proses Hapus Customer dengan Username${customer.username}`
        })
      }
    },
    sequelize,
    modelName: 'customer',
  });
  return customer;
};