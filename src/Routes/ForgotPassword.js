import React, { useState } from 'react'
import { Button, CardContent, Card, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { ItemG, FadeOutLoader } from 'Components';
import logo from 'assets/logo.png';
import { ImgLogo, InputContainer } from 'Styles/loginStyles';
import roomStyles from 'Styles/roomStyles';
import { useLocalization } from 'Hooks';
import { resetPassword } from 'data/login';

function ForgotPassword(props) {
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState('');
	const [error, setError] = useState();
	const [passwordRequested, setPasswordRequested] = useState(false);

	const classes = roomStyles();
	const t = useLocalization();

	const resetPass = () => {
		setLoading(true);
	}

	const resetPassDo = async () => {
		setError(false);

		if (email.length) {
			await resetPassword(email)

			setLoading(false);
			setPasswordRequested(true);
		} else {
			setLoading(false);
			setError(true);
		}
	}

	const handleChange = (event) => {
		setEmail(event.target.value);
	}

	return (
		<div style={{
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			height: '100vh'
		}}>
			<Card style={{ width: 400 }}>
				<CardContent>
					<ItemG xs={12} sm={12} md={4} lg={4} xl={3} container>
						<InputContainer>
							<ItemG xs={12} container justify={'center'}>
								<ImgLogo src={logo} alt='' />
								{!passwordRequested ? <p>{t('dialogs.login.resetPasswordMessage')}</p> : ""}
							</ItemG>
							{!passwordRequested ?
								<FadeOutLoader on={loading} onChange={resetPassDo}>
									<ItemG xs={12} container justify={'center'}>
										<ItemG container xs={12}>
											<TextField
												id={'email'}
												type={'email'}
												autoFocus
												label={t('users.fields.email')}
												value={email}
												onChange={handleChange}
												margin='normal'
												fullWidth
												className={classes.loginButton}
												error={error}
												variant="outlined"
											/>
										</ItemG>
										<ItemG xs={12} container justify={'center'}>
											<Button className={classes.loginButton} variant={'outlined'} color={'primary'} onClick={resetPass}>
												{t('actions.changePassword')}
											</Button>
										</ItemG>
									</ItemG>
								</FadeOutLoader>
								: <div><br /><br />{t('dialogs.login.resetPassRequestMessage')}<br /><br />
									<Link to={`/login`}>
										{t('actions.goToLogin')}
									</Link>
								</div>
							}
						</InputContainer>
					</ItemG>
				</CardContent>
			</Card>
		</div>
		// <ThemeProvider theme={loginTheme}>
		// 	<LoginWrapper>
		// 		<ItemG xs={12} sm={12} md={4} lg={4} xl={3} container>
		// 			<MobileContainer>
		// 				<LeftPanel /* className={classes.paper} */>
		// 					<InputContainer>
		// 					<ItemG xs={12} container justify={'center'}>
		// 						<ImgLogo src={logo} alt='' />
		// 					</ItemG>
		// 					<ItemG xs={12} container justify={'center'}>
		// 						<T className={classes.loginButton + ' ' + classes.needAccount}>
		// 							{t('dialogs.login.resetPasswordMessage')}
		// 						</T>
		// 					</ItemG>
		// 					<ItemG xs={12} container justify={'center'}>
		// 						<ItemG container justify={'center'} xs={12}>
		// 							<Collapse in={error}>
		// 								{errorMessage}
		// 							</Collapse>
		// 						</ItemG>

		// 						<ItemG container xs={12}>
		// 							<ItemG container xs={12}>
		// 								<LoginTF
		// 									id={'email'}
		// 									autoFocus
		// 									label={t('users.fields.email')}
		// 									value={email}
		// 									handleChange={handleChange}
		// 									margin='normal'
		// 									fullWidth
		// 									className={classes.loginButton}
		// 									error={error}
		// 								/>
		// 							</ItemG>
		// 						</ItemG>
		// 						<ItemG xs={12} container justify={'center'}>
		// 							<Collapse in={!passwordRequested}>
		// 								<Button className={classes.loginButton} variant={'outlined'} color={'primary'} onClick={resetPass}>
		// 									{t('actions.changePassword')}
		// 								</Button>
		// 							</Collapse>
		// 						</ItemG>
		// 						<ItemG xs={12} container justify={'center'} style={{ margin: "32px 0px" }}>
		// 							<ItemG xs={12} container justify={'space-around'}>
		// 								<Link to={`/login`}>
		// 									{t('actions.goToLogin')}
		// 								</Link>
		// 							</ItemG>
		// 						</ItemG>
		// 					</ItemG>
		// 				{/* <ItemG xs={12} container alignItems={'flex-end'} justify={'center'} className={classes.footer}>
		// 					<Muted className={classes.footerText}>{t('login.footer')}</Muted>
		// 				</ItemG> */}
		// 			</InputContainer>
		// 		</ThemeProvider>
		// 	</ItemG>
		// 	<Hidden smDown>
		// 		<ItemG md={8} lg={8} xl={9}>
		// 			<LoginImages t={t} />
		// 		</ItemG>
		// 	</Hidden>
		// 	{/* </ItemG> */}
		// </div>
	)
}

export default ForgotPassword;