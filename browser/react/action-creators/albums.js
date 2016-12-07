import {RECEIVE_ALBUMS, RECEIVE_ALBUM} from '../constants';

export const receiveAlbums = function (albums) {
  return {
    type: RECEIVE_ALBUMS,
    albums: albums
  }
}

export const receiveAlbum = function (album) {
  return {
    type: RECEIVE_ALBUM,
    selectedAlbum: album
  }
}
