import { combineReducers } from 'redux';

import user from './user.reducer';
import news from './news.reducer'

const rootReducer = combineReducers({
    news,
    user
});

export default rootReducer;