import React, {useState, useEffect} from 'react'
import styles from './RegistrationForm.module.css'
import {connect} from 'react-redux'
import {changeHandlerValidator, loginHandler, registerHandler} from '../../redux/Form/actionsForm'
import Alert from '../Alert/Alert'


const RegistrationForm = (props) => {

	const [login, setLogin] = useState(true)

	useEffect(() => {
		window.M.updateTextFields()
	}, [login])

	// стили к табам
	const stylesTab = (login) => {
		const stylesTab = [styles.Tab]
		if (login) stylesTab.push(styles.TabActive)
		return stylesTab.join(' ')
	}


	return <form className={"col s12 z-depth-4 " + styles.Form}>
		<div className={"row " + styles.Tabs}>
				<span
					className={"col s4 " + stylesTab(login)}
					onClick={() => setLogin(true)}
				>Log in
				</span>
			<span
				className={"col s8 " + stylesTab(!login)}
				onClick={() => setLogin(false)}
			>Registration
				</span>
		</div>
		<div className="row">
			<div className="input-field col s12">
				<input
					id="email"
					type="email"
					className={props.form.emailValid === null ? 'validate' : props.form.emailValid ? 'valid' : 'invalid'}
					name="email"
					value={props.form.email}
					onChange={event => props.changeHandlerValidator(event, props.form)}
				/>
				<label htmlFor="email">Email</label>
				<span className="helper-text" data-error="wrong" data-success="right">Helper text</span>
			</div>
		</div>
		<div className="row">
			<div className="input-field col s12">
				<input
					id="password"
					type="password"
					className={props.form.passwordValid === null ? 'validate' : props.form.passwordValid ? 'valid' : 'invalid'}
					name="password"
					value={props.form.password}
					onChange={event => props.changeHandlerValidator(event, props.form)}
				/>
				<label htmlFor="password">Password</label>
				<span className="helper-text" data-error="wrong" data-success="right">Helper text</span>
			</div>
		</div>
		{
			login
				?<React.Fragment>
					<div className={"row " + styles.Buttons}>
						<button
							className={"col s12 btn waves-effect waves-light "}
							type="submit" name="action"
							disabled={props.loadingSingIn || !props.form.formLogInValid}
							onClick={event => props.loginHandler(event, props.form)}
						>
							Log in
						</button>
					</div>
					{
						props.alertLogIn ? <Alert message={props.alertLogIn} /> : null
					}
				</React.Fragment>
				: <React.Fragment>
					<div className="row">
						<div className="input-field col s12">
							<input
								id="nickName"
								type="text"
								className={props.form.nickNameValid === null ? 'validate' : props.form.nickNameValid ? 'valid' : 'invalid'}
								name="nickName"
								value={props.form.nickName}
								onChange={event => props.changeHandlerValidator(event, props.form)}
							/>
							<label htmlFor="nickName">You Nickname</label>
							<span className="helper-text" data-error="wrong" data-success="right">Helper text</span>
						</div>
					</div>
					<div className={"row " + styles.Buttons}>
						<button
							className={"col s12 btn waves-effect waves-light"}
							name="action"
							disabled={props.loadingSingIn || !props.form.formRegValid}
							onClick={event => props.registerHandler(event, props.form)}
						>
							Registration
						</button>
					</div>
					{
						props.alertReg ? <Alert message={props.alertReg} /> : null
					}
				</React.Fragment>
		}
	</form>
}

const mapStateToProps = (state) => {
	return {
		form: state.form.form,
		alertLogIn: state.form.alert.messageLogIn,
		alertReg: state.form.alert.messageReg,
		loadingSingIn: state.form.loadingButton
	}
}
const dispatchToProps = (dispatch) => {
	return {
		changeHandlerValidator: (e, form) => dispatch(changeHandlerValidator(e, form)),
		registerHandler: (e, form)  => dispatch(registerHandler(e, form)),
		loginHandler: (e, form)  => dispatch(loginHandler(e, form))
	}

}

export default connect(mapStateToProps, dispatchToProps)(RegistrationForm)
