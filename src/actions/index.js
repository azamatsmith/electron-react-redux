// Actions - index.js

export const HANDLE_DATA = 'HANDLE_DATA';

export function handleData(data) {
	return {
		type: HANDLE_DATA,
		payload: data 
	};
}

