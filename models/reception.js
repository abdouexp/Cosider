'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reception extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ listereception, demande }) {
      // define association here
      this.hasMany(listereception, { foreignKey: 'receptionId', as: 'listereception' })
      this.belongsTo(demande, { foreignKey: 'demandeId', as: 'demande' })
    }

    toJSON(){
      return { ...this.get(), id: undefined }
    }
  };
  reception.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    site: {
      type: DataTypes.STRING,
      allowNull: false
    },
    codearticle: {
      type: DataTypes.STRING,
      allowNull: false
    },
    numfacture: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false
    },
    observation: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: 'reception',
  });
  return reception;
};