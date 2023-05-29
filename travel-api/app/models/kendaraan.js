'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class kendaraan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      kendaraan.hasMany(models.booking, {
        foreignKey: 'kendaraanId',
        as: 'booking'
      })
    }
  }
  kendaraan.init({
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    jenisKendaraan: DataTypes.STRING,
    kapasitas: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'kendaraan',
  });
  return kendaraan;
};