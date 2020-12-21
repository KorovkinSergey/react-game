

export function calculationWidthCard(widthField, heightField, amountCard) {

	if (widthField === 0 || heightField === 0) {
		return
	}
	// Находим площадь 1 карточки
	let widthCard = Math.floor(Math.sqrt((widthField * widthField) / amountCard))

	// находим оптимальную площадь 1 карточки
	if (widthField > heightField || amountCard <= 20) {
		for (let i = widthCard; i > 0; i--) {
			if (widthField % i === 0 && amountCard % (widthField / i) === 0) {
				widthCard = i
				break
			}
		}
	} else {
		for (let i = widthCard; i > 20; i++) {
			if (widthField % i === 0 && amountCard % (widthField / i) === 0) {
				widthCard = i
				break
			}
		}
	}
	return widthCard + 'px'
}

export function randomCardsArray(amountCard) {

	const iconArray = [
		'access_time',
		'access_alarm',
		'account_balance',
		'adb',
		'adjust',
		'airport_shuttle',
		'all_inclusive',
		'all_out',
		'android',
		'archive',
		'arrow_back',
		'arrow_downward',
		'arrow_upward',
		'assessment',
		'attach_money',
		'attachment',
		'backspace',
		'battery_charging_full',
		'brightness_3',
		'brush',
		'build',
		'call',
		'cake',
		'cloud',
		'color_lens',
		'computer',
		'content_cut',
		'directions_bike',
		'directions_car',
		'drafts',
		'flag',
		'free_breakfast',
		'gavel',
		'highlight',
		'hourglass_full',
		'local_grocery_store',
		'local_gas_station',
		'palette',
		'panorama',
		'remove_red_eye',
	]

	const numberArray = []
	const ArrayCards = []

	for (let i = 0; i < amountCard;) {
		// случайное число
		const number = Math.floor(Math.random() * (amountCard))
		// проверка чтоб не было повторния
		if (!numberArray.includes(number)) {
			numberArray.push(number)
			number >= amountCard / 2
				? ArrayCards.push(iconArray[number - (amountCard / 2)])
				: ArrayCards.push(iconArray[number])
			i++
		}
	}
	return ArrayCards
}

export function sortUserRecord(users) {

	const flipFlop = {
		easy: [],
		medium: [],
		hard: [],
		expert: []
	}

	users.map(item => {
		for (const records in item.flipFlop.record) {
			if (item.flipFlop.record.hasOwnProperty(records) && item.flipFlop.record[records] !== 0) {
				const recordUser = {
					userName: item.userName,
					records:item.flipFlop.record[records]
				}
				flipFlop[records].push(recordUser)
			}
		}
		return item
	})

	const sortFunction = (a, b) => {
		if (a.records > b.records) {
			return 1
		}
		if (a.records < b.records ) {
			return -1
		}
		// a должно быть равным b
		return 0
	}

	flipFlop.easy.sort(sortFunction)
	flipFlop.medium.sort(sortFunction)
	flipFlop.hard.sort(sortFunction)
	flipFlop.expert.sort(sortFunction)

	return flipFlop

}
