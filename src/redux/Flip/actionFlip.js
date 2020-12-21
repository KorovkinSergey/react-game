import {
	BUTTON_START_GAME,
	CHANGE_LEVEL,
	END_GAME_TIME,
	END_GAME_TIMER,
	NEW_RECORD_GAME,
	REF_CARD_ACTIVE
} from '../types'
import {updateRecordGame} from '../api'
import {config} from '../../config/config'
import M from 'materialize-css'


// выбор уровня
export function pickLevelButtons(e) {
	return dispatch => {
		if (e.target.tagName !== 'BUTTON') {
			return
		}
		const button = e.target.name
		dispatch({type: CHANGE_LEVEL, payload: button})
	}
}

// старт игры
export function buttonStartGame(time) {
	return dispatch => {
		// создание таймера
		const timerId = setTimeout(() => {
			M.toast({html: 'Время вышло!'})
			dispatch({type: END_GAME_TIMER, timerId: timerId})
		}, time * 1000)
		dispatch({type: BUTTON_START_GAME, payload:timerId })
	}
}

// обработка клика по карточке
export function clickCardActive(e, props, user, classCard, classActive) {

	return async dispatch => {
		// проверка нажатия на карточку
		if (!e.target.classList.contains(classCard)
			|| e.target.parentElement.classList.contains(classActive)
			|| !props.active) return

		const idCarArray = [...props.idCardActive]
		// перенные события
		const idCardActive = +e.target.parentElement.id
		let pickCardText = e.target.nextElementSibling.firstChild.textContent

		// добавление клика карточки
		if (pickCardText === props.pickCardText || props.pickCardText === '') {
			idCarArray.push(idCardActive)
			if (pickCardText === props.pickCardText) {
				pickCardText = ''
			}

			if (idCarArray.length === props.level[props.complexity].cards) {
				const resultTime = (Date.now() - props.startGameTime) / 1000
				// запись времени победы
				dispatch({type: END_GAME_TIME, payload: resultTime})

				// добавление рекорда в базу
				const data = {...user}

				data.game.flipFlop.try = data.game.flipFlop.try + 1
				if (resultTime < data.game.flipFlop.record[props.complexity] || data.game.flipFlop.record[props.complexity] === 0) {
					data.game.flipFlop.record[props.complexity] = resultTime
					dispatch({type: NEW_RECORD_GAME})
				}

				await updateRecordGame(`${config.baseUsers}/${user.nameBase}.json`, data).then(response => response.json())

				localStorage.setItem('user', JSON.stringify(data))

				// возможная ошибка и обработка ее,
				//////////////////////
			}
			dispatch({type: REF_CARD_ACTIVE, payload: pickCardText, id: idCarArray, active: true})
			return
		}
		// если карточки не совпали
		if (pickCardText !== props.pickCardText && props.pickCardText !== '') {
			idCarArray.push(idCardActive)
			dispatch({type: REF_CARD_ACTIVE, payload: pickCardText, id: idCarArray, active: false})
			setTimeout(() => {
				pickCardText = ''
				idCarArray.pop()
				idCarArray.pop()
				dispatch({type: REF_CARD_ACTIVE, payload: pickCardText, id: idCarArray, active: true})
			}, 500)
		}
	}
}
