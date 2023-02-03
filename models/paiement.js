'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class paiement extends Model {
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
  paiement.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    etablisseur: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false
    },
    naturedépence: {
      type: DataTypes.STRING,
      allowNull: false
    },
    modepaiement: {
      type: DataTypes.STRING,
      allowNull: false
    },

    piecejointe: DataTypes.STRING,

    nombenef: {
      type: DataTypes.STRING,
      allowNull: false
    },
    adressebenef: {
      type: DataTypes.STRING,
      allowNull: false
    },

    libellé: DataTypes.STRING,

    montantchiffre: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    montantlettre: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'paiement',
  });
  return paiement;
};