const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('reserva', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true, 
        },
        id_ruta: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'rutas',
              key: 'id'
            }
        },
        id_user: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'usuarios',
              key: 'id'
            }
        },
        cantidadPasajeros: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        precio: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        viajeIdayVuelta: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        id_statud: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'statud',
              key: 'id'
            }
        },
        refPago: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pagada: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    }, {
        sequelize,
        tableName: 'reserva',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: "reserva_pkey",
            unique: true,
            fields: [
              { name: "id" },
            ]
          },
        ]
    })
}