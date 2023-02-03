'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class remise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ demande }) {
      // define association here
      this.belongsTo(demande, { foreignKey: 'demandeId', as: 'demande' })
    }

    toJSON(){
      return { ...this.get(), id: undefined }
    }
  };
  remise.init({
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
    details: {
      type: DataTypes.STRING,
      allowNull: false
    },
    observations: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false
    },
    prenom: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fonction: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date2: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'remise',
  });
  return remise;
};