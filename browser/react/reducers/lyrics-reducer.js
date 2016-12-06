import { SET_LYRICS } from '../constants';

const initialState = { lyric: '' }

export default function reducer (state = initialState, action) {
  let newState;

  switch (action.type) {
    case SET_LYRICS:
      newState = Object.assign({}, state, { lyric: action.lyric });
      break;

    default:
      return state;
  }

  return newState;
}
