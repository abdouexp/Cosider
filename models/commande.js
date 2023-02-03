'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class commande extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ listecommande, demande }) {
      // define association here
      this.hasMany(listecommande, { foreignKey: 'commandeId', as: 'listecommande' })
      this.belongsTo(demande, { foreignKey: 'demandeId', as: 'demande' })
    }

    toJSON(){
      return { ...this.get(), id: undefined }
    }
  };
  commande.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dateliv: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fournisseur: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lieu: {
      type: DataTypes.STRING,
      allowNull: false
    },
    conditions: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: 'commande',
  });
  return commande;
};