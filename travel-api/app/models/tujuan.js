'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tujuan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      tujuan.hasMany(models.booking, {
        foreignKey: 'tujuanId',
        as: 'booking'
      })
    }
  }
  tujuan.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    destinasi: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tujuan',
  });
  return tujuan;
};