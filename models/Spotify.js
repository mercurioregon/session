const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');
const { DataTypes } = require('sequelize/types');

class Spotify extends Model {
    authCheck(auth) {
        return bcrypt.compareSync(auth, this.password);
    }
}

Spotify.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
        token: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: `spotify`,
    }
);

module.exports = Spotify;