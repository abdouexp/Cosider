'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class listedemande extends Model {
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
      return { ...this.get(), id: undefined, demandeId: undefined }
    }
  };
  listedemande.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    num: {
      type: DataTypes.STRING,
      allowNull: false
    },
    désignation: {
      type: DataTypes.STRING,
      allowNull: false
    },

    unitémesure: DataTypes.STRING,
    
    quantitédem: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quantitéliv: {
      type: DataTypes.STRING,
      allowNull: false
    },
    observation: DataTypes.STRING
  },
  {
    sequelize,
    modelName: 'listedemande',
  });
  return listedemande;
};