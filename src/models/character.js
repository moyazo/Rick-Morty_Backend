'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Character extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Character.belongsTo(models.Episode); // Un personaje pertenece a un episodio
      models.Character.belongsToMany(models.Location, {
          through: 'CharacterLocation',
          as: 'characterLocations',
        foreignKey: 'characterId',
      });
    }
  }
  Character.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    characterName: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    characterStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    species: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gender: {
      type: DataTypes.JSON({
        type: DataTypes.STRING,
        url: DataTypes.STRING
      }),
      allowNull: false
    },
    origin: {
      type: DataTypes.JSON({
        place: DataTypes.STRING,
        url: DataTypes.STRING
      }),
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    episode: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'Character',
  });
  return Character;
};