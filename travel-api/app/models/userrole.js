'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userRoles extends Model {
    static associate(models) {
    }
  }
  userRoles.init({
    idRole: DataTypes.INTEGER,
    idUser: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'userRoles',
  });
  return userRoles;
};