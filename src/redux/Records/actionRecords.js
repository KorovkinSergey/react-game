import {config} from '../../config/config'
import {LOADING_RECORDS_USERS} from '../types'
import {sortUserRecord} from '../functionHelpers'

export function loadingUsersRecords () {
	return async dispatch => {
		const responseUsers = await fetch(`${config.baseUsers}.json`).then(response => response.json())

		const users = []

		for (const user in responseUsers) {
			if (responseUsers.hasOwnProperty(user)) {
				const recordsUser = {
					userName: responseUsers[user].userName,
					flipFlop:responseUsers[user].game.flipFlop
				}
				users.push(recordsUser)
			}
		}
		const sortUsers = sortUserRecord(users)

		dispatch({type: LOADING_RECORDS_USERS, sortUsers: sortUsers})
	}
}
