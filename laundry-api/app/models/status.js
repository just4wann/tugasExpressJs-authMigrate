'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      status.belongsToMany(models.laundry, {
        through: 'statusLaundries',
        foreignKey: 'laundryStatus',
        hooks: true
      })
    }
  }
  status.init({
    status : {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    }
  }, 
  {
    hooks: {
      afterCreate: async (status, option) => {
        await sequelize?.models.auditLog.create({
          tableName: 'statuses',
          task: 'Insert',
          description: `Proses penambahan Status dengan Username ${status.customerUsername}`
        })
      },
      afterUpdate: async (status, option) => {
        await sequelize?.models.auditLog.create({
          tableName: 'statuses',
          task: 'Update',
          description: `Proses Update Laundry dan Status Laundry dengan Username ${status.customerUsername}`
        })
      },
      afterDestroy: async (status, option) => {
        await sequelize?.models.auditLog.create({
          tableName: 'statuses',
          task: 'Delete',
          description: `Proses Delete Status dengan Username ${status.customerUsername}`
        })
      }
    },
    sequelize,
    modelName: 'status',
  });
  return status;
};