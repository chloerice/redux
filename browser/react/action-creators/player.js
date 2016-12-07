import {SET_CURRENT_SONG, SET_LIST, SET_PROGRESS, START_PLAYING, STOP_PLAYING} from '../constants';

export const setCurrentSong = function (song) {

  return {
    type: SET_CURRENT_SONG,
    currentSong: song
  };
};

export const setList = function (songList) {

  return {
    type: SET_LIST,
    currentSongList: songList
  };
};

export const setProgress = function (progress) {

  return {
    type: SET_PROGRESS,
    progress: progress
  };
};

export const startPlaying = function () {

  return {
    type: START_PLAYING,
    isPlaying: true
  };
};

export const stopPlaying = function () {

  return {
    type: STOP_PLAYING,
    isPlaying: false
  };
};
