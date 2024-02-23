'use strict';
import { Model, Optional, DataTypes } from 'sequelize';
import db from '../models/index';

type UserAttributes = {
  id: string,
  email: string,
  password: string,
  userName: string,
  salt: string,
  createdAt: string,
  updatedAt: string
};

type UserCreationAttributes = Optional<UserAttributes, 'id'>;

class User extends Model<UserAttributes, UserCreationAttributes> {
  declare id: string;
  declare email: string;
  declare password: string;
  declare userName: string;
  declare salt: string;
  declare createdAt: string;
  declare updatedAt: string;
}

  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  },
  {
    sequelize: db.sequelize,
    tableName: 'users'
  });

export default User