import React, { useEffect, useState, Fragment } from 'react'
import { AppBackground } from 'Styles/containerStyle';
import { Switch, Route, Redirect } from 'react-router-dom'
import Administraion from 'Routes/Administration';
import Settings from 'Routes/Settings';
import Building from 'Routes/Building';
import Room from 'Routes/Room';
import Header from 'Components/Header';
import Footer from 'Components/Footer';
import cookie from 'react-cookies';
import { useDispatch, useSelector } from 'Hooks';
import { getSettings } from 'Redux/settings';
import { CircularLoader, MapContainer } from 'Components';

function Container(props) {
	const colorTheme = useSelector((state) => state.settings.colorTheme)
	const dispatch = useDispatch()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const getSetting = async () => dispatch(await getSettings())

		const loadSettings = async () => {
			await getSetting()
			setLoading(false)
		}
		loadSettings()
	}, [dispatch])

	return (
		cookie.load('SESSION') ?
			<Fragment>
				<Header title={props.title} />
				{!loading ?
					<AppBackground color={colorTheme}>
						<Switch>
							<Route path={'/administration'}>
								<Administraion />
							</Route>
							<Route path={'/settings'}>
								<Settings />
							</Route>
							<Route path={'/building'}>
								<Building />
							</Route>
							<Route path={'/room'}>
								<Room />
							</Route>
							<Route exact path={'/'}>
								<MapContainer />
							</Route>
							<Redirect path={'*'} to={'/'}></Redirect>
						</Switch>
					</AppBackground>
					: <CircularLoader fill />}
				<Footer />
			</Fragment>
			: <Redirect from={window.location.pathname} to={{
				pathname: '/login', state: {
					prevURL: window.location.pathname
				}
			}} />
	)
}
Container.whyDidYouRender = true;

export default Container
