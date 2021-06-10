const passport = require('passport');
const local = require('./localStrategy');

const { User } = require('../db/models');

module.exports = () => {
  passport.serializeUser((user, done) => {
    console.log('Serialize');
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    console.log('Deserialize');
    try {
      const user = await User.findOne({
        where: { id },
      });
      done(null, user);
    } catch (err) {
      console.error(err);
      done(err);
    }
  });

  local();
};
