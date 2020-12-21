import React from 'react'
import styles from './Alert.module.css'

const Alert = (props) => {
	return (
		<div className={"row " + styles.Alert}>
			<span className={"col s12"}>{props.message}</span>
		</div>
	)
}
export default Alert
