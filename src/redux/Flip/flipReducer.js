import {
	BUTTON_START_GAME,
	CHANGE_LEVEL,
	END_GAME_TIME,
	END_GAME_TIMER,
	NEW_RECORD_GAME,
	REF_CARD_ACTIVE
} from '../types'

const initialState = {
	level: { // уровни сложности
		easy: {
			time: 60,
			cards: 20
		},
		medium: {
			time: 100,
			cards: 40
		},
		hard: {
			time: 200,
			cards: 60
		},
		expert: {
			time: 300,
			cards: 80
		},
	},
	complexity: 'easy', // уровень сложности
	startGame: false, // начало игры
	startGameTime: '', // начало таймера игры
	timerId: 0, // id таймера
	pickCardText: '', // активированная карточка
	idCardActive: [], // массив активированных карточек
	active: true, // проерка на открытие максимум 2 карточек
	resultTime: '', // результат
	newRecord: false // флаг нового рекорда
}


export const flipReducer = (state = initialState, action) => {
	switch (action.type) {
		case CHANGE_LEVEL:
			clearTimeout(state.timerId)
			return {
				...state,
				complexity: action.payload,
				startGame: false,
				startGameTime: '',
				resultTime: '',
			}
		case BUTTON_START_GAME:
			return {
				...state,
				startGame: true,
				idCardActive: [],
				startGameTime: Date.now(),
				timerId: action.payload
			}
		case REF_CARD_ACTIVE:
			return {
				...state,
				pickCardText: action.payload,
				idCardActive: action.id,
				active: action.active
			}
		case END_GAME_TIME:
			clearTimeout(state.timerId)
			return {
				...state,
				resultTime: action.payload,
				startGame: false,
				startGameTime: '',
				endGameTime: false,
				newRecord: false,
			}
		case END_GAME_TIMER:
			return {
					...state,
					resultTime: '',
					startGame: false,
					startGameTime: '',
					endGameTime: false,
					newRecord: false,
			}
		case NEW_RECORD_GAME: {
			return {...state, newRecord: true}
		}
		default:
			return state
	}
}
