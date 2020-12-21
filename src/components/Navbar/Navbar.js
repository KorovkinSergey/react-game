import React from 'react'
import styles from './Navbar.module.css'
import {NavLink} from 'react-router-dom'
import {routesMap} from '../../routes/routes'
import {connect} from 'react-redux'

const Navbar = (props) => {
	return (
		<nav className={"col s12 " + styles.Nav}>
			<div className="nav-wrapper">
				<ul className={styles.Ul}>
					<li>
						<NavLink className="nav-link" to={routesMap.flip} activeClassName="active" exact>Flip-flop</NavLink>
					</li>
					<li>
						<NavLink className="nav-link" to={routesMap.records} activeClassName="active" exact>Records</NavLink>
					</li>
					<li>
						{
							!props.redirectReg
								? <NavLink className="nav-link" to={routesMap.registration} activeClassName="active"
													 exact>Registration</NavLink>
								: <NavLink className="nav-link" to={routesMap.user} activeClassName="active"
													 exact>User</NavLink>
						}
					</li>
				</ul>
			</div>
		</nav>
	)
}

const mapStateToProps = (state) => {
	return {
		redirectReg: state.app.redirectRegistration
	}
}

export default connect(mapStateToProps, null)(Navbar)
