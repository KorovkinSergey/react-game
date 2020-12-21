import React, {useRef, useState, useEffect} from 'react'
import styles from './FlipGame.module.css'
import {connect} from 'react-redux'
import {calculationWidthCard, randomCardsArray} from '../../../redux/functionHelpers'
import {clickCardActive} from '../../../redux/Flip/actionFlip'


const FlipGame = (props) => {

	const refElem = useRef()

	const [fieldGame, setFieldGame] = useState({width: 0, height: 0});

	const [arrayCards, setArrayCards] = useState([])

	useEffect(() => {
		setArrayCards(randomCardsArray(props.flip.level[props.flip.complexity].cards))
	}, [props.flip.complexity, props.flip.level])


	// измерение размеров поля для игры
	useEffect(() => {
		if (refElem.current) {
			setFieldGame({
				width: refElem.current.offsetWidth,
				height: refElem.current.offsetHeight
			})
		}
	}, [])

	// вычисление размера карточки
	const WidthCard = {
		width: calculationWidthCard(
			fieldGame.width,
			fieldGame.height,
			props.flip.level[props.flip.complexity].cards
		)
	}

	return (
		<div className={styles.FlipGame} ref={refElem}
				 onClick={event => props.clickCardActive(event, props.flip, props.user, styles.FlipCardFront, styles.FlipCardActive)}>

			{
				arrayCards.map((item, index) => {
					return (
						<div className={styles.FlipCard} key={index} style={WidthCard}>
							<div
								className={
									props.idCardActive.includes(index)
										? styles.FlipCardActive + ' ' + styles.FlipCardInner
										: ' ' + styles.FlipCardInner}
								id={index}
							>
								<div className={styles.FlipCardFront}/>
								<div className={styles.FlipCardBack}>
									<i className="material-icons small">{item}</i>
								</div>
							</div>
						</div>
					)
				})
			}

		</div>)
}


const mapStateToProps = (state) => {
	return {
		flip: state.flip,
		idCardActive: state.flip.idCardActive,
		user: state.app.user
	}
}

const dispatchToProps = (dispatch) => {
	return {
		clickCardActive: (e, props, user, classCard, classActive) => dispatch(
			clickCardActive(e, props, user, classCard, classActive)
		)
	}
}

export default connect(mapStateToProps, dispatchToProps)(FlipGame)
