const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('usuarios', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      aitoIncrement: true,
    },
    nick: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "usuarios_nick_key"
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    id_statud: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'statud',
        key: 'id'
      }
    },
    id_datos: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'datos',
        key: 'id'
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'usuarios',
    schema: 'public',
    timestamps: false,
    ssl: '[object Object]',
    indexes: [
      {
        name: "usuarios_nick_key",
        unique: true,
        fields: [
          { name: "nick" },
        ]
      },
      {
        name: "usuarios_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
