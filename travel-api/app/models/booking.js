'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      booking.belongsTo(models.User, {
        foreignKey: 'userName',
        as: 'user'
      })

      booking.belongsTo(models.tujuan, {
        foreignKey: 'tujuanId',
        as: 'tujuan'
      })

      booking.belongsTo(models.kendaraan, {
        foreignKey: 'kendaraanId',
        as: 'kendaraan'
      })
    }
  }

  booking.init({
    id : {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userName: DataTypes.STRING,
    jadwalKeberangkatan: DataTypes.DATEONLY,
    jadwalKepulangan: DataTypes.DATEONLY,
    kendaraanId: DataTypes.INTEGER,
    tujuanId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'booking',
  });
  return booking;
};