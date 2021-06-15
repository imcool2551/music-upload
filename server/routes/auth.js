const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');

const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { User } = require('../db/models');

router.post('/api/auth/signup', isNotLoggedIn, async (req, res, next) => {
  const { userId, password, nickname } = req.body;
  if (!userId || !password || !nickname) {
    return res.status(400).json({ message: '회원가입에 실패했습니다' });
  }
  try {
    const existingUser = await User.findOne({ where: { userId } });
    if (existingUser) {
      return res.status(400).json({ message: '이미 존재하는 아이디입니다' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      userId,
      password: hashedPassword,
      nickname,
    });

    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(201).json({
        message: '회원가입이 완료되었습니다',
        nickname: req.user.nickname,
      });
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post('/api/auth/login', isNotLoggedIn, async (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.json({ nickname: req.user.nickname });
    });
  })(req, res, next);
});

router.get('/api/auth/logout', isLoggedIn, (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.json({ message: '다시 로그인해주세요' });
});

router.get('/api/auth/user', isLoggedIn, (req, res, next) => {
  res.json({ nickname: req.user.nickname });
});

router.patch('/api/auth/changepassword', isLoggedIn, async (req, res, next) => {
  const { originalPassword, newPassword } = req.body;
  if (!originalPassword || !newPassword) {
    return res
      .status(400)
      .json({ message: '비밀번호 업데이트에 실패했습니다' });
  }
  try {
    const passwordMatch = await bcrypt.compare(
      originalPassword,
      req.user.password
    );
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ message: '현재 비밀번호가 일치하지 않습니다' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.update(
      {
        password: hashedPassword,
      },
      {
        where: { id: req.user.id },
      }
    );
    res.redirect(303, '/api/auth/logout');
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
