const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('datos', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    correo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    dni: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    cuit: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    direccion: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    telefono: {
      type: DataTypes.STRING(15),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'datos',
    schema: 'public',
    timestamps: false,
    ssl: '[object Object]',
    indexes: [
      {
        name: "datos_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
