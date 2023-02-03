'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('receptions', {
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
      observation: {
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
    await queryInterface.dropTable('receptions');
  }
};