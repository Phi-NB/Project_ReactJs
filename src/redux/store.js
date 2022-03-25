import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import todo from './reducer/todo'
import user from './reducer/user'
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    todo: todo,
    user: user,
  });
  
export default createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));