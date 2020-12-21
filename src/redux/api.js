export function registerUser (url, data) {
	return fetch(url, {
		method: 'POST',
		body: JSON.stringify({
			email: data.email,
			password: data.password,
			returnSecureToken: true
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	})
}

export function createNewUser(url, data) {
	return fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		}
	})
}

export function updateRecordGame(url, data) {
	return fetch(url, {
		method: 'PUT',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		}
	})
}

