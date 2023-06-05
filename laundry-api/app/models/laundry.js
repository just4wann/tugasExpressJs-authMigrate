'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class laundry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      laundry.belongsTo(models.customer, {
        foreignKey: 'customerUsername',
        as: 'customer'
      })

      laundry.belongsToMany(models.status, {
        through: 'statusLaundries',
        foreignKey: 'laundryId',
        hooks: true
      })
    }
  }
  laundry.init({
    id : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    customerUsername: DataTypes.STRING,
    estimate: DataTypes.STRING,
    qty: DataTypes.STRING
  }, 
  {
    hooks: {
      afterCreate: async (laundry, option) => {
          await sequelize?.models.auditLog.create({
            tableName: 'laundries',
            task: 'Insert',
            description: `Proses penambahan Laundry dengan Username ${laundry.customerUsername}`
          })
      },
      afterUpdate: async (laundry, option) => {
        await sequelize?.models.auditLog.create({
          tableName: 'laundries',
          task: 'Update',
          description: `Proses Update Laundry dan Status Laundry dengan Username ${laundry.customerUsername}`
        })
      },
      afterDestroy: async (laundry, option) => {
        await sequelize?.models.auditLog.create({
          tableName: 'laundries',
          task: 'Delete',
          description: `Proses Delete Laundry dengan Username ${laundry.customerUsername}`
        })
      }
    },
    sequelize,
    modelName: 'laundry',
  });
  return laundry;
};