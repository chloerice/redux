import { SET_LYRICS } from '../constants';

const initialLyricsState = {
  lyrics: {
    text: ''
  }
}

export default function reducer (state = initialLyricsState, action) {
  let newState;

  switch (action.type) {
    case SET_LYRICS:
      newState.lyrics = { text: action.text };
      break;

    default:
      return state;
  }

  return newState;
}
