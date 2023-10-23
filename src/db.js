"use strict";

require("dotenv").config();
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const initModels = require("./models/init-models");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/config/config.json")[env];
const { DB_URL } = process.env;
const db = [];


 let sequelize;
 if (config.use_env_variable) {
   sequelize = new Sequelize(
     DB_URL,
     {
       logging: true,
       native: false,
       dialectOptions: {
         ssl: {
           require: 'true'
         }
       }
     }
   );
 } else {
   sequelize = new Sequelize(
     config.database,
     config.username,
     config.password,
     config
   );
 }


fs.readdirSync(path.join(__dirname, "/models"))
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );     
  })
  .forEach((file) => {
    db.push(require(path.join(__dirname, "/models", file)));
  });
  
db.forEach((modelName) => modelName(sequelize, Sequelize.DataTypes));

sequelize.models = initModels.initModels(sequelize);

console.log(sequelize.models, 'SEQUELIZE.MODELS')
module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
