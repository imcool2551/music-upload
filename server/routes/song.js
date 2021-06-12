const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../middlewares');
const { Album, Song, sequelize } = require('../db/models');

router.use(isLoggedIn);

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
    const album = await Album.findOne(
      {
        where: { id: req.params.id },
      },
      { transaction: t }
    );
    if (!album) {
      return res.status(404).json({ message: '존재하지 않는 앨범입니다' });
    }
    await Album.update(
      {
        thumbnailPath,
      },
      {
        where: { id: req.params.id },
        transaction: t,
      }
    );
    const songInstances = await Promise.all(
      songs.map((song) => {
        return Song.create(song, { transaction: t });
      })
    );
    await album.setSongs(songInstances, { transaction: t });
    await t.commit();

    res.json({ album });
  } catch (err) {
    await t.rollback();
    console.error(err);
    next(err);
  }
});

module.exports = router;
