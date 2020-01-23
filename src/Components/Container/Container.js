import React, { /* useContext, */ useEffect, useState, Fragment } from 'react'
// import { TProvider } from 'Components/Providers/LocalizationProvider';
// import { HTitle } from 'App';
import { BPaper, AppBackground } from 'Styles/containerStyle';
import GridContainer from 'Components/Containers/GridContainer';
import ItemG from 'Components/Containers/ItemG';
import { MainChart } from 'Components/Custom/MainChart/MainChart';
import { Switch, Route, Redirect } from 'react-router-dom'
import Settings from 'Routes/Settings';
import Area from 'Routes/Area';
import Building from 'Routes/Building';
import Room from 'Routes/Room';
import Header from 'Components/Header';
import Footer from 'Components/Footer';
import cookie from 'react-cookies';
import { useDispatch, useSelector } from 'Hooks';
import { getSettings } from 'Redux/settings';
import { CircularLoader } from 'Components';
import ArcGraph from 'Components/Graphs/ArcGraph';
import DevicesWidget from 'Components/Custom/Devices/DevicesWidget';
import DeviceTableWidget from 'Components/Custom/DevicesTable/DeviceTableWidget';
import { getAllDevices, getData } from 'Redux/data';
import { usePrevious } from 'Hooks/index';


const ChartContainer = () => {

	const [chart, setChart] = useState('waterusage')
	const selectedDevices = useSelector(s => s.appState.selectedDevices)
	const [loading, setLoading] = useState(true)

	const dispatch = useDispatch()
	const period = useSelector(s => s.dateTime.period)
	const prevPeriod = usePrevious(period)
	const prevSelectedDevices = usePrevious(selectedDevices)
	useEffect(() => {
		if (prevPeriod && period !== prevPeriod && !loading) {
			setLoading(true)
		}
		if ((selectedDevices.length !== prevSelectedDevices.length || selectedDevices[0] !== prevSelectedDevices[0]) && !loading) {
			setLoading(true)
		}
	}, [loading, period, prevPeriod, prevSelectedDevices, selectedDevices])
	useEffect(() => {
		if (loading) {
			const getDeviceData = async () => dispatch(await getData())
			const loadData = async () => {
				await getDeviceData()
				setLoading(false)
			}
			loadData()
		}
	}, [dispatch, loading])
	return <GridContainer style={{ height: '100%' }}>
		<ItemG xs={9} >
			<BPaper>
				<MainChart loading={loading} chart={chart} setChart={setChart} />
			</BPaper>
		</ItemG>
		<ItemG xs={3}>
			<ItemG container direction={'row'} style={{ height: '100%' }}>
				<ItemG xs={12} style={{ height: '25%' }}>
					<BPaper>
						<DeviceTableWidget />
					</BPaper>

				</ItemG>
				<ItemG xs={12} style={{ height: '50%' }}>
					<BPaper>
						{loading ? <CircularLoader fill /> :
							<ArcGraph chart={chart} id={`arc-graph-${chart}`} />
						}
					</BPaper>

				</ItemG>
				<ItemG xs={12} style={{ height: '25%' }}>
					<BPaper>
						<DevicesWidget />
					</BPaper>
				</ItemG>
			</ItemG>
		</ItemG>
	</GridContainer>
}
ChartContainer.whyDidYouRender = true;


function Container(props) {
	const colorTheme = useSelector((state) => state.settings.colorTheme)
	const dispatch = useDispatch()
	const [loading, setLoading] = useState(true)
	useEffect(() => {

		const getSetting = async () => dispatch(await getSettings())
		const getDevices = async () => dispatch(await getAllDevices())
		const loadSettings = async () => {
			await getSetting()
			await getDevices()
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
							<Route path={'/settings'}>
								<Settings />
							</Route>
							<Route path={'/area'}>
								<Area />
							</Route>
							<Route path={'/building'}>
								<Building />
							</Route>
							<Route path={'/room'}>
								<Room />
							</Route>
							<Route exact path={'/'}>
								{/* <ChartContainer /> */}
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
