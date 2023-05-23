const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development'; //prod || dev
const config = require('../config/config')[env];
const db = {};

//sequelize는 node와 mysql을 연결해줌
const sequelize = new Sequelize(config.database, config.username, config.password, config);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
