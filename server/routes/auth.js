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
    await User.create({
      userId,
      password: hashedPassword,
      nickname,
    });
    return res.status(201).json({ message: '회원가입이 완료되었습니다' });
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
      console.log(info);
      return res.status(401).json({ message: info.message });
    }
    return req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.json({ nickname: req.user.nickname });
    });
  })(req, res, next);
});

router.get('/api/auth/logout', isLoggedIn, (req, res, next) => {
  req.logout();
  res.json({ message: '로그아웃 성공' });
});

router.get('/api/auth/user', isLoggedIn, (req, res, next) => {
  res.json({ nickname: req.user.nickname });
});

router.patch('/api/auth/user', isLoggedIn, async (req, res, next) => {
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
      return res.status(401).json({ message: '비밀번호가 일치하지 않습니다' });
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
    res.json({ message: '비밀번호가 업데이트 되었습니다' });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
