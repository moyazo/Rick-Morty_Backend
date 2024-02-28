'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Location.belongsToMany(models.Character, {
        through: 'CharacterLocation',
        as: 'characterLocations',
        foreignKey: 'locationId',
    });
    }
  }
  Location.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    locationName: {
      type: DataTypes.STRING,
      allowNull:false
    },
    place: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dimension: {
      type: DataTypes.STRING,
      allowNull: false
    },
    residents: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
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
    modelName: 'Location',
  });
  return Location;
};