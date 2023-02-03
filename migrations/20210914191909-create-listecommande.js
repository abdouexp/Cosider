'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('listecommandes', {
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
      item: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      unitémesure: {
        type: DataTypes.STRING
      },
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
      },
      commandeId: {
        type: DataTypes.INTEGER,
        allowNull: false
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
    await queryInterface.dropTable('listecommandes');
  }
};