/* eslint-disable array-callback-return */
import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import moment from 'moment';
import { Grid } from '@material-ui/core';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import IconButton from '@material-ui/core/IconButton';
import cookie from 'react-cookies';

import { useLocalization } from 'Hooks';
import d3Line from 'Components/Graphs/classes/d3Line';
import Legend from 'Components/Graphs/Legend';
import lineStyles from 'Components/Custom/Styles/lineGraphStyles';
import Tooltip from 'Components/Room/Tooltip';
import { getDeviceDataConverted, getBuildingDevices, getQualitativeData, getRoomDevices, getActivityLevelData } from 'data/climaid';
import { DateTimeFilter } from 'Components';
import CircularLoader from 'Components/Loaders/CircularLoader';

let line = null;

const RoomGraph = React.memo(React.forwardRef((props, ref) => {
	const [value, setValue] = useState({ value: null, date: null });
	const [period, setPeriod] = useState(null);
	const [selectedPeriod, setSelectedPeriod] = useState(2);
	const [didSetCustomDate, setDidSetCustomDate] = useState(false);
	const [from, setFrom] = useState(null);
	const [to, setTo] = useState(null);
	const [timeType, setTimeType] = useState(null);
	const [timeTypeData, setTimeTypeData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [graphLines, setGraphLines] = useState({});
	const lineChartContainer = useRef(null);
	const t = useLocalization();
	const classes = lineStyles({ id: props.id });
	const room = props.room;
	const checkboxStates = props.checkboxStates;

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
			humidity: [],
			battery: [],
			userexperience: [],
			analytics: []
		}

		async function fetchData() {
			let cookiePeriod = cookie.load('graph_period');
			let period = selectedPeriod;
			if (cookiePeriod) {
				period = cookiePeriod;
				setDidSetCustomDate(true);
			} else {
				period = getPeriod(selectedPeriod);
			}

			setPeriod(period);

			cookie.save('graph_period', period, { path: '/', expires: moment().add('1', 'day').toDate() })

			if (room.devices.length) {
				await Promise.all(
					Object.keys(props.checkboxStates).map(async key => {
						let temperatureData = null;
						let temperatureAvgData = [];
						let co2Data = null;
						let co2AvgData = [];
						let humidityData = null;
						let humidityAvgData = [];
						let batteryData = null;
						let batteryAvgData = [];
						let userexperienceData = null;
						let analyticsData = null;

						let devices = null;
						if (key === 'tempavgbuilding' || key === 'co2avgbuilding' || key === 'humidityavgbuilding' || key === 'batteryavgbuilding') {
							devices = await getBuildingDevices(room.building.uuid);
							// console.log(devices);
						}

						if (key === 'temphistory' || key === 'tempanbmin' || key === 'tempanbmax') {
							temperatureData = await getDeviceDataConverted(room.devices[0].device, period, 'temperature');
						}
						if (key === 'tempavgbuilding') {
							let combinedData = {};
							await Promise.all(
								devices.map(async device => {
									if (device.type === 'data') {
										let deviceData = await getDeviceDataConverted(device.device, period, 'temperature');
										deviceData.map(data => {
											if (!combinedData[data.date]) {
												combinedData[data.date] = parseFloat(data.value);
											} else {
												combinedData[data.date] += parseFloat(data.value);
											}
										});
									}
								})
							);

							Object.entries(combinedData).map(value => {
								temperatureAvgData.push({ date: value[0], value: value[1] / devices.length });
							});
						}

						if (key === 'co2history' || key === 'co2anbmin' || key === 'co2anbmax') {
							co2Data = await getDeviceDataConverted(room.devices[0].device, period, 'co2');
						}
						if (key === 'co2avgbuilding') {
							let combinedData = {};
							await Promise.all(
								devices.map(async device => {
									if (device.type === 'data') {
										let deviceData = await getDeviceDataConverted(device.device, period, 'co2');
										deviceData.map(data => {
											if (!combinedData[data.date]) {
												combinedData[data.date] = parseFloat(data.value);
											} else {
												combinedData[data.date] += parseFloat(data.value);
											}
										});
									}
								})
							);

							Object.entries(combinedData).map(value => {
								co2AvgData.push({ date: value[0], value: value[1] / devices.length });
							});
						}

						if (key === 'humidityhistory') {
							humidityData = await getDeviceDataConverted(room.devices[0].device, period, 'humidity');
						}
						if (key === 'humidityavgbuilding') {
							let combinedData = {};
							await Promise.all(
								devices.map(async device => {
									if (device.type === 'data') {
										let deviceData = await getDeviceDataConverted(device.device, period, 'humidity');
										deviceData.map(data => {
											if (!combinedData[data.date]) {
												combinedData[data.date] = parseFloat(data.value);
											} else {
												combinedData[data.date] += parseFloat(data.value);
											}
										});
									}
								})
							);

							Object.entries(combinedData).map(value => {
								humidityAvgData.push({ date: value[0], value: value[1] / devices.length });
							});
						}

						if (key === 'batteryhistory') {
							batteryData = await getDeviceDataConverted(room.devices[0].device, period, 'batteristatus');
						}
						if (key === 'batteryavgbuilding') {
							let combinedData = {};
							await Promise.all(
								devices.map(async device => {
									if (device.type === 'data') {
										let deviceData = await getDeviceDataConverted(device.device, period, 'batteristatus');
										deviceData.map(data => {
											if (!combinedData[data.date]) {
												combinedData[data.date] = parseFloat(data.value);
											} else {
												combinedData[data.date] += parseFloat(data.value);
											}
										});
									}
								})
							);

							Object.entries(combinedData).map(value => {
								batteryAvgData.push({ date: value[0], value: value[1] / devices.length });
							});
						}

						if (key === 'userexperience' && Object.keys(checkboxStates['userexperience']).length) {
							userexperienceData = [];
							let buildingDevices = await getBuildingDevices(room.building.uuid);
							let newDevices = [];
							buildingDevices.map(device => {
								if (device.type === 'userdata') {
									newDevices.push(device.device);
								}
							});

							await Promise.all(
								Object.keys(checkboxStates['userexperience']).map(async experienceType => {
									if (experienceType === 'warm' ||
										experienceType === 'cold' ||
										experienceType === 'windy' ||
										experienceType === 'heavyair' ||
										experienceType === 'concentration' ||
										experienceType === 'tired' ||
										experienceType === 'itchyeyes' ||
										experienceType === 'lighting' ||
										experienceType === 'blinded' ||
										experienceType === 'noise') {

										let qualitativeData = await getQualitativeData(newDevices, period);

										if (qualitativeData) {
											qualitativeData.map(td => {
												const ts = td.uts * 1000;
												let hasObjectKey = null;
												userexperienceData.map((d, i) => {
													if (d.ts === ts) {
														hasObjectKey = i;
													}
												});

												let tmpObj = {};
												if (hasObjectKey === null) {
													tmpObj["ts"] = ts;
													tmpObj["warm"] = 0;
													tmpObj["cold"] = 0;
													tmpObj["windy"] = 0;
													tmpObj["heavyair"] = 0;
													tmpObj["concentration"] = 0;
													tmpObj["tired"] = 0;
													tmpObj["itchyeyes"] = 0;
													tmpObj["lighting"] = 0;
													tmpObj["blinded"] = 0;
													tmpObj["noisy"] = 0;
												} else {
													tmpObj = userexperienceData[hasObjectKey];
												}

												Object.keys(td).map(tdkey => {
													if (tdkey === experienceType) {
														tmpObj[experienceType] = td[experienceType];
													}
												});

												if (hasObjectKey === null) {
													userexperienceData.push(tmpObj);
												} else {
													userexperienceData[hasObjectKey] = tmpObj;
												}
											});
										}
									} else if (experienceType.indexOf('warm_') !== -1 ||
										experienceType.indexOf('cold_') !== -1 ||
										experienceType.indexOf('windy_') !== -1 ||
										experienceType.indexOf('heavyair_') !== -1 ||
										experienceType.indexOf('concentration_') !== -1 ||
										experienceType.indexOf('tired_') !== -1 ||
										experienceType.indexOf('itchyeyes_') !== -1 ||
										experienceType.indexOf('lighting_') !== -1 ||
										experienceType.indexOf('blinded_') !== -1 ||
										experienceType.indexOf('noise_') !== -1) {

										let keyParts = experienceType.split('_');
										let roomDevices = await getRoomDevices(keyParts[1]);

										let newDevices = [];
										roomDevices.map(device => {
											if (device.type === 'userdata') {
												newDevices.push(device.device);
											}
										});

										let qualitativeData = await getQualitativeData(newDevices, period);

										if (qualitativeData) {
											qualitativeData.map(td => {
												const ts = td.uts * 1000;
												let hasObjectKey = null;
												userexperienceData.map((d, i) => {
													if (d.ts === ts) {
														hasObjectKey = i;
													}
												});

												let tmpObj = {};
												if (hasObjectKey === null) {
													tmpObj["ts"] = ts;
													tmpObj["warm"] = 0;
													tmpObj["cold"] = 0;
													tmpObj["windy"] = 0;
													tmpObj["heavyair"] = 0;
													tmpObj["concentration"] = 0;
													tmpObj["tired"] = 0;
													tmpObj["itchyeyes"] = 0;
													tmpObj["lighting"] = 0;
													tmpObj["blinded"] = 0;
													tmpObj["noisy"] = 0;
												} else {
													tmpObj = userexperienceData[hasObjectKey];
												}

												Object.keys(td).map(tdkey => {
													if (tdkey === keyParts[0]) {
														tmpObj[tdkey] = td[tdkey];
													}
												});

												if (hasObjectKey === null) {
													userexperienceData.push(tmpObj);
												} else {
													userexperienceData[hasObjectKey] = tmpObj;
												}
											});
										}
									}
								})
							);
						}

						if (key === 'analytics' && Object.keys(checkboxStates['analytics']).length) {
							analyticsData = [];
							let buildingDevices = await getBuildingDevices(room.building.uuid);
							let newDevices = [];
							buildingDevices.map(device => {
								if (device.type === 'data') {
									newDevices.push(device.device);
								}
							});

							await Promise.all(
								Object.keys(checkboxStates['analytics']).map(async experienceType => {
									if (experienceType === 'activitylevel') {
										let data = await getActivityLevelData(newDevices, period);
										console.log(data);

										analyticsData = data;
										
									} else if (experienceType.indexOf('activitylevel_') !== -1) {
										let keyParts = experienceType.split('_');
										let roomDevices = await getRoomDevices(keyParts[1]);

										let newDevices = [];
										roomDevices.map(device => {
											if (device.type === 'data') {
												newDevices.push(device.device);
											}
										});
									}
								})
							);
						}

						if (props.checkboxStates[key]) {
							switch (key) {
								default:
								case 'temphistory':
									if (temperatureData) {
										graphLinesData.temperature.push({
											unit: '°C',
											maxValue: 24.5,
											noArea: true,
											name: key,
											median: true,
											data: temperatureData,
											color: "#e28117",
											alarmColor: '#ff0000',
											dotSize: period.timeTypeData === 1 ? 2 : 6
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
								case 'tempavgbuilding':
									if (temperatureAvgData.length) {
										graphLinesData.temperature.push({
											unit: '°C',
											maxValue: 24.5,
											name: key,
											median: true,
											data: temperatureAvgData,
											color: "#e26f17",
											alarmColor: '#ff0000',
											noDots: true
										});
									}
									break;
								case 'co2history':
									if (co2Data) {
										graphLinesData.co2.push({
											unit: 'ppm',
											maxValue: 1000,
											noArea: true,
											name: key,
											median: true,
											data: co2Data,
											color: "#245bed",
											alarmColor: '#ff0000',
											dotSize: period.timeTypeData === 1 ? 2 : 6
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
								case 'co2avgbuilding':
									if (co2AvgData.length) {
										graphLinesData.co2.push({
											unit: 'ppm',
											maxValue: 1000,
											name: key,
											median: true,
											data: co2AvgData,
											color: "#2400ed",
											alarmColor: '#ff0000',
											noDots: true
										});
									}
									break;
								case 'humidityhistory':
									if (humidityData) {
										graphLinesData.humidity.push({
											unit: '%',
											maxValue: 50,
											noArea: true,
											name: key,
											median: true,
											data: humidityData,
											color: "#1cc933",
											alarmColor: '#ff0000',
											dotSize: period.timeTypeData === 1 ? 2 : 6
										});
									}
									break;
								case 'humidityavgbuilding':
									if (humidityAvgData.length) {
										graphLinesData.humidity.push({
											unit: '%',
											maxValue: 50,
											name: key,
											median: true,
											data: humidityAvgData,
											color: "#009b33",
											alarmColor: '#ff0000',
											noDots: true
										});
									}
									break;
								case 'batteryhistory':
									if (batteryData) {
										graphLinesData.battery.push({
											unit: '%',
											maxValue: 1000,
											noArea: true,
											name: key,
											median: true,
											data: batteryData,
											color: "#1cc933",
											dotSize: period.timeTypeData === 1 ? 2 : 6
										});
									}
									break;
								case 'batteryavgbuilding':
									if (batteryAvgData.length) {
										graphLinesData.humidity.push({
											unit: '%',
											name: key,
											median: true,
											data: batteryAvgData,
											color: "#1c9d33",
											noDots: true
										});
									}
									break;
								case 'userexperience':
									if (userexperienceData) {
										graphLinesData.userexperience.push({
											noArea: true,
											isBar: true,
											name: key,
											median: true,
											data: userexperienceData,
											noDots: true
										});
									}
									break;
								case 'analytics':
									if (analyticsData) {
										graphLinesData.analytics.push({
											noArea: true,
											unit: '%',
											name: key,
											median: true,
											data: analyticsData,
											color: "darkgreen",
											noDots: false,
											maxValue: 100
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
			let thisfrom = 0;
			let thisto = 0;
			let thistimetype;
			let thistimetypedata;

			if (!from || !to) {
				setSelectedPeriod(menuId);

				switch (menuId) {
					default:
					case 10:
						thisfrom = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss');
						thisto = moment().format('YYYY-MM-DD HH:mm:ss');
						thistimetype = 1;
						thistimetypedata = 1;
						break;
					case 11:
						thisfrom = moment().subtract(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss');
						thisto = moment().subtract(1, 'day').endOf('day').format('YYYY-MM-DD HH:mm:ss');
						thistimetype = 1;
						thistimetypedata = 1;
						break;
					case 1:
						thisfrom = moment().startOf('week').format('YYYY-MM-DD HH:mm:ss');
						thisto = moment().endOf('week').format('YYYY-MM-DD HH:mm:ss');
						thistimetype = 2;
						thistimetypedata = 1;
						break;
					case 2:
						thisfrom = moment().subtract(7, 'days').startOf('day').format('YYYY-MM-DD HH:mm:ss');
						thisto = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss');
						thistimetype = 2;
						thistimetypedata = 1;
						break;
					case 3:
						thisfrom = moment().startOf('month').startOf('day').format('YYYY-MM-DD HH:mm:ss');
						thisto = moment().endOf('month').format('YYYY-MM-DD HH:mm:ss');
						thistimetype = 2;
						thistimetypedata = 2;
						break;
					case 5:
						thisfrom = moment().subtract(90, 'days').startOf('day').format('YYYY-MM-DD HH:mm:ss');
						thisto = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss');
						thistimetype = 2;
						thistimetypedata = 2;
						break;
					case 7:
						thisfrom = moment().subtract(30, 'days').startOf('day').format('YYYY-MM-DD HH:mm:ss');
						thisto = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss');
						thistimetype = 2;
						thistimetypedata = 2;
						break;
				}

				setFrom(thisfrom);
				setTo(thisto);
				setTimeType(thistimetype);
				setTimeTypeData(thistimetypedata);
			} else {
				thisfrom = from;
				thisto = to;
				thistimetype = timeType;
				thistimetype = timeTypeData;
			}

			return {
				menuId: menuId,
				from: thisfrom,
				to: thisto,
				timeType: thistimetype,
				timeTypeData: thistimetypedata
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
		cookie.remove('graph_period', { path: '/' });

		setSelectedPeriod(menuId);
		setFrom(null);
		setTo(null);
		setDidSetCustomDate(false);
		setLoading(true);
	}

	const goForward = () => {
		let thisfrom = 0;
		let thisto = 0;

		switch (selectedPeriod) {
			default:
			case 10:
				thisfrom = moment(from).add(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss');
				thisto = moment(to).add(1, 'day').endOf('day').format('YYYY-MM-DD HH:mm:ss');
				break;
			case 11:
				thisfrom = moment(from).add(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss');
				thisto = moment(to).add(1, 'day').endOf('day').format('YYYY-MM-DD HH:mm:ss');
				break;
			case 1:
				thisfrom = moment(from).add(1, 'week').startOf('week').format('YYYY-MM-DD HH:mm:ss');
				thisto = moment(to).add(1, 'week').endOf('week').format('YYYY-MM-DD HH:mm:ss');
				break;
			case 2:
				thisfrom = moment(from).add(7, 'days').startOf('day').format('YYYY-MM-DD HH:mm:ss');
				thisto = moment(to).add(7, 'days').startOf('day').format('YYYY-MM-DD HH:mm:ss');
				break;
			case 3:
				thisfrom = moment(from).add(1, 'month').startOf('month').startOf('day').format('YYYY-MM-DD HH:mm:ss');
				thisto = moment(to).add(1, 'month').endOf('month').format('YYYY-MM-DD HH:mm:ss');
				break;
			case 5:
				thisfrom = moment(from).add(90, 'days').startOf('day').format('YYYY-MM-DD HH:mm:ss');
				thisto = moment(to).add(90, 'days').endOf('day').format('YYYY-MM-DD HH:mm:ss');
				break;
			case 7:
				thisfrom = moment(from).add(30, 'days').startOf('day').format('YYYY-MM-DD HH:mm:ss');
				thisto = moment(to).add(30, 'days').endOf('day').format('YYYY-MM-DD HH:mm:ss');
				break;
		}

		setFrom(thisfrom);
		setTo(thisto);

		cookie.remove('graph_period', { path: '/' });

		setDidSetCustomDate(true);
		setLoading(true);
	}

	const goBack = () => {
		let thisfrom = 0;
		let thisto = 0;

		switch (selectedPeriod) {
			default:
			case 10:
				thisfrom = moment(from).subtract(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss');
				thisto = moment(to).subtract(1, 'day').endOf('day').format('YYYY-MM-DD HH:mm:ss');
				break;
			case 11:
				thisfrom = moment(from).subtract(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss');
				thisto = moment(to).subtract(1, 'day').endOf('day').format('YYYY-MM-DD HH:mm:ss');
				break;
			case 1:
				thisfrom = moment(from).subtract(1, 'week').startOf('week').format('YYYY-MM-DD HH:mm:ss');
				thisto = moment(to).subtract(1, 'week').endOf('week').format('YYYY-MM-DD HH:mm:ss');
				break;
			case 2:
				thisfrom = moment(from).subtract(7, 'days').startOf('day').format('YYYY-MM-DD HH:mm:ss');
				thisto = moment(to).subtract(7, 'days').startOf('day').format('YYYY-MM-DD HH:mm:ss');
				break;
			case 3:
				thisfrom = moment(from).subtract(1, 'month').startOf('month').startOf('day').format('YYYY-MM-DD HH:mm:ss');
				thisto = moment(to).subtract(1, 'month').endOf('month').format('YYYY-MM-DD HH:mm:ss');
				break;
			case 5:
				thisfrom = moment(from).subtract(90, 'days').startOf('day').format('YYYY-MM-DD HH:mm:ss');
				thisto = moment(to).subtract(90, 'days').endOf('day').format('YYYY-MM-DD HH:mm:ss');
				break;
			case 7:
				thisfrom = moment(from).subtract(30, 'days').startOf('day').format('YYYY-MM-DD HH:mm:ss');
				thisto = moment(to).subtract(30, 'days').endOf('day').format('YYYY-MM-DD HH:mm:ss');
				break;
		}

		setFrom(thisfrom);
		setTo(thisto);

		cookie.remove('graph_period', { path: '/' });

		setDidSetCustomDate(true);
		setLoading(true);
	}

	return (
		loading ? <CircularLoader fill />
			:
			<div style={{ width: '100%', height: '100%' }}>
				<Grid container justify={'flex-start'} alignItems={'flex-start'} spacing={2}>
					<Grid item xs={8} xl={10}></Grid>
					<Grid item xs={4} xl={2}>
						<Grid container justify={'space-between'} alignItems={'flex-start'} spacing={2}>
							<IconButton aria-label="Gå tilbage" onClick={goBack}>
								<KeyboardArrowLeftIcon fontSize="large" style={{ color: '#fff' }} />
							</IconButton>
							<DateTimeFilter period={period} customSetDate={customSetDate} didSetCustomDate={didSetCustomDate} />
							<IconButton aria-label="Gå frem" onClick={goForward}>
								<KeyboardArrowRightIcon fontSize="large" style={{ color: '#fff' }} />
							</IconButton>
						</Grid>
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
				<Tooltip tooltip={value} id="battery" />
			</div>
	)
}));

export default RoomGraph;