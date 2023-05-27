'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsToMany(models.Role, {
        through: 'userRoles',
        as: 'roles',
        foreignKey: 'user_id'
      })
      
      User.hasMany(models.Status, {
        foreignKey: 'user_id',
        as: 'status'
      });
    }
  }
  User.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};