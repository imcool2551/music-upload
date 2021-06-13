import React, { useState } from 'react';
import { connect } from 'react-redux';

import { updateSong } from '../../actions/album';

const baseUrl = 'https://artists-card-2021.s3.ap-northeast-2.amazonaws.com/';

const SongItem = ({ song, updateSong }) => {
  const [title, setTitle] = useState(song.title);
  const [artistName, setArtistName] = useState(song.artistName);
  const [file, setFile] = useState(null);

  const handleSubmit = () => {
    updateSong({ song, title, artistName, file });
  };

  return (
    <div className="ui card" style={{ margin: '1rem' }}>
      <div className="image">
        <img
          style={{ width: '290px', height: '290px' }}
          src={baseUrl + song.album.thumbnailPath}
          alt=""
        />
      </div>
      <div className="content" style={{ padding: '1rem' }}>
        <h4>앨범: {song.album.name}</h4>
        <div class="ui labeled input">
          <div class="ui label">제목</div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="ui labeled input">
          <div className="ui label">가수</div>
          <input
            type="text"
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
          />
        </div>
      </div>
      <div className="extra content">
        음원 파일 변경
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <div className="right floated">
          <button
            className="ui yellow basic button"
            onClick={() => handleSubmit(song.id)}
          >
            수정
          </button>
        </div>
      </div>
      <a href={baseUrl + song.filePath} target="_blank">
        <div className="ui bottom attached button">듣기</div>
      </a>
    </div>
  );
};

const SongList = ({ songs, updateSong }) => {
  return (
    <>
      {songs.map((song) => (
        <SongItem key={song.id} song={song} updateSong={updateSong} />
      ))}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    songs: Object.values(state.songs),
    updateSong,
  };
};

export default connect(mapStateToProps, { updateSong })(SongList);
