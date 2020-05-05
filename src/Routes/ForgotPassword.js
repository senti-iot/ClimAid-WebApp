import React, { Fragment, useState, /* useRef,  useEffect, */ useCallback } from 'react'
import { Collapse, Button, Paper, Hidden } from '@material-ui/core'
import { Danger, ItemG, Success, T } from 'Components'
import forgotPasswordPageStyles from 'Styles/forgotPasswordStyles'
// import { useDispatch } from 'react-redux'
import TextF from 'Components/Input/TextF'
// import { changeLanguage } from 'Redux/localization'
import { resetPassword, confirmPassword as bConfirmPass } from 'data/login'
import LoginImages from 'Components/Custom/Login/NewLoginImages'
import { Link, useParams, useHistory } from 'react-router-dom'
import logo from 'assets/logo.png'
import { useLocalization, useEventListener } from 'Hooks'

const ForgotPassword = props => {
	//Hooks
	const params = useParams()
	const t = useLocalization()
	const classes = forgotPasswordPageStyles()
	const history = useHistory()
	//Redux
	// const dispatch = useDispatch()

	//State
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	// const [loggingIn, setLoggingIn] = useState(false)
	const [error, setError] = useState(false)
	const [errorMessage, setErrorMessage] = useState([])
	// const [score, setScore] = useState(0)
	const [passwordRequest, setPasswordRequest] = useState(false)
	const [passwordReset, setPasswordReset] = useState(false)

	// useEffect(() => {
	// 	// effect
	// 	let lang = params.lang
	// 	if (lang) dispatch(changeLanguage(lang, true))
	// 	return () => {
	// 		// cleanup
	// 	}
	// 	//eslint-disable-next-line
	// }, [])

	const errorMessages = useCallback(code => {
		switch (code) {
			case 0:
				return t('confirmUser.validation.passwordEmpty')
			case 1:
				return t('confirmUser.validation.passwordUnder8')
			case 2:
				return t('confirmUser.validation.passwordMismatch')
			case 404:
				return t('confirmUser.validation.emailDoesntExist')
			case 404.1:
				return t('confirmUser.validation.userDoesntExistAnymore')
			default:
				return ''
		}
	}, [t])

	const handleValidation = useCallback(() => {
		let errorCode = []
		if (password === '' && confirmPassword === '') {
			errorCode.push(0)
		}
		if (password.length < 8) {
			errorCode.push(1)
		}
		if (password !== confirmPassword) {
			errorCode.push(2)
		}
		if (errorCode.length === 0) {
			return true
		} else {
			setError(true)
			setErrorMessage(errorCode.map(c => (
				<Danger key={c}>{errorMessages(c)}</Danger>
			)))
			return false
		}
	}, [confirmPassword, errorMessages, password])

	const confirmPass = useCallback(async () => {
		if (handleValidation()) {
			let session = await bConfirmPass({
				newPassword: password,
				passwordToken: params.token,
			})
			if (session === 200) {
				setPasswordReset(true)
			} else {
				setError(true)
				setErrorMessage([<Danger>{errorMessages(404.1)}</Danger>])
			}
		}
	}, [errorMessages, handleValidation, params.token, password])
	const keyPressHandler = useCallback(
		(event) => {
			if (params.token)
				if (event.key === 'Enter') {
					confirmPass()
				}

		},
		[confirmPass, params.token]
	);

	useEventListener('keypress', keyPressHandler);

	const resetPass = async () => {
		let session = await resetPassword(email)
		console.log(session);
		if (session === 200) {
			setPasswordRequest(true)
		} else {
			setError(true)
			setErrorMessage([<Danger>{errorMessages(session)}</Danger>])
		}
	}

	const handleChangePassword = e => {
		setPassword(e.target.value)
		if (error) {
			setError(false)
			setErrorMessage([])
		}
	}
	const handleChangeEmail = e => {
		setEmail(e.target.value)
		if (error) {
			setError(false)
			setErrorMessage([])
		}
	}

	const handleChangeConfirmPassword = e => {
		setConfirmPassword(e.target.value)
		if (error) {
			setError(false)
			setErrorMessage([])
		}
	}

	return (
		<div className={classes.wrapper}>
			<ItemG xs={12} sm={12} md={4} lg={4} xl={3} container>
				<div className={classes.mobileContainer}>
					<Paper className={classes.paper}>
						<div className={classes.paperContainer}>
							<ItemG xs={12} container justify={'center'}>
								<img
									className={classes.logo}
									src={logo}
									alt=''
								/>
							</ItemG>
							<ItemG xs={12} container justify={'center'}>
								<T
									className={
										classes.loginButton +
										' ' +
										classes.needAccount
									}
								>
									{params.token
										? t('users.fields.confirmPass')
										: t(
											'dialogs.login.resetPasswordMessage'
										)}
								</T>
							</ItemG>
							<ItemG xs={12} container justify={'center'}>
								<ItemG container justify={'center'} xs={12}>
									<Collapse in={passwordReset}>
										{params.token ? (
											<Success
												className={
													classes.loginButton +
													' ' +
													classes.needAccount
												}
											>
												{t(
													'dialogs.login.passwordReseted'
												)}
											</Success>
										) : null}
									</Collapse>
									<Collapse in={error}>
										{errorMessage}
									</Collapse>
								</ItemG>

								<ItemG container xs={12}>
									<ItemG container xs={12}>
										{!passwordRequest &&
											params.token ? null : (
												<TextF
													id={'email'}
													autoFocus
													label={t('users.fields.email')}
													value={email}
													onChange={handleChangeEmail}
													margin="normal"
													fullWidth
													className={classes.loginButton}
													error={error}
												/>
											)}
									</ItemG>

									{params.token ? (
										<Fragment>
											<ItemG container xs={12}>
												<TextF
													fullWidth
													id={'password'}
													label={t(
														'confirmUser.password'
													)}
													value={password}
													className={
														classes.loginButton
													}
													onChange={handleChangePassword}
													margin="normal"
													error={error}
													type={'password'}
												/>
											</ItemG>
											<ItemG container xs={12}>
												<TextF
													fullWidth
													id={'confirmpassword'}
													label={t(
														'confirmUser.passwordConfirm'
													)}
													value={confirmPassword}
													className={
														classes.loginButton
													}
													onChange={handleChangeConfirmPassword}
													margin="normal"
													error={error}
													type={'password'}
												/>
											</ItemG>
										</Fragment>
									) : null}
									<Collapse in={passwordRequest}>
										<ItemG
											xs={12}
											className={classes.loginButton}
										>
											<Success>
												{t('dialogs.login.resetPassRequestMessage')}
											</Success>
										</ItemG>
									</Collapse>
								</ItemG>
								<ItemG xs={12} container justify={'center'}>
									<Collapse in={!passwordRequest}>
										{!params.token ? (
											<Button
												className={classes.loginButton}
												variant={'outlined'}
												color={'primary'}
												onClick={resetPass}
											>
												{t(
													'actions.requestPasswordReset'
												)}
											</Button>
										) : !passwordReset ? (
											<Button
												className={classes.loginButton}
												variant={'outlined'}
												color={'primary'}
												onClick={confirmPass}
											>
												{t('actions.changePassword')}
											</Button>
										) : (<Button
											className={classes.loginButton}
											variant={'outlined'}
											color={'primary'}
											onClick={() =>
												history.push('/login')
											}
										>
											{t('actions.goToLogin')}
										</Button>)}
									</Collapse>
								</ItemG>
								<ItemG
									xs={12}
									container
									justify={'center'}
									style={{ margin: '32px 0px' }}
								>
									<ItemG
										xs={12}
										container
										justify={'space-around'}
									>
										<Collapse in={!passwordReset}>
											<Link to={`/login`}>
												{t('actions.goToLogin')}
											</Link>
										</Collapse>
									</ItemG>
								</ItemG>
							</ItemG>
						</div>
					</Paper>
				</div>
			</ItemG>
			<Hidden smDown>
				<ItemG md={8} lg={8} xl={9}>
					<LoginImages t={t} />
				</ItemG>
			</Hidden>
		</div >
	)
}

export default ForgotPassword