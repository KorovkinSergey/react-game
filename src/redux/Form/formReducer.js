import {
	CHANGE_FORM,
	DISABLE_BUTTON_SING_IN,
	ENABLE_BUTTON_SING_IN,
	HIDE_ALERT,
	LOG_IN_ERROR,
	REFRESH_FORM
} from '../types'

const initialState = {
	form: {
		email: '',
		nickName: '',
		password: '',
		formRegValid: false,
		formLogInValid: false,
		emailValid: null,
		passwordValid: null,
		nickNameValid: null
	},
	alert: {
		messageLogIn: '',
		messageReg: ''
	},
	loadingButton: false
}

export const formReducer = (state = initialState, action) => {
	switch (action.type) {
		case CHANGE_FORM:
			return {...state, form: {...action.payload}}
		case REFRESH_FORM:
			return {...state, form: {...initialState.form}}
		case LOG_IN_ERROR:
			return {...state, alert: {...action.payload}}
		case HIDE_ALERT:
			return {...state, alert: {...initialState.alert}}
		case DISABLE_BUTTON_SING_IN:
			return {...state, loadingButton: true}
		case ENABLE_BUTTON_SING_IN:
			return {...state, loadingButton: false}
		default:
			return state
	}
}

