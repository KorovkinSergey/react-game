import React from 'react'
import styles from './Registration.module.css'
import RegistrationForm from '../components/RegistrationForm/RegistrationForm'
import LoaderForm from '../components/Loaders/LoaderForm'

import {connect} from 'react-redux'
import {Redirect} from 'react-router'
import {routesMap} from '../routes/routes'

const Registration = (props) => {
	return(
		<div className={"container " +styles.Block}>
			{
				props.redirectReg
					? <Redirect to={routesMap.user}/>
					: null
			}
			{
				props.loadingUser
				? <LoaderForm/>
				:	<RegistrationForm />
			}
		</div>
	)
}

const mapStateToProps = state => {
	return {
		loadingUser: state.app.loadingSingInUser,
		redirectReg: state.app.redirectRegistration
	}
}

export default connect(mapStateToProps, null)(Registration)
