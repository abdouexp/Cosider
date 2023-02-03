'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class demande extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ listedemande, commande, paiement, reception, remise }) {
      // define association here
      this.hasMany(listedemande, { foreignKey: 'demandeId', as: 'listedemande' })
      this.hasOne(commande, { foreignKey: 'demandeId', as: 'commande' })
      this.hasOne(paiement, { foreignKey: 'demandeId', as: 'paiement' })
      this.hasOne(reception, { foreignKey: 'demandeId', as: 'reception' })
      this.hasOne(remise, { foreignKey: 'demandeId', as: 'remise' })
    }

    toJSON(){
      return { ...this.get(), id: undefined }
    }
  };
  demande.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false
    },
    service: {
      type: DataTypes.STRING,
      allowNull: false
    },
    etat: {
      type: DataTypes.STRING,
      defaultValue: "envoyé",
      allowNull: false
    },
    traitement: {
      type: DataTypes.STRING,
      defaultValue: "nonTraité",
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'demande',
  });
  return demande;
};