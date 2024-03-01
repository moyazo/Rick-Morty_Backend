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
      models.Character.belongsToMany(models.Episode, {
          through: 'CharacterEpisode',
          as: 'characterEpisodes',
          foreignKey: 'characterId',
      });
      models.Character.belongsToMany(models.Location, {
        through: 'CharacterLocation',
        as: 'characterLocation',
        foreignKey: 'locationId',
    });
    }
  }
  Character.init({
    id: {
      allowNull: false,
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    characterId: {
      type: DataTypes.INTEGER,
      allowNull:false,
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
    image: {
      type: DataTypes.STRING,
      allowNull: false
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