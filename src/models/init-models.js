var DataTypes = require("sequelize").DataTypes;
var _boletos = require("./boletos");
var _buses = require("./buses");
var _buses_empresa = require("./buses_empresa");
var _buses_rutas = require("./buses_rutas");
var _buses_servicios = require("./buses_servicios");
var _ciudades = require("./ciudades");
var _datos = require("./datos");
var _empresas = require("./empresas");
var _pago_boletos = require("./pago_boletos");
var _pasajeros = require("./pasajeros");
var _provincias = require("./provincias");
var _rutas = require("./rutas");
var _rutas_empresa = require("./rutas_empresa");
var _servicios = require("./servicios");
var _statud = require("./statud");
var _terminales = require("./terminales");
var _usuarios = require("./usuarios");

var _asientos = require('./asientos')

var _reserva = require("./reserva");


function initModels(sequelize) {
  var datos = _datos(sequelize, DataTypes);
  var provincias = _provincias(sequelize, DataTypes);
  var statud = _statud(sequelize, DataTypes);
  var ciudades = _ciudades(sequelize, DataTypes);
  var terminales = _terminales(sequelize, DataTypes);
  var rutas = _rutas(sequelize, DataTypes);
  var servicios = _servicios(sequelize, DataTypes);
  var empresas = _empresas(sequelize, DataTypes);
  var pasajeros = _pasajeros(sequelize, DataTypes);
  var boletos = _boletos(sequelize, DataTypes);
  var buses = _buses(sequelize, DataTypes);
  var buses_empresa = _buses_empresa(sequelize, DataTypes);
  var buses_rutas = _buses_rutas(sequelize, DataTypes);
  var buses_servicios = _buses_servicios(sequelize, DataTypes);
  var pago_boletos = _pago_boletos(sequelize, DataTypes);
  var rutas_empresa = _rutas_empresa(sequelize, DataTypes);
  var usuarios = _usuarios(sequelize, DataTypes);

  var asientos = _asientos(sequelize, DataTypes)

  var reserva = _reserva(sequelize, DataTypes);


  buses.belongsToMany(empresas, { through: buses_empresa, foreignKey: "id_bus", otherKey: "id_empresa" });
  buses.belongsToMany(rutas, { through: buses_rutas, foreignKey: "id_bus", otherKey: "id_ruta" });
  buses.belongsToMany(servicios, { through: buses_servicios, foreignKey: "id_bus", otherKey: "id_servicio" });
  empresas.belongsToMany(buses, { through: buses_empresa, foreignKey: "id_empresa", otherKey: "id_bus" });
  empresas.belongsToMany(rutas, { through: rutas_empresa, foreignKey: "id_empresa", otherKey: "id_ruta" });
  rutas.belongsToMany(buses, { through: buses_rutas, foreignKey: "id_ruta", otherKey: "id_bus" });
  rutas.belongsToMany(empresas, { through: rutas_empresa, foreignKey: "id_ruta", otherKey: "id_empresa" });
  servicios.belongsToMany(buses, { through: buses_servicios, foreignKey: "id_servicio", otherKey: "id_bus" });
  pago_boletos.belongsTo(boletos, { foreignKey: "id_boleto" });
  boletos.hasOne(pago_boletos, { foreignKey: "id_boleto" });
  buses_empresa.belongsTo(buses, { foreignKey: "id_bus" });
  buses.hasMany(buses_empresa, { foreignKey: "id_bus" });
  buses_rutas.belongsTo(buses, { foreignKey: "id_bus" });
  buses.hasMany(buses_rutas, { foreignKey: "id_bus" });
  buses_servicios.belongsTo(buses, { foreignKey: "id_bus" });
  buses.hasMany(buses_servicios, { foreignKey: "id_bus" });
  terminales.belongsTo(ciudades, { foreignKey: "id_ciudad" });
  ciudades.hasMany(terminales, { foreignKey: "id_ciudad" });
  empresas.belongsTo(datos, { foreignKey: "id_datos" });
  datos.hasMany(empresas, { foreignKey: "id_datos" });
  pasajeros.belongsTo(datos, { foreignKey: "id_datos" });
  datos.hasMany(pasajeros, { foreignKey: "id_datos" });
  usuarios.belongsTo(datos, { foreignKey: "id_datos" });
  datos.hasMany(usuarios, { foreignKey: "id_datos" });
  boletos.belongsTo(empresas, { foreignKey: "id_empresa" });
  empresas.hasMany(boletos, { foreignKey: "id_empresa" });
  buses_empresa.belongsTo(empresas, { foreignKey: "id_empresa" });
  empresas.hasMany(buses_empresa, { foreignKey: "id_empresa" });
  rutas_empresa.belongsTo(empresas, { foreignKey: "id_empresa" });
  empresas.hasMany(rutas_empresa, { foreignKey: "id_empresa" });
  boletos.belongsTo(pasajeros, { foreignKey: "id_pasajero" });
  pasajeros.hasMany(boletos, { foreignKey: "id_pasajero" });
  ciudades.belongsTo(provincias, { foreignKey: "id_provincia" });
  provincias.hasMany(ciudades, { foreignKey: "id_provincia" });
  boletos.belongsTo(rutas, { foreignKey: "id_ruta" });
  rutas.hasMany(boletos, { foreignKey: "id_ruta" });
  buses_rutas.belongsTo(rutas, { foreignKey: "id_ruta" });
  rutas.hasMany(buses_rutas, { foreignKey: "id_ruta" });
  rutas_empresa.belongsTo(rutas, { foreignKey: "id_ruta" });
  rutas.hasMany(rutas_empresa, { foreignKey: "id_ruta" });
  buses_servicios.belongsTo(servicios, { foreignKey: "id_servicio" });
  servicios.hasMany(buses_servicios, { foreignKey: "id_servicio" });
  boletos.belongsTo(statud, { foreignKey: "id_statud" });
  statud.hasMany(boletos, { foreignKey: "id_statud" });
  buses.belongsTo(statud, { foreignKey: "id_statud" });
  statud.hasMany(buses, { foreignKey: "id_statud" });
  empresas.belongsTo(statud, { foreignKey: "id_statud" });
  statud.hasMany(empresas, { foreignKey: "id_statud" });
  pasajeros.belongsTo(statud, { foreignKey: "id_statud" });
  statud.hasMany(pasajeros, { foreignKey: "id_statud" });
  rutas.belongsTo(statud, { foreignKey: "id_statud" });
  statud.hasMany(rutas, { foreignKey: "id_statud" });
  servicios.belongsTo(statud, { foreignKey: "id_statud" });
  statud.hasMany(servicios, { foreignKey: "id_statud" });
  terminales.belongsTo(statud, { foreignKey: "id_statud" });
  statud.hasMany(terminales, { foreignKey: "id_statud" });
  usuarios.belongsTo(statud, { foreignKey: "id_statud" });
  statud.hasMany(usuarios, { foreignKey: "id_statud" });
  rutas.belongsTo(terminales, { foreignKey: "destino" });
  terminales.hasMany(rutas, { foreignKey: "destino" });
  rutas.belongsTo(terminales, { foreignKey: "origen" });
  terminales.hasMany(rutas, { foreignKey: "origen" });

  asientos.belongsTo(buses, { foreignKey: "id_buses" });
  buses.hasMany(asientos, { foreignKey: "id_buses" });


  usuarios.hasMany(reserva, { foreignKey: "usuarioId" });
  reserva.belongsTo(usuarios, { foreignKey: "usuarioId" });


  return {
    asientos,
    boletos,
    buses,
    buses_empresa,
    buses_rutas,
    buses_servicios,
    ciudades,
    datos,
    empresas,
    pago_boletos,
    pasajeros,
    provincias,
    rutas,
    rutas_empresa,
    servicios,
    statud,
    terminales,
    usuarios,
    reserva,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
