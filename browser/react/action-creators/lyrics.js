import {SET_LYRICS} from '../constants';

export const setLyrics = function (lyric) {

  return {
    type: SET_LYRICS,
    lyric
  };
};
