import React from 'react';
import Songs from '../components/Songs';
import {selectAlbum, toggleOne} from '../action-creators/async';

class Album extends React.Component {

  componentDidMount () {
    const albumId = this.props.routeParams.albumId;

    store.dispatch(selectAlbum(albumId));
  }

  render () {
    const album = this.props.albums.selectedAlbum;
    const currentSong = this.props.player.currentSong;
    const isPlaying = this.props.player.isPlaying;

    return (
      <div className="album">
        <div>
          <h3>{ album.name }</h3>
          <img src={ album.imageUrl } className="img-thumbnail" />
        </div>
        <Songs
          songs={album.songs}
          currentSong={currentSong}
          isPlaying={isPlaying}
          toggleOne={toggleOne} />
      </div>
    );
  }
}

export default Album;
