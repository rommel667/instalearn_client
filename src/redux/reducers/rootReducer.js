import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';

import userReducer from './userReducer'
import settingsReducer from './settingsReducer'
import optionsReducer from './optionsReducer'
import questionsReducer from './questionsReducer'
import statisticsReducer from './statisticsReducer'
import testReducer from './testReducer'
import chatsReducer from './chatsReducer'
import leaderboardReducer from './leaderboardReducer'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [ 'settings']
}

const rootReducer =  combineReducers({
    user: userReducer,
    settings: settingsReducer,
    options: optionsReducer,
    questions: questionsReducer,
    statistics: statisticsReducer,
    test: testReducer,
    chats: chatsReducer,
    leaderboards: leaderboardReducer
})

export default persistReducer(persistConfig, rootReducer)