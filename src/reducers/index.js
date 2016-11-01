// Reducers - index.js
//
import { combineReducers } from 'redux';
import MainReducer from './main_reducer';

const rootReducer = combineReducers({
	main: MainReducer	
});

export default rootReducer;
