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
    role_id: DataTypes.INTEGER,
    user_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'userRoles',
  });
  return userRoles;
};