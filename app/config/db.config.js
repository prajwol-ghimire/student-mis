const env = require('./env.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,
 
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});
 
const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User_info = require('../models/user_info.js')(sequelize, Sequelize);
db.Result = require('../models/3rd.model.js')(sequelize, Sequelize);
db.Result = require('../models/2nd.model.js')(sequelize, Sequelize);
db.Result = require('../models/1st.model.js')(sequelize, Sequelize);
db.User_cookie = require('../models/user_cookie.js')(sequelize, Sequelize);

module.exports = db;