const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Artist extends Model {}

Artist.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    artist_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    albums: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    discogrophy: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      genere: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      top_charted: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'artist',
  }
);

module.exports = Artist;