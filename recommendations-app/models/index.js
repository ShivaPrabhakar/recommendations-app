const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  `${dbConfig.host}/${dbConfig.database}`,
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./users.model.js")(sequelize, Sequelize, db);
db.recommendations = require("./recommendations.model.js")(sequelize, Sequelize, db);
db.collections = require("./collections.model.js")(sequelize, Sequelize, db);
db.collection_recommendations = require("./collection_recommendations.model.js")(sequelize, Sequelize, db);

module.exports = db;