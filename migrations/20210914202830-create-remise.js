'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('remises', {
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
    await queryInterface.dropTable('remises');
  }
};