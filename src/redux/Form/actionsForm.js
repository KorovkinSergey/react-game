import {
	CHANGE_FORM,
	DISABLE_BUTTON_SING_IN,
	ENABLE_BUTTON_SING_IN,
	HIDE_ALERT,
	LOADING_SING_IN_USER,
	LOG_IN_ERROR,
	LOG_IN_USER, REDIRECT_REGISTRATION,
	REFRESH_FORM
} from '../types'
import {config} from '../../config/config'
import {createNewUser, registerUser} from '../api'

export function registerHandler(event, form) {
	return async dispatch => {
		event.preventDefault()
		dispatch({type:DISABLE_BUTTON_SING_IN})
		try {
			// создание пользователя
			const responseReg = await registerUser(config.registerUser, form)
				.then(response => response.json())
				.catch(e => {
						alert('Ошибка сервера')
						console.log(e)
					}
				)
			// обработка ошибки
			if (responseReg.error) {
				let alert = {
					messageReg: ''
				}
				switch (responseReg.error.message) {
					case 'EMAIL_EXISTS':
						alert.messageReg = 'Пользователь уже зарегестрирован'
						break
					default:
						alert.messageReg = 'Ошибка входа, попробуйте позже'
				}
				dispatch({type:ENABLE_BUTTON_SING_IN})
				dispatch(showAlert(alert))
				dispatch(hideAlert(2500))
			}

			if (responseReg.localId) {
				dispatch({type:LOADING_SING_IN_USER})
				// сохранение пользователя в базе


				const user = {
					localId: responseReg.localId,
					userName: form.nickName,
					createDate: new Date().toLocaleDateString(),
					icon:'person',
					game: {
						flipFlop: {
							record:{
								easy: 0,
								medium:0,
								hard:0,
								expert:0
							},
							try:0,
						}
					}
				}
				const responseCreate = await createNewUser(`${config.dataBase}/users.json`, user)
					.then(res => res.json())
					.catch(e => console.log(e))

				console.log('res',responseCreate)
				// добавление пользователя в state
				if (responseCreate.name) {
					localStorage.setItem('user', JSON.stringify({...user, nameBase:responseCreate.name}))
					dispatch({type: LOG_IN_USER, payload: {...user, nameBase:responseCreate.name}})
					dispatch({type: REFRESH_FORM})
					dispatch({type:ENABLE_BUTTON_SING_IN})
					dispatch({type: REDIRECT_REGISTRATION})
				}
			}

		} catch (e) {
			console.log(e)
			const alert = {
				messageLogIn: 'Ошибка сервера, попробуйте VPN'
			}
			dispatch({type:ENABLE_BUTTON_SING_IN})
			dispatch(showAlert(alert))
			dispatch(hideAlert(2500))
		}
	}
}

export function loginHandler(event, form) {
	return async dispatch => {
		event.preventDefault()
		dispatch({type:DISABLE_BUTTON_SING_IN})
		try {
			// вход зарегестрированного пользователя
			const response = await registerUser(config.loginUser, form).then(response => response.json())


				// если пользователь найден
			if (response.localId) {
				dispatch({type:LOADING_SING_IN_USER})

				const responseUsers = await fetch(`${config.baseUsers}.json`).then(response => response.json())
				let user
				for (const key in responseUsers) {
					if (responseUsers.hasOwnProperty(key) && responseUsers[key].localId === response.localId) {
							user = responseUsers[key]
						}
					}

				localStorage.setItem('user', JSON.stringify(user))

				dispatch({type: LOG_IN_USER, payload: user})
				dispatch({type: REFRESH_FORM})
				dispatch({type:ENABLE_BUTTON_SING_IN})
				dispatch({type: REDIRECT_REGISTRATION})
			}

			// обработка ошибки ответа
			if (response.error) {
				let alert = {
					messageLogIn: ''
				}
				switch (response.error.message) {
					case 'EMAIL_NOT_FOUND':
						alert.messageLogIn = 'Пользователь не найден'
						break
					case 'INVALID_PASSWORD':
						alert.messageLogIn = 'Пароль не подходит'
						break
					case 'USER_DISABLED':
						alert.messageLogIn = 'Пользователь заблокирован'
						break
					default:
						alert.messageLogIn = 'Ошибка входа, попробуйте позже'
				}
				dispatch({type:ENABLE_BUTTON_SING_IN})
				dispatch(showAlert(alert))
				dispatch(hideAlert(2500))
			}

		} catch (e) {
			console.log(e)
			const alert = {
				messageLogIn: 'Ошибка сервера, попробуйте VPN'
			}
			dispatch({type:ENABLE_BUTTON_SING_IN})
			dispatch(showAlert(alert))
			dispatch(hideAlert(2500))
		}
	}
}

export function changeHandlerValidator(event, form) {

	return dispatch => {
		const name = event.target.name
		const value = event.target.value


		let emailValid = form.emailValid
		let passwordValid = form.passwordValid
		let nickName = form.nickName
		let nickNameValid = form.nickNameValid
		switch (name) {
			case 'email':
				emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
				break
			case 'password':
				passwordValid = value.length === 0 ? null : value.length >= 6
				break
			case 'nickName':
				nickName = value.replace(/\s/g, '')
				nickNameValid = value.length === 0 ? null : value.length !== 0 && value.length <= 10
				break
			default:
				break
		}
		const changeForm = {
			...form,
			[name]: value,
			nickName: nickName,
			emailValid: emailValid,
			passwordValid: passwordValid,
			nickNameValid: nickNameValid,
			formRegValid: emailValid && passwordValid && nickNameValid,
			formLogInValid: emailValid && passwordValid
		}
		dispatch({type: CHANGE_FORM, payload: changeForm})
	}

}

export function showAlert(message) {
	return {
		type: LOG_IN_ERROR,
		payload: message
	}
}

export function hideAlert(time) {
	return async dispatch => {
		await setTimeout(() => {
			return dispatch({type: HIDE_ALERT})
		}, time)
	}
}
