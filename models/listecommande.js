'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class listecommande extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ commande }) {
      // define association here
      this.belongsTo(commande, { foreignKey: 'commandeId', as: 'commande' })
    }

    toJSON(){
      return { ...this.get(), id: undefined }
    }
  };
  listecommande.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    item: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },

    unitémesure: DataTypes.STRING,
    
    quantité: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    prixunit: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    prixtot: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'listecommande',
  });
  return listecommande;
};