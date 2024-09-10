'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conteudo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Conteudo.init({
    mensagem: DataTypes.STRING,
    img: DataTypes.STRING,
    idaula: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Conteudo',
  });
  return Conteudo;
};