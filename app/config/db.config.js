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

require('./sequelize_adapter.js')

db.User_info = require('../models/user_info.js')(sequelize, Sequelize);
db.semester8 = require('../models/8th.model.js')(sequelize, Sequelize);
db.semester7 = require('../models/7th.model.js')(sequelize, Sequelize);
db.semester6 = require('../models/6th.model.js')(sequelize, Sequelize);
db.semester5 = require('../models/5th.model.js')(sequelize, Sequelize);
db.semester4 = require('../models/4th.model.js')(sequelize, Sequelize);
db.semester3 = require('../models/3rd.model.js')(sequelize, Sequelize);
db.semester2 = require('../models/2nd.model.js')(sequelize, Sequelize);
db.semester1 = require('../models/1st.model.js')(sequelize, Sequelize);
db.user_cookie = require('../models/user_cookie.js')(sequelize, Sequelize);
db.user_data = require('../models/user_data.js')(sequelize, Sequelize);
db.subject_data = require('../models/subject_data.js')(sequelize, Sequelize);
db.notice_data = require('../models/notice_data.js')(sequelize, Sequelize);

module.exports = {
  db,
  sequelize
}