'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('commandes', {
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
      conditions: {
        type: DataTypes.STRING
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
    await queryInterface.dropTable('commandes');
  }
};