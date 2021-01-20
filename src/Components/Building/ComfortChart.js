/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import styled from 'styled-components';

import comformChartStyles from 'Styles/comformChartStyles';
import { getBuildingColorData, getQualitativeData } from 'data/climaid';
import CircularLoader from 'Components/Loaders/CircularLoader';

const TCard = styled(Card)`
	position: absolute;
	top: -1000px;
	left: -1000px;
	min-width: 300px;
	min-height: 300px;
	border: 0;
	border-radius: 4;
	z-index: 2200;
	transition: 300ms all ease;
`

const ComfortChart = (props) => {
	const classes = comformChartStyles();
	const rooms = props.rooms;
	const [loading, setLoading] = useState(true);
	const [currentReading, setCurrentReading] = useState(null);
	const [left, setLeft] = useState(-1000);
	const [top, setTop] = useState(-1000);
	const [height, setHeight] = useState(800);

	const keyToText = {
		warm: 'For varmt',
		cold: 'For koldt',
		windy: 'Træk',
		heavyair: 'Tung luft',
		good: 'Godt',
		tired: 'Træthed',
		itchyeyes: 'Tørre øjne og næse',
		lighting: 'Dårlig belysning',
		blinded: 'Blænding',
		noisy: 'Støj'
	}

	useEffect(() => {
		let dataDevices = [];
		let userDevices = [];
		rooms.map(room => {
			room.devices.map(device => {
				if (device.device) {
					dataDevices.push(device.device);
				}
				if (device.qualitativeDevice) {
					userDevices.push(device.qualitativeDevice);
				}
			});
		});

		async function fetchData() {
			let colorData = await getBuildingColorData(dataDevices, 'month');
			if (colorData) {
				let period = {};
				period.timeType = 1;
				period.from = moment().startOf('month').format('YYYY-MM-DD HH:mm:ss');
				period.to = moment().endOf('month').format('YYYY-MM-DD HH:mm:ss');

				let qualitativeData = await getQualitativeData(userDevices, period);

				setLoading(false);

				generateChart(colorData, qualitativeData);
			}
		};

		if (window.innerHeight > 1000) {
			setHeight(820);
		} else {
			setHeight(window.innerHeight / 2);
		}

		fetchData();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const generateChart = (data, qualitativeData) => {
		let margin = { top: 30, right: 0, bottom: 100, left: 60 };
		let width = 830 - margin.left - margin.right;
		let height = 800 - margin.top - margin.bottom;
		let gridSize = 25;
		const colors = ['#3fbfad', '#e28117', '#d1463d', '#e56363'];
		let days = generateDayLabels();
		let times = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];

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

		const daysInMonth = moment().daysInMonth();
		for (let i = 1; i <= daysInMonth; i++) {
			svg.selectAll('.gridrect')
				.data(times)
				.enter().append("rect")
				.attr("x", function (d) { return (i - 1) * gridSize; })
				.attr("y", function (d) { return d * gridSize; })
				.attr("class", classes.rectbordered)
				.attr("width", gridSize)
				.attr("height", gridSize)
				.style("fill", '#ffffff');
		}

		cards.enter().append("rect")
			.attr("x", function (d) { return d.ts ? (moment(d.ts.split(' ')[0]).format("D") - 1) * gridSize : '' })
			.attr("y", function (d) { return d.ts ? (d.ts.split(' ')[1]) * gridSize : '' })
			.attr("class", classes.rectbordered)
			.attr("width", gridSize)
			.attr("height", gridSize)
			.style("fill", (d) => { return colors[d.color - 1]; });

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
						setLeft(event.pageX);
						setTop(event.pageY);
					});
			}
		});
	}

	const generateDayLabels = () => {
		let dates = [];

		const monthDate = moment().startOf('month');
		const daysInMonth = monthDate.daysInMonth();
		for (let i = 1; i <= daysInMonth; i++) {
			dates.push(monthDate.format('DD-MM-YYYY dddd'));
			monthDate.add(1, 'day');
		}

		return dates;
	};

	const closeReadingPopover = () => {
		setCurrentReading(null);
	};

	return (
		<>
			{loading ? <CircularLoader fill />
				:
				<>
					<div style={{ position: 'absolute', top: '55%', left: '50%', transform: 'translate(-50%, -50%)', width: 850, zIndex: 2100, backgroundColor: '#fff', borderRadius: 4 }}>
						<div style={{ position: 'absolute', top: 10, right: 0, zIndex: 1100 }}>
							<Button onClick={props.onClose}>
								<CloseIcon />
							</Button>
						</div>
						<div style={{ position: 'absolute', top: '50%', left: -30, transform: 'rotate(270deg)', color: '#000' }}>Time på døgnet</div>
						<div style={{ textAlign: 'center', width: '90%', height: 150, margin: '0 auto', backgroundColor: '#fff' }}>{props.type === 'building' ? <><h2>KOMFORT DIAGRAM - BYGNING</h2><p>Hver firkant er en vurdering af indeklimaet i hele bygningen.<br />Time firkantens farve bestemmes af indeklima målingerne og viser om og hvornår indeklimaet har brug for ekstra opmærksomhed.</p></> : <><h2> KOMFORT DIAGRAM - LOKALE</h2><p>Hver firkant er en vurdering af indeklimaet i lokalet.<br />Time firkantens farve bestemmes af indeklima målingerne og viser hvordan det samlede indeklima har været.</p></>}</div>
						<div style={{ height: height, overflow: 'scroll' }}>
							<div id="chart"></div>
						</div>
					</div>

					{currentReading ?
						<TCard id='readingPopoverOpen' style={{ left: left, top: top }}>
							<CardContent>
								<div style={{ position: 'absolute', top: 0, right: -10 }}>
									<Button onClick={closeReadingPopover}>
										<CloseIcon />
									</Button>
								</div>
								{Object.keys(currentReading).map(key => {
									if (key !== 'ts' && key !== 'uts' && currentReading[key] > 0) {
										return <div key={key}>{keyToText[key]}: {currentReading[key]}</div>
									}
								})}
							</CardContent>
						</TCard>
						: ""}
				</>
			}
		</>
	);
}

export default ComfortChart;