const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const { User } = require('../db/models');

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'userId',
        passwordField: 'password',
      },
      async (userId, password, done) => {
        try {
          const user = await User.findOne({
            where: { userId },
          });
          if (!user) {
            return done(null, false, { message: '존재하지 않는 유저입니다' });
          }
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            return done(null, false, {
              message: '비밀번호가 일치하지 않습니다',
            });
          }
          return done(null, user);
        } catch (err) {
          console.error(err);
          return done(err);
        }
      }
    )
  );
};
