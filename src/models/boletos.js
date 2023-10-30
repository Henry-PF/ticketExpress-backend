const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('boletos', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    id_ruta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'rutas',
        key: 'id'
      }
    },
    id_statud: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'statud',
        key: 'id'
      }
    },
    id_empresa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'empresas',
        key: 'id'
      }
    },
    id_pasajero: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'pasajeros',
        key: 'id'
      }
    },
    /* id_asiento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'asientos',
        key: 'id'
      }
    }, */
    costo: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'boletos',
    schema: 'public',
    timestamps: false,
    
    indexes: [
      {
        name: "boletos_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
