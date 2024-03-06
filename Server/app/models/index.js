const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model")(sequelize, Sequelize);
db.sacco = require("./sacco.model")(sequelize, Sequelize);
db.officials = require("./officials.model")(sequelize, Sequelize);
db.stations = require("./stations.model")(sequelize, Sequelize);
db.charge = require("./charge.model")(sequelize, Sequelize);
db.vehicles = require("./fleet/vehicles.model")(sequelize, Sequelize);
db.operator = require("./fleet/operator.model")(sequelize, Sequelize);


module.exports = db;
