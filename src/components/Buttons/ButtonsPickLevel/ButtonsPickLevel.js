import React from 'react'
import styles from './ButtonsPickLevel.module.css'

const ButtonsPickLevel = (props) => {
	return (
		<div className={styles.PickLevel}
		onClick={e => props.pickLevelHandler(e)}
		>
			<button name='easy' className={styles.ButtonLevel}>Easy</button>
			<button name='medium' className={styles.ButtonLevel}>Medium</button>
			<button name='hard' className={styles.ButtonLevel}>Hard</button>
			<button name='expert' className={styles.ButtonLevel}>Expert</button>
		</div>
	)
}

export default ButtonsPickLevel
