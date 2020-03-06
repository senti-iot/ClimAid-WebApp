/* eslint-disable array-callback-return */
import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import moment from 'moment';
import { Grid } from '@material-ui/core';

import { useLocalization } from 'Hooks';
import d3Line from 'Components/Graphs/classes/d3Line';
import Legend from 'Components/Graphs/Legend';
import lineStyles from 'Components/Custom/Styles/lineGraphStyles';
import Tooltip from 'Components/Room/Tooltip';
import { getDeviceDataConverted } from 'data/climaid';
import { DateTimeFilter } from 'Components';
import CircularLoader from 'Components/Loaders/CircularLoader';

let line = null;

const RoomGraph = React.memo(React.forwardRef((props, ref) => {
	const [value, setValue] = useState({ value: null, date: null });
	const [period, setPeriod] = useState(null);
	const [selectedPeriod, setSelectedPeriod] = useState(2);
	const [loading, setLoading] = useState(true);
	const [graphLines, setGraphLines] = useState({});
	const lineChartContainer = useRef(null);
	const t = useLocalization();
	const classes = lineStyles({ id: props.id });
	const room = props.room;

	useEffect(() => {
		setLoading(true);
	}, [props.checkboxStates, props.room]);

	useEffect(() => {
		if (props.loading) {
			setLoading(true);
		}
	}, [props.loading]);

	useLayoutEffect(() => {
		const graphLinesData = {
			temperature: [],
			co2: [],
			humidity: []
		}

		async function fetchData() {
			const period = getPeriod(selectedPeriod);
			setPeriod(period);

			if (room.devices.length) {
				await Promise.all(
					Object.keys(props.checkboxStates).map(async key => {
						let temperatureData = null;
						let co2Data = null;
						let humidityData = null;
						if (key === 'temphistory' || key === 'tempanbmin' || key === 'tempanbmax') {
							temperatureData = await getDeviceDataConverted(room.devices[0].device, period, 'temperature');
						}
						if (key === 'co2history' || key === 'co2anbmin' || key === 'co2anbmax') {
							co2Data = await getDeviceDataConverted(room.devices[0].device, period, 'co2');
						}
						if (key === 'humidityhistory') {
							humidityData = await getDeviceDataConverted(room.devices[0].device, period, 'humidity');
						}

						if (props.checkboxStates[key]) {
							switch (key) {
								default:
								case 'temphistory':
									if (temperatureData) {
										graphLinesData.temperature.push({
											unit: '°C',
											name: key,
											median: true,
											data: temperatureData,
											color: "#e28117"
										});
									}
									break;
								case 'tempanbmin':
									if (temperatureData) {
										let dataMinimum = [];
										temperatureData.map(dataReading => {
											dataMinimum.push({ date: dataReading.date, value: 20 });
										});

										graphLinesData.temperature.push({
											unit: '°C',
											name: key,
											median: true,
											data: dataMinimum,
											color: "#e28117",
											noArea: true,
											noDots: true,
											dashed: true
										});
									}
									break;
								case 'tempanbmax':
									if (temperatureData) {
										let dataMax = [];
										temperatureData.map(dataReading => {
											dataMax.push({ date: dataReading.date, value: 24.5 });
										});

										graphLinesData.temperature.push({
											unit: '°C',
											name: key,
											median: true,
											data: dataMax,
											color: "#e28117",
											noArea: true,
											noDots: true,
											dashed: true
										});
									}
									break;
								case 'co2history':
									if (co2Data) {
										graphLinesData.co2.push({
											unit: 'ppm',
											name: key,
											median: true,
											data: co2Data,
											color: "#245bed"
										});
									}
									break;
								case 'co2anbmin':
									if (co2Data) {
										let dataMinimum = [];
										co2Data.map(dataReading => {
											dataMinimum.push({ date: dataReading.date, value: 400 });
										});

										graphLinesData.co2.push({
											unit: 'ppm',
											name: key,
											median: true,
											data: dataMinimum,
											color: "#245bed",
											noArea: true,
											noDots: true,
											dashed: true
										});
									}
									break;
								case 'co2anbmax':
									if (co2Data) {
										let dataMax = [];
										co2Data.map(dataReading => {
											dataMax.push({ date: dataReading.date, value: 1000 });
										});

										graphLinesData.co2.push({
											unit: 'ppm',
											name: key,
											median: true,
											data: dataMax,
											color: "#245bed",
											noArea: true,
											noDots: true,
											dashed: true
										});
									}
									break;
								case 'humidityhistory':
									if (humidityData) {
										graphLinesData.humidity.push({
											unit: '%',
											name: key,
											median: true,
											data: humidityData,
											color: "#1cc933"
										});
									}
									break;
							}
						}
					})
				);
			}

			setGraphLines(graphLinesData);
			setLoading(false);
		}

		const getPeriod = (menuId) => {
			let from = 0;
			let to = 0;
			let timeType = 2;

			setSelectedPeriod(menuId);

			switch (menuId) {
				default:
				case 10:
					from = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss');
					to = moment().format('YYYY-MM-DD HH:mm:ss');
					timeType = 1;
					break;
				case 11:
					from = moment().subtract(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss');
					to = moment().subtract(1, 'day').endOf('day').format('YYYY-MM-DD HH:mm:ss');
					timeType = 1;
					break;
				case 1:
					from = moment().startOf('week').format('YYYY-MM-DD HH:mm:ss');
					to = moment().endOf('week').format('YYYY-MM-DD HH:mm:ss');
					break;
				case 2:
					from = moment().subtract(7, 'days').startOf('day').format('YYYY-MM-DD HH:mm:ss');
					to = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss');
					break;
				case 3:
					from = moment().startOf('month').startOf('day').format('YYYY-MM-DD HH:mm:ss');
					to = moment().endOf('month').format('YYYY-MM-DD HH:mm:ss');
					break;
				case 5:
					from = moment().subtract(90, 'days').startOf('day').format('YYYY-MM-DD HH:mm:ss');
					to = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss');
					break;
				case 7:
					from = moment().subtract(30, 'days').startOf('day').format('YYYY-MM-DD HH:mm:ss');
					to = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss');
					break;
			}

			return {
				menuId: menuId,
				from: from,
				to: to,
				timeType: timeType
			};
		}

		const genNewLine = () => {
			let cProps = {
				//unit: unitType(),
				//id: props.id,
				data: graphLines,
				setTooltip: setValue,
				// setMedianTooltip: setMedianValue,
				period: period,
				t: t
			}

			line = new d3Line(lineChartContainer.current, cProps, classes);
		}

		if (line && !loading) {
			line.destroy();
			genNewLine();
		}

		if ((lineChartContainer.current && !line && !loading)) {
			genNewLine();
		}

		if (loading && lineChartContainer) {
			fetchData();
		}

		let resizeTimer;
		const handleResize = () => {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(() => {
				line.destroy();
				genNewLine();
			}, 300);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading])

	const customSetDate = (menuId, to, from, defaultT) => {
		setSelectedPeriod(menuId);
		setLoading(true);
		console.log('customSetDate');
	}

	return (
		loading ? <CircularLoader fill />
			:
			<div style={{ width: '100%', height: '100%' }}>
				<Grid container justify={'flex-start'} alignItems={'flex-start'} spacing={2}>
					<Grid item xs={10}></Grid>
					<Grid item xs={2}>
						<DateTimeFilter period={period} customSetDate={customSetDate} />
					</Grid>
				</Grid>

				<svg id="graph" ref={lineChartContainer}
					style={{
						width: '100%',
						height: '85%',
						// minHeight: 500
					}}>
				</svg>

				<Legend id={props.id} data={graphLines} />

				<Tooltip tooltip={value} id="temperature" />
				<Tooltip tooltip={value} id="co2" />
				<Tooltip tooltip={value} id="humidity" />
			</div>
	)
}));

export default RoomGraph;