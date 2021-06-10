const Sequelize = require('sequelize');

module.exports = class Song extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
        filePath: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        artistName: {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: 'Song',
        tableName: 'songs',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    db.Song.belongsTo(db.Album);
  }
};
