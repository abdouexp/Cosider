'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('listedemandes', {
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
      num: {
        type: DataTypes.STRING,
        allowNull: false
      },
      désignation: {
        type: DataTypes.STRING,
        allowNull: false
      },
      unitémesure: {
        type: DataTypes.STRING
      },
      quantitédem: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      quantitéliv: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      observation: {
        type: DataTypes.STRING
      },
      demandeId: {
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
    await queryInterface.dropTable('listedemandes');
  }
};