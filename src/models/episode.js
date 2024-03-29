'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Episode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Episode.belongsToMany(models.Character, {
        through: 'CharacterEpisode',
        as: 'characterEpisodes',
        foreignKey: 'episodeId',
      });
    }
  }
  Episode.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    episodeId: {
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    episodeName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    air_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    episodeCode: {
      type: DataTypes.STRING,
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
  }, {
    sequelize,
    modelName: 'Episode',
  });
  return Episode;
};