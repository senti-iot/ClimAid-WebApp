/* eslint-disable array-callback-return */
import React, { useEffect } from 'react';
import * as d3 from 'd3';
import moment from 'moment';
import comformChartStyles from 'Styles/comformChartStyles';
import { getBuildingColorData } from 'data/climaid';

const ComfortChart = (props) => {
	const classes = comformChartStyles();
	const rooms = props.rooms;

	useEffect(() => {
		let dataDevices = [];
		let userDevices = [];
		rooms.map(room => {
			room.devices.map(device => {
				if (device.type === 'data') {
					dataDevices.push(device.device);
				} else if (device.type === 'userdata') {
					userDevices.push(device.device);
				}
			});
		});

		async function fetchData() {
			let colorData = await getBuildingColorData(dataDevices, 'month');
			if (colorData) {
				generateChart(colorData);
			}
		};

		fetchData();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const generateChart = (data) => {
		let margin = { top: 30, right: 0, bottom: 100, left: 30 };
		let width = 810 - margin.left - margin.right;
		let height = 800 - margin.top - margin.bottom;
		let gridSize = 25;
		// let legendElementWidth = gridSize * 2;
		// let buckets = 9;
		const colors = ['#3fbfad', '#e28117', '#d1463d', '#e56363'];
		let days = generateDayLabels();
		let times = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];

		let svg = d3.select("#chart").append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			//.attr("style", "background-color: red")
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

		// let colorScale = d3.scaleQuantile()
		// 	.domain([0, buckets - 1, d3.max(data, function (d) { return d.value; })])
		// 	.range(colors);

		let cards = svg.selectAll(".hour")
			.data(data, function (d) { return moment(d.ts.split(' ')[0]).format("D") + ':' + d.ts.split(' ')[1]; });

		// cards.append("title");
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
			.attr("x", function (d) { return (moment(d.ts.split(' ')[0]).format("D") - 1) * gridSize; })
			.attr("y", function (d) { return (d.ts.split(' ')[1]) * gridSize; })
			.attr("class", classes.rectbordered)
			.attr("width", gridSize)
			.attr("height", gridSize)
			.style("fill", (d) => { return colors[d.color - 1]; });

		// cards.transition().duration(1000)
		// 	.style("fill", function (d) { return colorScale(d.value); });

		// cards.select("title").text(function (d) { return d.value; });

		cards.exit().remove();

		// eslint-disable-next-line array-callback-return
		// data.map((reading) => {
		// 	if (reading.userResponses) {
		// 		svg.append("circle")
		// 			.attr("cx", () => { return (reading.day - 1) * gridSize + gridSize / 2; })
		// 			.attr("cy", () => { return reading.hour * gridSize - gridSize / 2; })
		// 			.attr("r", 6)
		// 			.style("fill", "#7f7f7f")
		// 			//.style("opacity", 0.8)
		// 			.on('click', () => {
		// 				console.log("You clicked");
		// 			});
		// 	}
		// });

		// var legend = svg.selectAll(".legend")
		// 	.data([0].concat(colorScale.quantiles()), function (d) { return d; });

		// legend.enter().append("g")
		// 	.attr("class", "legend");

		// legend.append("rect")
		// 	.attr("x", function (d, i) { return legendElementWidth * i; })
		// 	.attr("y", height)
		// 	.attr("width", legendElementWidth)
		// 	.attr("height", gridSize / 2)
		// 	.style("fill", function (d, i) { return colors[i]; });

		// legend.append("text")
		// 	.attr("class", "mono")
		// 	.text(function (d) { return "≥ " + Math.round(d); })
		// 	.attr("x", function (d, i) { return legendElementWidth * i; })
		// 	.attr("y", height + gridSize);

		// legend.exit().remove();
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

	return (
		<div id="chart" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 2000, backgroundColor: '#fff' }}></div>
	);
}

export default ComfortChart;