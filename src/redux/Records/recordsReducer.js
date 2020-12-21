import {LOADING_RECORDS_USERS} from '../types'

const initialState = {
	loading: true,
	flipFlop: {
		easy: [],
		medium: [],
		hard: [],
		expert: []
	}
}

export const recordsReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOADING_RECORDS_USERS:
			return {...state, loading: false, flipFlop: action.sortUsers}
		default:
			return state
	}
}

