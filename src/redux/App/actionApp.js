import { EXIT_USER} from '../types'

export function exitUser() {
	return dispatch => {
		localStorage.removeItem("user")
		dispatch({type: EXIT_USER})
	}
}
