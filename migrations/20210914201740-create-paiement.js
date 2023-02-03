'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('paiements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
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
      piecejointe: {
        type: DataTypes.STRING
      },
      nombenef: {
        type: DataTypes.STRING,
        allowNull: false
      },
      adressebenef: {
        type: DataTypes.STRING,
        allowNull: false
      },
      libellé: {
        type: DataTypes.STRING
      },
      montantchiffre: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      montantlettre: {
        type: DataTypes.STRING,
        allowNull: false
      },
      demandeId: {
        type: DataTypes.INTEGER,
        // allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('paiements');
  }
};