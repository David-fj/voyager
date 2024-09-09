'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Aulas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Aulas.init({
    urlvideo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Aulas',
  });
  return Aulas;
};