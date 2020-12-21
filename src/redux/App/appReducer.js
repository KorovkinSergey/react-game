import { EXIT_USER, LOADING_SING_IN_USER, LOG_IN_USER, REDIRECT_REGISTRATION} from '../types'


const initialState = {
	user: {},
	loadingSingInUser: false,
	redirectRegistration: false,
}

const localUser = JSON.parse(localStorage.getItem('user'))

let userState = {}

if (localUser) {
	userState = {
		user: {...localUser},
		loadingSingInUser: true,
		redirectRegistration: true
	}
}

export const appReducer = (state = localUser ? userState : initialState, action) => {
	switch (action.type) {
		case LOG_IN_USER:
			return {...state, user: {...action.payload}}
		case LOADING_SING_IN_USER:
			return {...state, loadingSingInUser: true}
		case REDIRECT_REGISTRATION:
			return {...state, redirectRegistration: true}
		case EXIT_USER:
			return {...state, ...initialState}
		default:
			return state
	}
}

