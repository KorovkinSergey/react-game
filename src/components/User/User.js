import React from 'react'
import styles from './User.module.css'

const User = (props) => {
	return (
		<React.Fragment>

			<div className={styles.Name}>
				<i className='material-icons large'>{props.user.icon}</i>
				<h3>{props.user.userName}</h3>
				<span>Дата регистрации: {props.user.createDate}</span>
			</div>

			<div className={styles.BlockInfo}>
				<div className={styles.FlipFlop}>
					<span className={styles.NameGame}>Flip-flop</span>
					<div className={styles.BestRecord}>
						<span>Лучший результат</span>
						<ul>
							<li>Easy: {props.user.game.flipFlop.record.easy}</li>
							<li>Medium: {props.user.game.flipFlop.record.medium}</li>
							<li>Hard: {props.user.game.flipFlop.record.hard}</li>
							<li>Expert: {props.user.game.flipFlop.record.expert}</li>
						</ul>
					</div>
					<span>Попыток всего: {props.user.game.flipFlop.try}</span>
				</div>
			</div>

		</React.Fragment>
	)
}

export default User
