import React from 'react';
import { connect } from 'react-redux';

const baseUrl = 'https://artists-card-2021.s3.ap-northeast-2.amazonaws.com/';

const SongItem = ({ song }) => {
  return (
    <div className="ui card" style={{ margin: '1rem' }}>
      <a href={baseUrl + song.filePath} target="_blank">
        <div className="image">
          <img
            style={{ width: '290px', height: '290px' }}
            src={baseUrl + song.album.thumbnailPath}
            alt=""
          />
        </div>
        <div className="content" style={{ padding: '1rem' }}>
          <h4>앨범: {song.album.name}</h4>
          <h4>제목: {song.title}</h4>
          <h4>아티스트: {song.artistName}</h4>
        </div>
      </a>
      <div className="extra content">
        음원 파일 변경
        <input type="file" placeholder="Add Comment..." />
        <div className="right floated">
          <button className="ui yellow basic button">수정</button>
        </div>
      </div>
    </div>
  );
};

{
  /*  */
}

const SongList = ({ songs }) => {
  return (
    <div className="ui link cards" style={{ margin: '1rem' }}>
      {songs.map((song) => (
        <SongItem key={song.id} song={song} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    songs: state.songs,
  };
};

export default connect(mapStateToProps)(SongList);
