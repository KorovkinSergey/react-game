import React from 'react'
import {connect} from 'react-redux'
import User from '../components/User/User'
import {Redirect} from 'react-router'
import {routesMap} from '../routes/routes'
import styles from './UserPage.module.css'
import {exitUser} from '../redux/App/actionApp'

const UserPage = (props) => {

	return (
		<div className={'container row z-depth-1 ' +styles.User}>

			<span className={styles.ExitUser}
			onClick={props.exitUser}
			>
				<span>Выход </span>
				<i className="material-icons ">close</i>
			</span>

			{
				props.redirectReg
					? <User user={props.user}/>
					: <Redirect to={routesMap.registration}/>
			}

		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		user: state.app.user,
		redirectReg: state.app.redirectRegistration
	}
}

const dispatchToProps = (dispatch) => {
	return {
		exitUser: () => dispatch(exitUser())
	}

}

export default connect(mapStateToProps, dispatchToProps)(UserPage)
