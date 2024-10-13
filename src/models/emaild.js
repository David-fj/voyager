'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Emaild extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Emaild.init({
    host: DataTypes.STRING,
    port: DataTypes.INTEGER,
    secure: DataTypes.BOOLEAN,
    user: DataTypes.STRING,
    pass: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Emaild',
  });
  return Emaild;
};