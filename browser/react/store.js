import {createStore, applyMiddleware, combineReducers} from 'redux';

//middleware
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

//reducers
import lyricsReducer from './reducers/lyrics-reducer';
import playerReducer from './reducers/player-reducer';
import albumsReducer from './reducers/albums-reducer';


const logger = createLogger({collapse: true});
const handleAsync = thunkMiddleware;

const reducers = combineReducers({
                  lyrics: lyricsReducer,
                  player: playerReducer,
                  albums: albumsReducer
                });

export default createStore(
  reducers,
  applyMiddleware(
   logger,
   handleAsync
  )
);
