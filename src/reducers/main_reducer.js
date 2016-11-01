// Reducer - main_reducer.js
import { HANDLE_DATA } from '../actions/index';
const INITIAL_STATE = { data: [] };

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
		case HANDLE_DATA: 
			if (_.isEmpty(action.payload)) { return { ...state, data: [] }; }
			return { ...state, data: action.payload }; 
		default:
			return state;
	}}


