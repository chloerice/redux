/* BUT WAIT THERE'S MORE! (may be helpful later on!) */
import {setLyrics, setProgress, startPlaying, stopPlaying, setList, setCurrentSong} from './lyrics';
import {skip} from '../utils';
import axios from 'axios';
import AUDIO from '../audio';

export const fetchLyrics = function (artist, song) {
  return function (dispatch, getState) {
    axios.get(`/api/lyrics/${artist}/${song}`)
      .then(res => {
        dispatch(setLyrics(res.data.lyric));
      });
  };
};

export const fetchAlbumsFromServer =() => {
  return dispatch => {
    axios.get('/api/albums')
      .then(res => res.data)
      // use the dispatch method the thunkMiddleware gave us
      .then(albums => dispatch(receiveAlbumsFromServer(albums)));
  }
}

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
    dispatch(setCurrentSongList(currentSongList));
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

export const toggleOne = (selectedSong, selectedSongList) => {
  return dispatch => {
    const {currentSong} = getState();
   if (selectedSong.id !== currentSong.id)
      dispatch(startSong(selectedSong, selectedSongList));
    else dispatch(toggle());
  }
}

export const next = () => () => {
  const { isPlaying } = getState();
  dispatch(startSong(...skip(1, getState())));
};

export const prev = () => () => {
  const { isPlaying } = getState();
  dispatch(startSong(...skip(-1, getState())));
};



export const doSeveralThings = (stuffId, thingsId) => {
  return dispatch => {
    // we can also use async action creators to compose several actions into one!
    dispatch(doStuff(stuffId));
    dispatch(doThing(thingId));
  }
}
