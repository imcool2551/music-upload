const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const s3 = require('../config/aws-s3');

const { isLoggedIn } = require('../middlewares');
const { Album, Song, sequelize } = require('../db/models');

router.use(isLoggedIn);

/* 앨범 생성 */
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

    /* 2. 음원 파일들 패스 삽입  */
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

/* 음원 조회 */
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

/* 앨범 조회 */
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

/* 음원 수정 */
router.patch('/api/song/:id', async (req, res, next) => {
  const { title, artistName, filePath } = req.body;
  if (!title || !artistName) {
    return res
      .status(400)
      .json({ message: '노래 제목과 가수이름을 명시해주세요' });
  }

  try {
    const song = await Song.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Album,
          as: 'album',
        },
      ],
    });

    if (!song) {
      return res.status(404).json({ message: '존재하지 않는 곡입니다' });
    }

    /* 음원파일 변경이 있다면, s3 버킷에서 이전 파일 삭제 */
    if (filePath) {
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: song.filePath,
      };
      await s3.deleteObject(params).promise();
      song.filePath = filePath;
    }

    song.title = title;
    song.artistName = artistName;
    const updatedSong = await song.save();

    res.json(updatedSong);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
