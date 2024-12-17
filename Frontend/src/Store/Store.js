import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import {thunk} from 'redux-thunk';
import { authReducer } from './Auth/Reducer';
import { postReducer} from './Tweet/Reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    post: postReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));


