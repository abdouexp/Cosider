'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post }) {
      // define association here
      this.hasMany(Post, { foreignKey: 'userId', as: 'posts' })
    }

    toJSON(){
      return { ...this.get(), id: undefined }
    }
  };
  User.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a name' }, // wela true berk
          notEmpty: { msg: 'Name must not be empty' }
        }
        
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a username' }, // wela true berk
          notEmpty: { msg: 'Username must not be empty' }
        }
        
      },
      email: {
        type: DataTypes.STRING,
        allowNull:false,
        
        },
      password: {
        type: DataTypes.STRING,
        allowNull:false,
        validate: {
          notNull:{ msg:'user must enter password'},
        }
          
          },

      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a role' }, // wela true berk
          notEmpty: { msg: 'Role must not be empty' }
        }
      },
  }, 
  {
    sequelize,
    tableName: 'users',
    modelName: 'User',
  });
  return User;
};