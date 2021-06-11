const validate = (values) => {
  const errors = {};
  if (!values.albumName) {
    errors.albumName = '앨범 이름을 입력해주세요';
  }
  if (!values.albumImage) {
    errors.albumImage = '앨범 커버 이미지를 선택해주세요';
  }
  if (!values.songs || !values.songs.length) {
    errors.songs = { _error: '최소 1곡 이상 선택해주세요' };
  } else {
    const songErrorsArray = [];
    values.songs.forEach((song, songIndex) => {
      const songErrors = {};
      if (!song || !song.title) {
        songErrors.title = '노래 제목을 입력해주세요';
        songErrorsArray[songIndex] = songErrors;
      }
      if (!song || !song.artistName) {
        songErrors.artistName = '가수 이름을 입력해주세요';
        songErrorsArray[songIndex] = songErrors;
      }
      if (!song || !song.file) {
        songErrors.file = '음원 파일을 선택해주세요';
        songErrorsArray[songIndex] = songErrors;
      }
    });
    if (songErrorsArray.length) {
      errors.songs = songErrorsArray;
    }
  }
  return errors;
};

export default validate;
