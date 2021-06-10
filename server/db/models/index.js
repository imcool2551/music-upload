const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];
const User = require('./user');
const Album = require('./album');
const Song = require('./song');

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.User = User;
db.Album = Album;
db.Song = Song;

User.init(sequelize);
Album.init(sequelize);
Song.init(sequelize);

User.associate(db);
Album.associate(db);
Song.associate(db);

module.exports = db;
