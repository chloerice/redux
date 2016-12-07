/* BUT WAIT THERE'S MORE! (may be helpful later on!) */
import {setLyrics} from './lyrics';
import {startPlaying, stopPlaying, setList, setCurrentSong} from './player';
import {receiveAlbums, receiveAlbum} from './albums';
import {skip, convertAlbum, convertAlbums, convertSong} from '../utils';
import axios from 'axios';
import AUDIO from '../audio';

//LYRICS METHOD
export const fetchLyrics = (artist, song) => (dispatch) => {
  axios.get(`/api/lyrics/${artist}/${song}`)
    .then(res => {
      dispatch(setLyrics(res.data.lyric));
    });
};

//ALBUM(S) METHODS
export const selectAlbums = () => {
  return dispatch => {
    axios.get('/api/albums')
      .then(res => res.data)
      .then(albums => dispatch(receiveAlbums(convertAlbums(albums))))
  }
}

export const selectAlbum = (albumId) => {
  return dispatch => {
    axios.get(`/api/albums/${albumId}`)
      .then(res => res.data)
      .then(album => dispatch(receiveAlbum(convertAlbum(album))
      ));
  }
}

//PLAYER METHODS
export const play = () => {
  return dispatch => {
    // side effects, like using the audio element belong in async action creators too, even if they aren't "async"
    AUDIO.play()
    dispatch(startPlaying());
  }
}

export const pause = () => {
  return dispatch => {
    AUDIO.pause()
    dispatch(stopPlaying());
  }
}

export const load = (currentSong, currentSongList) => {
  return dispatch => {
    AUDIO.src = currentSong.audioUrl;
    AUDIO.load()
    dispatch(setCurrentSong(currentSong));
    dispatch(setList(currentSongList));
  }
}

export const startSong = (song, songList) => {
  return dispatch => {
    dispatch(pause());
    dispatch(load(song, songList));
    dispatch(play());
  }
}

export const toggle = () => (dispatch, getState) => {
  const { isPlaying } = getState();
  if (isPlaying) dispatch(pause());
  else dispatch(play());
};

export const toggleOne = (selectedSong, selectedSongList) => (dispatch, getState) => {
    const {currentSong} = getState().player;
    if (selectedSong.id !== currentSong.id) {
      dispatch(startSong(selectedSong, selectedSongList));
    } else {
      dispatch(toggle());
    }
}

export const next = () => (dispatch, getState) => {
  dispatch(startSong(...skip(1, getState().player)));
};

export const prev = () => (dispatch, getState) => {
  dispatch(startSong(...skip(-1, getState().player)));
};

//EXAMPLE
// export const doSeveralThings = (stuffId, thingsId) => {
//   return dispatch => {
//     // we can also use async action creators to compose several actions into one!
//     dispatch(doStuff(stuffId));
//     dispatch(doThing(thingId));
//   }
// }
