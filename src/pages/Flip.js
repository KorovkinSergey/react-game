import React from 'react'
import styles from './Flip.module.css'
import ButtonsPickLevel from '../components/Buttons/ButtonsPickLevel/ButtonsPickLevel'
import ProgressLoader from '../components/Loaders/ProgressLoader'
import FlipGame from '../components/Games/FlipGame/FlipGame'
import {connect} from 'react-redux'
import {buttonStartGame, pickLevelButtons} from '../redux/Flip/actionFlip'


const Flip = (props) => {


	return (
		<div className={"z-depth-1 " + styles.Flip}>
			<span className={styles.LevelInfo}>Уровень сложности: {props.flip.complexity}</span>
			<ButtonsPickLevel pickLevelHandler={props.pickLevel}/>

			{
				props.flip.startGame
					? <React.Fragment>
						<ProgressLoader time={props.flip.level[props.flip.complexity].time}/>
						<FlipGame/>
					</React.Fragment>

					: <React.Fragment>
						<div className={styles.FiledStart}>
							<h4 className={styles.Title}>Открой все плитки</h4>
							<div className={styles.Result}>
								{
									props.flip.resultTime
										? <React.Fragment>
											<span>Вы справились за : {props.flip.resultTime}</span>
											{
												props.flip.newRecord
													? <span>Вы побили свой рекорд!</span>
													: null
											}
										</React.Fragment>
										: null
								}
							</div>
							<button
								className='waves-effect waves-light btn'
								onClick={() => props.buttonStartGame(props.flip.level[props.flip.complexity].time)}
							>
								Start
							</button>
						</div>
					</React.Fragment>
			}

		</div>
	)
}

const dispatchToProps = (dispatch) => {
	return {
		pickLevel: e => dispatch(pickLevelButtons(e)),
		buttonStartGame: (time) => dispatch(buttonStartGame(time)),
	}
}

const mapStateToProps = (state) => {
	return {
		flip: state.flip
	}
}

export default connect(mapStateToProps, dispatchToProps)(Flip)
