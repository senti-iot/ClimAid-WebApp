import React from 'react'
import Container from 'Components/Container/Container';
import { ThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { Route, Switch } from 'react-router-dom';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import * as themes from 'Styles/themes'
import NewContent from 'Components/Loaders/NewContent';

function Main() {
	const colorTheme = useSelector(s => s.settings.colorTheme)
	return (
		<ThemeProvider theme={themes[colorTheme]}>
			<MuiThemeProvider theme={themes[colorTheme]}>
				<NewContent />
				<Switch>
					<Route path={'/password/reset/:lang/:token?'}>
						<ForgotPassword />
					</Route>
					<Route path={'/login'}>
						<Login />
					</Route>
					<Route path={'/'}>
						<Container />
					</Route>
				</Switch>
			</MuiThemeProvider>
		</ThemeProvider>
	)
}
Main.whyDidYouRender = true;

export default Main
