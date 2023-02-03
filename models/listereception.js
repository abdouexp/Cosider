'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class listereception extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ reception }) {
      // define association here
      this.belongsTo(reception, { foreignKey: 'receptionId', as: 'reception' })
    }

    toJSON(){
      return { ...this.get(), id: undefined }
    }
  };
  listereception.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    num: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    designation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quantité: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'listereception',
  });
  return listereception;
};