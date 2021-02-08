/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import { IconButton, Grid, Typography, ListItem } from '@material-ui/core';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

import comformChartStyles from 'Styles/comformChartStyles';
import { getQualitativeData, getHeatmapData, getBuildingColorData, getActivityMinutes } from 'data/climaid';
import CircularLoader from 'Components/Loaders/CircularLoader';
import { ItemG, GridContainer } from 'Components';
import RoomComfortDropdown from './RoomComfortDropdown';
import RoomConformDateFilter from './RoomConformDateFilter';
import RomComfortGraphPopover from './RomComfortGraphPopover';

const RoomComfortGraph = (props) => {
	const classes = comformChartStyles();
	const room = props.room;
	const [loading, setLoading] = useState(true);
	const [loadingNewData, setLoadingNewData] = useState(false);
	const [currentReading, setCurrentReading] = useState(null);
	const [currentMeassurement, setCurrentMeassurement] = useState('temperature');
	const [currentMeassurementDataType, setCurrentMeassurementDataType] = useState('temperature');
	const [period, setPeriod] = useState(null);
	const [selectedPeriod, setSelectedPeriod] = useState(3);
	const [devices, setDevices] = useState([]);
	const [qualitativeDevices, setQualitativeDevices] = useState([]);

	const colors = ['#3fbfad', '#e28117', '#d1463d', '#e56363'];

	const legend = {
		temperature: [
			{ label: '< 16', color: '#025373' },
			{ label: '16 °C – 19 °C', color: '#04ADBF' },
			{ label: '19 °C – 21 °C', color: '#63F2F2' },
			{ label: '21 °C – 24,5 °C', color: '#65CCBD' },
			{ label: '24,5 °C – 26 °C', color: '#E89A45' },
			{ label: '26 °C – 29 °C', color: '#EA8282' },
			{ label: '> 29 °C', color: '#D65951' },
			{ label: 'Ingen data', color: '#E7E6E6' },
		],
		co2: [
			{ label: '< 800 ppm', color: '#65CCBD' },
			{ label: '800 – 1200 ppm', color: '#E89A45' },
			{ label: '1200 – 1700 ppm', color: '#EA8282' },
			{ label: '> 1700 ppm', color: '#D65951' },
			{ label: 'Ingen data', color: '#E7E6E6' },
		],
		humidity: [
			{ label: '< 15 %', color: '#025373' },
			{ label: '15 – 25%', color: '#04ADBF' },
			{ label: '25 – 30%', color: '#63F2F2' },
			{ label: '30 – 65%', color: '#65CCBD' },
			{ label: '65 – 75%', color: '#E89A45' },
			{ label: '75 – 85%', color: '#EA8282' },
			{ label: '> 85%', color: '#D65951' },
			{ label: 'Ingen data', color: '#E7E6E6' },
		],
		noisePeak: [
			{ label: '< 65 dB', color: '#65CCBD' },
			{ label: '65 – 70 dB', color: '#E89A45' },
			{ label: '70 – 75 dB', color: '#EA8282' },
			{ label: '> 75 dB', color: '#D65951' },
			{ label: 'Ingen data', color: '#E7E6E6' },
		],
		light: [
			{ label: '< 200 lx', color: '#025373' },
			{ label: '200 – 300 lx', color: '#04ADBF' },
			{ label: '300 – 500 lx', color: '#63F2F2' },
			{ label: '> 500 lx', color: '#65CCBD' },
			{ label: 'Ingen data', color: '#E7E6E6' },
		],
		voc: [
			{ label: '< 400 ppb', color: '#3fbfad' },
			{ label: '400 – 800 ppb', color: '#e28117' },
			{ label: '800 – 1000 ppb', color: '#e56363' },
			{ label: '> 1000 ppb', color: '#d1463d' },
			{ label: 'Ingen data', color: '#E7E6E6' },
		],
		colorData: [
			{ label: 'Godt', color: '#3fbfad' },
			{ label: 'Acceptabelt', color: '#e28117' },
			{ label: 'Uacceptabelt', color: '#e56363' },
			{ label: 'Yderst uacceptabelt', color: '#d1463d' },
			{ label: 'Ingen data', color: '#E7E6E6' },
		],
		activityMinutes: [
			{ label: '0 – 10 minutter', color: '#C9D8D9' },
			{ label: '10 – 30 minutter', color: '#7DA1A4' },
			{ label: '30 – 50 minutter', color: '#518285' },
			{ label: '50 – 60 minutter', color: '#266367' },
			{ label: 'Ingen data', color: '#E7E6E6' },
		]
	}

	useEffect(() => {
		console.log('useEffect');
		if (!loading) {
			setLoadingNewData(true);
		}

		let dataDevices = [];
		let dataDeviceIds = [];
		let userDevices = [];
		room.devices.map(device => {
			if (device.device) {
				const dataType = (device.datafields && device.datafields[currentMeassurement]) ? device.datafields[currentMeassurement] : currentMeassurement;
				setCurrentMeassurementDataType(dataType);

				dataDevices.push(device);
				dataDeviceIds.push(device.device);
			}
			if (device.qualitativeDevice) {
				userDevices.push(device.qualitativeDevice);
			}
		});

		setDevices(dataDevices);
		setQualitativeDevices(userDevices);

		async function fetchData() {
			let newPeriod = period;
			if (!newPeriod) {
				newPeriod = {};
				newPeriod.timeType = 1;
				newPeriod.from = moment().startOf('month').format('YYYY-MM-DD HH:mm:ss');
				newPeriod.to = moment().endOf('month').format('YYYY-MM-DD HH:mm:ss');
				setPeriod(newPeriod);
			}

			let data = null;
			if (currentMeassurement === 'colorData') {
				data = await getBuildingColorData(dataDeviceIds, newPeriod);
			} else if (currentMeassurement === 'activityMinutes') {
				data = await getActivityMinutes(newPeriod, dataDeviceIds);
				//console.log(data);
			} else {
				data = await getHeatmapData(currentMeassurementDataType, newPeriod, dataDeviceIds);
			}

			if (data) {
				let qualitativeData = await getQualitativeData(userDevices, newPeriod);

				setLoadingNewData(false);
				setLoading(false);

				generateChart(data, qualitativeData);
			} else {
				setLoadingNewData(false);
				setLoading(false);
			}
		};

		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentMeassurement, period]);

	const generateChart = (data, qualitativeData) => {
		let margin = { top: 30, right: 0, bottom: 30, left: 60 };
		let width = 830 - margin.left - margin.right;
		let height = 800 - margin.top - margin.bottom;
		let gridSize = 25;
		let days = generateDayLabels();
		let times = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];

		d3.select("#chart > *").remove(); //remove previous graph

		let svg = d3.select("#chart").append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		svg.selectAll(".timeLabel")
			.data(times)
			.enter().append("text")
			.text(function (d) { return d; })
			.style("text-anchor", "middle")
			.attr("transform", function (d, i) {
				return "translate(-15," + (gridSize * i + 5) + ") "
					+ "translate(10,6) rotate(-90)";
			})

		svg.selectAll(".dayLabel")
			.data(days)
			.enter().append("text")
			.text(function (d) { return d; })
			.style("text-anchor", "left")
			.attr("transform", function (d, i) {
				return "translate(" + (i * gridSize) + "," + gridSize * 25 + ") "
					+ "translate(" + gridSize / 1.5 + ", 125) rotate(-90)";
			})

		let cards = svg.selectAll(".hour")
			.data(data, function (d) { return d.ts ? moment(d.ts.split(' ')[0]).format("D") + ':' + d.ts.split(' ')[1] : '' });

		let daysInMonth = moment().daysInMonth();
		if (period) {
			if (period.timeType === 7) {
				daysInMonth = 30;
			} else {
				daysInMonth = moment(period.from).daysInMonth();
			}
		}

		for (let i = 1; i <= daysInMonth; i++) {
			svg.selectAll('.gridrect')
				.data(times)
				.enter().append("rect")
				.attr("x", function (d) { return (i - 1) * gridSize; })
				.attr("y", function (d) { return d * gridSize; })
				.attr("class", classes.rectbordered2)
				.attr("width", gridSize)
				.attr("height", gridSize)
				.style("fill", '#E7E6E6');
		}

		cards.enter().append("rect")
			.attr("x", function (d) { return d.ts ? (moment(d.ts.split(' ')[0]).format("D") - 1) * gridSize : '' })
			.attr("y", function (d) { return d.ts ? (d.ts.split(' ')[1]) * gridSize : '' })
			.attr("class", classes.rectbordered2)
			.attr("width", gridSize)
			.attr("height", gridSize)
			.style("fill", (d) => { 
				let color = '';
				if (currentMeassurement === 'colorData') {
					color = colors[d.color - 1];
				} else if (currentMeassurement === 'activityMinutes') {
					color = decideColor(d.activeMinutes);
				} else {
					color = decideColor(d.average);
				}

				return color;
			})
			.style("cursor", "pointer")
			.on('click', (event, d) => {
				console.log(d);
			 	setCurrentReading(d);
			});

		cards.exit().remove();

		// eslint-disable-next-line array-callback-return
		qualitativeData.map((reading) => {
			if (reading) {
				let day = moment(reading.ts.split(' ')[0]).format('D');
				let hour = parseInt(reading.ts.split(' ')[1]) + 1;

				svg.append("circle")
					.attr("cx", () => { return (day - 1) * gridSize + gridSize / 2; })
					.attr("cy", () => { return hour * gridSize - gridSize / 2; })
					.attr("r", 6)
					.style("fill", "#7f7f7f")
					.style("cursor", "pointer")
					.on('click', (event) => {
						setCurrentReading(reading);
					});
			}
		});
	}

	const generateDayLabels = () => {
		let dates = [];

		let from = moment().startOf('month');
		let to = moment().endOf('month');

		if (period) {
			from = moment(period.from);
			to = moment(period.to);
		}

		const numDays = to.add(1, 'day').diff(from, 'days');
		const monthDate = from;
		for (let i = 1; i <= numDays; i++) {
			dates.push(monthDate.format('DD-MM-YYYY dddd'));
			monthDate.add(1, 'day');
		}

		return dates;
	};

	const closeReadingPopover = () => {
		setCurrentReading(null);
	};

	const handleCheckboxChange = (value) => {
		setCurrentMeassurement(value);
	};

	const decideColor = (value) => {
		// console.log(value);
		let color = '#E7E6E6';

		if (currentMeassurement === 'temperature') {
			if (value < 16) {
				color = '#025373';
			} else if (value >= 16 && value < 19) {
				color = '#04ADBF';
			} else if (value >= 19 && value < 21) {
				color = '#63F2F2';
			} else if (value >= 21 && value < 24.5) {
				color = '#65CCBD';
			} else if (value >= 24.5 && value < 26) {
				color = '#E89A45';
			} else if (value >= 26 && value < 29.5) {
				color = '#EA8282';
			} else if (value >= 29.5) {
				color = '#D65951';
			}
		} else if (currentMeassurement === 'co2') {
			if (value < 800) {
				color = '#65CCBD';
			} else if (value >= 800 && value < 1200) {
				color = '#E89A45';
			} else if (value >= 1200 && value < 1700) {
				color = '#EA8282';
			} else if (value >= 1700) {
				color = '#D65951';
			}
		} else if (currentMeassurement === 'humidity') {
			if (value < 15) {
				color = '#025373';
			} else if (value >= 15 && value < 21) {
				color = '#04ADBF';
			} else if (value >= 25 && value < 30) {
				color = '#63F2F2';
			} else if (value >= 30 && value < 65) {
				color = '#65CCBD';
			} else if (value >= 65 && value < 75) {
				color = '#E89A45';
			} else if (value >= 75 && value < 85) {
				color = '#EA8282';
			} else if (value >= 85) {
				color = '#D65951';
			}
		} else if (currentMeassurement === 'voc') {
			if (value < 400) {
				color = '#65CCBD';
			} else if (value <= 400 && value < 800) {
				color = '#E89A45';
			} else if (value <= 800 && value < 1000) {
				color = '#EA8282';
			} else if (value <= 1000) {
				color = '#D65951';
			}
		} else if (currentMeassurement === 'noisePeak') {
			if (value < 65) {
				color = '#65CCBD';
			} else if (value >= 65 && value < 70) {
				color = '#E89A45';
			} else if (value >= 70 && value < 75) {
				color = '#EA8282';
			} else if (value >= 75) {
				color = '#D65951';
			}
		} else if (currentMeassurement === 'light') {
			if (value < 200) {
				color = '#025373';
			} else if (value <= 200 && value < 300) {
				color = '#04ADBF';
			} else if (value <= 300 && value < 500) {
				color = '#63F2F2';
			} else if (value <= 500) {
				color = '#65CCBD';
			}
		} else if (currentMeassurement === 'activityMinutes') {
			if (value < 10) {
				color = '#C9D8D9';
			} else if (value >= 10 && value < 30) {
				color = '#7DA1A4';
			} else if (value >= 30 && value < 50) {
				color = '#518285';
			} else if (value >= 50 && value < 60) {
				color = '#266367';
			}
		}

		return color;
	}

	const renderSignature = () => {
		let text = '';

		if (currentMeassurement === 'temperature') {
			text = 'Temperatur [°C]';
		} else if (currentMeassurement === 'co2') {
			text = 'Luftkvalitet [ppm]';
		} else if (currentMeassurement === 'humidity') {
			text = 'Luftfugtighed [%]';
		} else if (currentMeassurement === 'voc') {
			text = 'VOC [ppb]';
		} else if (currentMeassurement === 'noisePeak') {
			text = 'Lydniveau [dB]';
		} else if (currentMeassurement === 'light') {
			text = 'Lysniveau [lx]';
		} else if (currentMeassurement === 'colorData') {
			text = 'Indeklima';
		} else if (currentMeassurement === 'activityMinutes') {
			text = 'Aktivitet';
		}

		return text;
	}

	const renderSignatureDesc = () => {
		let text = 'Hver firkant viser gennemsnittet af målingerne.';
		if (currentMeassurement === 'activityMinutes') {
			text = 'Hver firkant viser hvor længe der har været aktivitet i lokalet.';
		}

		return text;
	}

	const customSetDate = (menuId, to, from, defaultT) => {
		setSelectedPeriod(menuId);

		let newPeriod = { ...period };
		if (menuId === 3) {
			newPeriod.from = moment().startOf('month').startOf('day').format('YYYY-MM-DD HH:mm:ss');
			newPeriod.to = moment().endOf('month').endOf('day').format('YYYY-MM-DD HH:mm:ss');
		} else {
			newPeriod.from = moment().subtract(30, 'days').startOf('day').format('YYYY-MM-DD HH:mm:ss');
			newPeriod.to = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss');
		}

		setPeriod(newPeriod);
	}

	const goBack = () => {
		let thisfrom = 0;
		let thisto = 0;

		switch (selectedPeriod) {
			default:
			case 3:
				thisfrom = moment(period.from).subtract(1, 'month').startOf('month').startOf('day').format('YYYY-MM-DD HH:mm:ss');
				thisto = moment(period.to).subtract(1, 'month').endOf('month').endOf('day').format('YYYY-MM-DD HH:mm:ss');
				break;
			case 7:
				thisfrom = moment(period.from).subtract(30, 'days').startOf('day').format('YYYY-MM-DD HH:mm:ss');
				thisto = moment(period.to).subtract(30, 'days').endOf('day').format('YYYY-MM-DD HH:mm:ss');
				break;
		}

		let newPeriod = {};
		newPeriod.timeType = 1;
		newPeriod.from = thisfrom;
		newPeriod.to = thisto;
		setPeriod(newPeriod);
	}

	const goForward = () => {
		let thisfrom = 0;
		let thisto = 0;

		switch (selectedPeriod) {
			default:
			case 3:
				thisfrom = moment(period.from).add(1, 'month').startOf('month').startOf('day').format('YYYY-MM-DD HH:mm:ss');
				thisto = moment(period.to).add(1, 'month').endOf('month').endOf('day').format('YYYY-MM-DD HH:mm:ss');
				break;
			case 7:
				thisfrom = moment(period.from).add(30, 'days').startOf('day').format('YYYY-MM-DD HH:mm:ss');
				thisto = moment(period.to).add(30, 'days').endOf('day').format('YYYY-MM-DD HH:mm:ss');
				break;
		}

		let newPeriod = {};
		newPeriod.timeType = 1;
		newPeriod.from = thisfrom;
		newPeriod.to = thisto;
		setPeriod(newPeriod);
	}

	return (
		<>
			{loading ? <CircularLoader fill />
				:
				<GridContainer spacing={5}>
					<ItemG xs={8}>
						<Grid container justify={'flex-start'} alignItems={'flex-start'} spacing={2}>
							<Grid item xs={4}>
								<RoomComfortDropdown
									onChange={handleCheckboxChange}
									currentMeassurement={currentMeassurement}
								/>
							</Grid>
							<Grid item xs={4}>
								<ListItem key={0} button className={classes.topDropdown}>
									<Button fullWidth={true} className={classes.topDropdownButton} onClick={() => handleCheckboxChange('colorData')}>Indeklima</Button>									
								</ListItem>
							</Grid>
							<Grid item xs={4}>
								<ListItem key={0} button className={classes.topDropdown}>
									<Button fullWidth={true} className={classes.topDropdownButton} onClick={() => handleCheckboxChange('activityMinutes')}>Aktivitet</Button>
								</ListItem>
							</Grid>
						</Grid>

						<div style={{ backgroundColor: '#fff', marginTop: 18 }}>
							{loadingNewData ? <CircularLoader fill /> : <div id="chart"></div>}
						</div>

						{currentReading ? <RomComfortGraphPopover open={currentReading ? true : false} onClose={closeReadingPopover} currentReading={currentReading} devices={devices} qualitativeDevices={qualitativeDevices} /> : ""}
					</ItemG>
					<ItemG xs={4}>
						<Grid container justify={'space-between'} alignItems={'center'} spacing={2} style={{ marginTop: 10, maxWidth: 300 }}>
							<IconButton aria-label="Gå tilbage" onClick={goBack}>
								<KeyboardArrowLeftIcon fontSize="large" style={{ color: '#000' }} />
							</IconButton>
							<RoomConformDateFilter period={period} customSetDate={customSetDate} />
							<IconButton aria-label="Gå frem" onClick={goForward}>
								<KeyboardArrowRightIcon fontSize="large" style={{ color: '#000' }} />
							</IconButton>
						</Grid>

						<div style={{ marginTop: 100 }}>
							<Typography variant="h4">{renderSignature()}</Typography>
							<Typography variant="body2" style={{ fontSize: 16 }}>{renderSignatureDesc()}</Typography>

							<Grid container style={{ marginTop: 20 }}>
								<Grid item xs={12}>
									{
										legend[currentMeassurement].map((l) => {
											return (
												<Grid container style={{ marginBottom: 10 }} key={l.color}>
													<Grid item xs={1}>
														<div style={{ width: 25, height: 25, backgroundColor: l.color }}></div>
													</Grid>
													<Grid item xs={11}>
														<Typography variant="body1" style={{ fontSize: 16 }}>{l.label}</Typography>
													</Grid>
												</Grid>
											)
										})
									}
								</Grid>
							</Grid>
						</div>
					</ItemG>
				</GridContainer>
			}
		</>
	);
}

export default RoomComfortGraph;
