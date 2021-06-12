const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');

const { isLoggedIn } = require('../middlewares');
const { Album, Song, sequelize } = require('../db/models');

router.use(isLoggedIn);

/* CREATE 앨범  */
router.post('/api/album', async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: '앨범 이름을 지정해주세요' });
  }
  try {
    const album = await Album.create({
      name,
    });
    res.redirect(303, `/api/album/${album.id}`);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.patch('/api/album/:id', async (req, res, next) => {
  const { thumbnailPath, songs } = req.body;
  if (!thumbnailPath || !songs || !songs.length) {
    return res.status(400).json({ message: '이미지와 음원이 비었습니다' });
  }

  const t = await sequelize.transaction();
  try {
    let album = await Album.findByPk(req.params.id, { transaction: t });
    if (!album) {
      return res.status(404).json({ message: '존재하지 않는 앨범입니다' });
    }

    /* 1. 커버 이미지 파일 패스 삽입 */
    await Album.update(
      {
        thumbnailPath,
      },
      {
        where: { id: req.params.id },
        transaction: t,
      }
    );

    /* 2. 음원 파일 패스 삽입  */
    const songInstances = await Promise.all(
      songs.map((song) => {
        return Song.create(song, { transaction: t });
      })
    );
    await album.setSongs(songInstances, { transaction: t });

    /* 3. 음원 테이블 조인 뒤 앨범 레코드 응답 */
    album = await Album.findOne(
      {
        where: { id: req.params.id },
        include: [{ model: Song, as: 'songs' }],
      },
      {
        transaction: t,
      }
    );
    await t.commit();
    res.json({ album });
  } catch (err) {
    await t.rollback();
    console.error(err);
    next(err);
  }
});

/* READ 음원 (여러개) */
router.get('/api/album', async (req, res, next) => {
  let { q } = req.query || '';
  q = `${decodeURIComponent(q)}%`;

  try {
    const songs = await Song.findAll({
      where: {
        title: { [Op.like]: q },
      },
      include: [
        {
          model: Album,
          as: 'album',
        },
      ],
    });
    return res.json({ songs });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

/* READ 앨범 (1개) */
router.get('/api/album/:id', async (req, res, next) => {
  try {
    const album = await Album.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Song,
          as: 'songs',
        },
      ],
    });
    res.json({ album });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
