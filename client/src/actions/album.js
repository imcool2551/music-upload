import api from '../apis/api';
import axios from 'axios';
import history from '../history';
import { CREATE_ALBUM } from './types';

export const createAlbum =
  ({ albumName, albumImage, songs }) =>
  async (dispatch) => {
    try {
      console.log(albumImage, '\n', albumName, '\n', songs);
      /* 1. 앨범 레코드 생성  */
      const { data: albumData } = await api.post('/api/album', {
        name: albumName,
      });
      console.log(albumData);

      /* 2. 앨범 커버 이미지, 음원 파일을 위한 presigned-url 생성 */
      const { data: imageData } = await api.get('/api/upload/image', {
        params: {
          filename: `${albumData.album.id}/${encodeURIComponent(albumName)}`,
        },
      });
      console.log(imageData);
      const audioDataArray = await Promise.all(
        songs.map((song) => {
          return new Promise((resolve, reject) => {
            api
              .get('/api/upload/audio', {
                params: {
                  filename: `${albumData.album.id}/${encodeURIComponent(
                    song.file.name
                  )}`,
                },
              })
              .then(({ data }) => resolve(data))
              .catch(reject);
          });
        })
      );
      console.log(audioDataArray);

      /* 3. S3 버킷에 이미지, 음원 파일 저장 */
      await axios.put(imageData.presignedUrl, albumImage, {
        headers: {
          'Content-Type': albumImage.type,
        },
      });
      await Promise.all(
        audioDataArray.map((audioData, index) => {
          axios.put(audioData.presignedUrl, songs[index].file, {
            headers: {
              'Content-Type': songs[index].file.type,
            },
          });
        })
      );

      /* 4. 앨범 레코드 업데이트 */
      const album = await api.patch(`/api/album/${albumData.album.id}`, {
        thumbnailPath: imageData.path,
        songs: songs.map((song, index) => {
          return Object.assign(
            {},
            { title: song.title, artistName: song.artistName },
            { filePath: audioDataArray[index].path }
          );
        }),
      });

      dispatch({ type: CREATE_ALBUM, payload: album });
      alert('앨범을 추가했습니다');
      history.push('/');
    } catch (err) {
      alert(err.response.data.message);
    }
  };
