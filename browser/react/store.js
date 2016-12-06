import {createStore, applyMiddleware, combineReducers} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import lyricsReducer from './reducers/lyrics-reducer';
import playerReducer from './reducers/player-reducer';

const logger = applyMiddleware(createLogger());
const handleAsync = applyMiddleware(thunkMiddleware);

const reducers = combineReducers({
                  lyrics: lyricsReducer,
                  player: playerReducer
                });

export default createStore(reducers, logger, handleAsync);
