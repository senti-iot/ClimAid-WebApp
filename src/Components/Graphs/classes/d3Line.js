/* eslint-disable array-callback-return */
import * as d3 from 'd3';
import moment from 'moment';
import hexToRgba from 'hex-to-rgba';

const getMedianLineData = (data) => {
	let medianValues = []
	if (data.length > 0) {
		let sum = data.map(d => d.value).reduce((total, val) => parseFloat(total) + parseFloat(val))
		let avrg = parseFloat((sum / data.length).toFixed(3))
		medianValues = [{ date: data[0].date, value: avrg }, { date: data[data.length - 1].date, value: avrg }]
	}

	return medianValues
}


const getMax = (arr) => {
	if (arr.length > 0) {
		let max = Math.max(...arr.map(d => d.value))
		if (max < 1) {
			return max + 0.1
		}
		if (max < 5) {
			return max + 1
		}
		return max + 10
		// return max > 1 ? max + 10 : max + 0.1
	}
}
const getMin = (arr) => {
	if (arr.length > 0) {
		let min = Math.min(...arr.map(d => d.value))
		if (min > 1) {
			min = min - 0.1
		}
		if (min > 5) {
			min = min - 1
		}
		min = min - 10

		// return min > 1 ? min - 10 : min - 0.1
		return min > 0 ? min : 0
	}
}
class d3Line {

	containerEl;
	props;
	svg;
	classes;
	state = [];
	t;
	constructor(containerEl, props, classes) {
		this.t = props.t;
		this.classes = classes;
		this.containerEl = containerEl;
		this.props = props;
		this.period = props.period;
		this.margin = { top: 50, right: 50, bottom: 50, left: 50 };
		//Get the height and width from the container
		this.height = containerEl.clientHeight;
		this.width = containerEl.clientWidth;

		this.svg = d3.select('#graph')


		this.generateXAxis()
		this.generateYAxis()

		//Define the area for the values
		// this.valueArea = d3.area()
		// 	.x((d) => { return this.x(moment(d.date).valueOf()) })
		// 	.y0(this.y(0))
		// 	.y1((d) => { return this.y(d.value) })
		// this.valueArea2 = d3.area()
		// 	.x((d) => { return this.x(moment(d.date).valueOf()) })
		// 	.y0(this.y(0))
		// 	.y1((d) => { return this.y2(d.value) })

		this.valueLine = d3.line()
			.x((d) => this.x(moment(d.date).valueOf()))
			.y(d => this.y(d.value))
		this.valueLine2 = d3.line()
			.x((d) => this.x(moment(d.date).valueOf()))
			.y(d => this.y2(d.value))
		this.div = d3.select('#temperaturetooltip')
			.style("opacity", 0);
		this.medianTooltip = d3.select('#temperaturemedianTooltip')
			.style("opacity", 0);

		//#region Ticks


		Object.keys(props.data).map(key => {
			if (props.data[key].length) {
				props.data[key].forEach(line => {
					if (!line.noMedianLegend && line.median) {
						this.setState(line.name + 'Median', true)
						this.setState(line.name, line.hidden ? true : false)
					}
					else {
						this.setState(line.name, line.hidden ? true : false)
					}
				})
			}
		})

		this.generateLines()
		this.generateMedian()
		this.generateLegend()
		this.generateDots()
	}
	setState = (key, value, noUpdate) => {
		this.state[key] = value
		if (!noUpdate) {

			this.update()
		}

	}
	update = () => {
		// this.xAxis.call(this.xAxis_days)
		//#region Update Y-Axis
		let count = 2;
		Object.keys(this.props.data).map(key => {
			if (this.props.data[key].length && count <= 2) {
				let data = this.props.data[key]
				let newData = data.filter(f => !this.state[f.name])
				let allData = [].concat(...newData.map(d => d.data))
				this.y.domain([getMin(allData), getMax(allData)])

				count++;
			}
		})
		this.yAxis.remove()
		this.svg.selectAll("*").remove()
		this.generateXAxis()
		this.generateYAxis()
		this.generateLines()
		this.generateMedian()
		this.generateLegend()
		this.generateDots()
		// this.yAxis.call(d3.axisLeft(this.y))
	}
	generateYAxis = (noDomain) => {

		const classes = this.classes
		const height = this.height
		let yAxis = null;
		let yAxisType = null;
		let yAxis2 = null;
		let yAxis2Type = null;
		let count = 1;
		Object.keys(this.props.data).map(key => {
			if (this.props.data[key].length && count <= 2) {
				let data = this.props.data[key]
				if (count === 1) {
					if (this.y === undefined) {
						
						let allData = [].concat(...data.map(d => d.data))
						this.y = d3.scaleLinear().range([height - this.margin.top, this.margin.bottom]);
						this.y.domain([getMin(allData), getMax(allData)]);
					}

					if (data.length && !yAxisType) {
						yAxisType = data[0].unit;
					}

					yAxis = this.yAxis = this.svg.append("g")
						.attr('transform', `translate(${this.margin.top + 40}, 0)`)
						.call(d3.axisLeft(this.y));
				} else if (count === 2) {
					if (this.y2 === undefined) {
						let allData = [].concat(...data.map(d => d.data))
						this.y2 = d3.scaleLinear().range([height - this.margin.top, this.margin.bottom]);
						this.y2.domain([getMin(allData), getMax(allData)]);
					}

					if (data.length && !yAxis2Type) {
						yAxis2Type = data[0].unit;
					}

					yAxis2 = this.yAxis2 = this.svg.append("g")
						.attr('transform', `translate(${this.width - 85}, 0)`)
						.call(d3.axisRight(this.y2));
				}

				count++;
			}
		})

		if (yAxis) {
			yAxis.selectAll('path').attr('class', classes.axis)
			yAxis.selectAll('line').attr('class', classes.axis)
			yAxis.selectAll('text').attr('class', classes.axisTick)

			if (yAxisType) {
				yAxis.append('text')
					.attr('transform', `translate(-40, ${height / 2})`)
					.attr('class', classes.axisText)
					.html(yAxisType)
			}
		}
		if (yAxis2) {
			yAxis2.selectAll('path').attr('class', classes.axis)
			yAxis2.selectAll('line').attr('class', classes.axis)
			yAxis2.selectAll('text').attr('class', classes.axisTick)

			if (yAxis2Type) {
				yAxis2.append('text')
					.attr('transform', `translate(40, ${height / 2})`)
					.attr('class', classes.axisText)
					.html(yAxis2Type)
			}
		}
	}
	generateXAxis = () => {
		const width = this.width

		this.x = d3.scaleTime().range([this.margin.left + 45, width - this.margin.right - 45]);
		let period = this.props.period

		let firstKey = null;
		let gotKey = false;
		Object.keys(this.props.data).map(key => {
			if (this.props.data[key].length && !gotKey) {
				firstKey = key
				gotKey = true;
			}
		});

		if (firstKey) {
			let data = this.props.data[firstKey]
			let newData = data.filter(f => !this.state[f.name])
			let allData = [].concat(...newData.map(d => d.data))
			let from = moment.min(allData.map(d => moment(d.date)))
			let to = moment.max(allData.map(d => moment(d.date)))

			this.x.domain([from, to])

			const classes = this.classes
			const height = this.height
			let timeType = period.timeType
			let counter = moment(from)
			let ticks = []
			let monthTicks = []
			// ticks.push(counter.valueOf())
			let add = 1
			let lb = 0
			if (moment(counter).diff(to, 'day') > 14) {

				add = 3
			}
			if (timeType === 4) {
				monthTicks.push(counter.valueOf())
				while (moment(counter).diff(to, 'day') < 0) {
					ticks.push(counter.valueOf())
					if (lb === 0) {
						counter.add(14, 'day')
						lb = 1
					}
					else {
						let diff = -1 * moment(counter).diff(moment(counter).endOf('month'), 'days')
						counter.add(diff + 1, 'day')
						lb = 0
					}
					// counter.add(Math.round(moment(counter).daysInMonth() / 2) - 1, 'day')

					if (
						monthTicks.findIndex(f => {
							return moment(f).format('MMMM').toLowerCase() === counter.format('MMMM').toLowerCase()
						}) === -1
					) {

						monthTicks.push(counter.valueOf())
					}
				}
				ticks.push(to.valueOf())
				monthTicks.push(to.valueOf())
			} else if (timeType === 1) {
				monthTicks.push(counter.valueOf())
				while (moment(counter).diff(to, 'hour') < 0) {
					ticks.push(counter.valueOf())
					counter.add(add, 'hour')
				}
				ticks.push(to.valueOf())
				monthTicks.push(to.valueOf())			
			} else {
				monthTicks.push(counter.valueOf())
				while (moment(counter).diff(to, 'day') < 0) {
					ticks.push(counter.valueOf())
					counter.add(add, 'day')
					if (
						monthTicks.findIndex(f => {
							return moment(f).format('MMMM').toLowerCase() === counter.format('MMMM').toLowerCase()
						}) === -1
					) {

						monthTicks.push(counter.valueOf())
					}
				}
				ticks.push(to.valueOf())
				monthTicks.push(to.valueOf())
			}

			let woyFormat = 'D';
			if (timeType === 1) {
				woyFormat = 'HH';
			}
			var xAxis_woy = this.xAxis_days = d3.axisBottom(this.x)
				.tickFormat(f => moment(f).format(woyFormat))
				.tickValues(ticks);

			// //Add the X axis
			this.xAxis = this.svg.append("g")
				.attr("transform", `translate(0,  ${(height - this.margin.bottom + 5)})`)
				.call(xAxis_woy);

			// //Append style
			this.xAxis.selectAll('path').attr('class', classes.axis)
			this.xAxis.selectAll('line').attr('class', classes.axis)
			this.xAxis.selectAll('text').attr('class', classes.axisTick)

			var xAxis_months = this.xAxis_months = d3.axisBottom(this.x)
				.tickFormat(d => moment(d).format('MMM'))
				.tickValues(monthTicks)

			this.xAxisMonths = this.svg.append("g")
				.attr("transform", "translate(-8," + (height - this.margin.bottom + 26) + ")")
				.call(xAxis_months);
			this.xAxisMonths.selectAll('path').attr('class', classes.axis)
			this.xAxisMonths.selectAll('line').attr('class', classes.axis)
			this.xAxisMonths.selectAll('text').attr('class', classes.axisText)
			// this.xAxis.append('text')
			// 	.attr('transform', `translate(0,50)`)
			// 	.attr('class', classes.axisText)
			// 	.html(toUppercase(moment(ticks[0].date).format('MMMM')))
		}
	}

	generateDots = () => {
		let count = 1;
		Object.keys(this.props.data).map(key => {
			if (this.props.data[key].length && count <= 2) {
				let data = this.props.data[key]
				const setTooltip = this.props.setTooltip
				data.forEach((line) => {
					if (line.prev) {
						return
					}

					if (!line.noDots) {
						let tooltipDiv = d3.select(`#${key}tooltip`)
						this.svg.selectAll(".dot")
							.data(line.data)
							.enter()
							.append("circle") // Uses the enter().append() method
							.on("mouseover", function (d) {
								d3.select(this).attr("r", 8);
								tooltipDiv.transition()
									.duration(200)
									.style("opacity", 1)
									.style('z-index', 1040);
								tooltipDiv.style("left", (d3.event.pageX) + "px")
									.style("top", (d3.event.pageY) - 100 + "px");
								setTooltip(d)

							}).on("mouseout", function () {
								d3.select(this).attr("r", 6)
								tooltipDiv.transition()
									.duration(500)
									.style('z-index', -1)
									.style("opacity", 0);
							//}).on('click', function (d) {
							})
							.attr("cx", (d) => { return this.x(moment(d.date).valueOf()) })
							.attr("cy", (d) => {
								if (count === 1) {
									return this.y(d.value)
								} else {
									return this.y2(d.value)
								}
							})
							.attr("r", 0)
							.attr("fill", line.color ? line.color : "#fff")
							.attr('opacity', 0)
							.transition()
							.attr("id", `${line.name}Dots`)
							.style("opacity", this.state[line.name] ? 0 : 1)
							.delay((d, i) => { return i * (1500 / line.data.length) })
							.attr("r", 6)
					}
				})

				count++;
			}
		})
	}
	generateLegend = () => {
		let data = this.props.data['temperature']
		data.forEach((line) => {

			if (line.median & !line.noMedianLegend) {
				let LegendMCheck = d3.select(`#${line.name}LegendMedianCheckbox`)
				let LegendM = d3.select(`#${line.name}LegendMedian`)
				let LegendMLabel = d3.select(`#${line.name}LegendMedianLabel`)
				LegendMCheck.on('click', () => {

					var active = this.state[line.name + 'Median'] ? false : true,
						newOpacity = active ? 0 : 1, display = active ? 'none' : undefined,
						newColor = active ? 'steelblue' : line.color ? line.color : "#fff";

					// Hide or show the elements

					d3.selectAll(`#${line.name}MedianL`)
						.transition().duration(200)
						.style("opacity", newOpacity)
					d3.selectAll(`#${line.name}MedianLegend`)
						.transition().duration(200)
						.style("fill", newColor)
					d3.select(`#${line.name}MedianH`)
						.transition().duration(200)
						.style("display", display)

					LegendMCheck
						.attr('value', active)
					LegendM
						.style("color", active ? 'rgba(255, 255, 255, 0.3)' : hexToRgba(line.color, 0.3))
					LegendMLabel.style("color", active ? 'rgba(255,255,255,0.3)' : '#fff')
					this.setState(line.name + 'Median', active)
					// this.state[line.name + 'Median'] = active;
				})
			}

			let Legend = d3.select(`#${line.name}Legend`)
			let LegendCheck = d3.select(`#${line.name}LegendCheckbox`)
			let LegendLabel = d3.select(`#${line.name}LegendLabel`)
			LegendCheck.on('click', () => {
				let active = this.state[line.name] ? false : true,
					newOpacity = active ? 0 : 1, display = active ? 'none' : undefined;

				// Hide or show the elements

				d3.select(`#${line.name}`)
					.transition().duration(200)
					.style("opacity", newOpacity)
				d3.selectAll(`#${line.name}Dots`)
					.transition().duration(200)
					.style("opacity", newOpacity)
				d3.select(`#${line.name}Area`)
					.transition().duration(200)
					.style("opacity", newOpacity)
				d3.select(`#${line.name}MArea`)
					.transition().duration(200)
					.style("opacity", newOpacity)
				d3.select(`#${line.name}HArea`)
					.transition().duration(200)
					.style("display", display)
				LegendCheck
					.attr('value', active)
				Legend
					.style("color", active ? 'rgba(255,255,255,0.3)' : line.prev ? '#fff' : hexToRgba(line.color, 0.3))
				LegendLabel.style("color", active ? 'rgba(255,255,255,0.3)' : '#fff')

				//Modified here
				// this.state[line.name] = active
				this.setState(line.name, active)
			})


		})

	}

	generateLines = () => {
		let count = 1;
		Object.keys(this.props.data).map(key => {
			let data = this.props.data[key]

			if (data.length && count <= 2) {
				// window.moment = moment
				// window.data = data
				let animArea0 = d3.area()
					.y0(this.height - this.margin.bottom)
					.y1(this.height - this.margin.bottom)
					.x((d) => { return this.x(moment(d.date).valueOf()) })
				data.forEach((line, i) => {

					//#region Generate Line Area
					if (!line.noArea) {
						let defArea = d3.area()
							.x((d) => { return this.x(moment(d.date).valueOf()) })
							.y0(this.height - this.margin.bottom)
							.y1((d) => {
								if (count === 1) {
									return this.y(d.value)
								} else {
									return this.y2(d.value)
								}
							})
						this.svg.append("path")
							.attr('id', line.name + 'Area')
							.data([line.data])
							.attr("opacity", this.state[line.name] ? 0 : 1)
							.attr('fill', line.prev ? 'rgba(255,255,255, 0.1' : hexToRgba(line.color, 0.1))
							.attr("d", animArea0)
							.transition()
							.duration(1500)
							.attr("d", defArea);
						if (line.noMedianLegend) {
							let setMedianTooltip = this.props.setMedianTooltip
							var medianTooltip = this.medianTooltip
							let medianData = getMedianLineData(line.data)

							let medianLine = this.svg.append('path')
								.data([medianData])
								.attr('fill', 'none')
								.attr('stroke', 'rgba(255,255,255, 0.1)')
								.attr('stroke-width', '4px')
								.attr('d', count === 1 ? this.valueLine : this.valueLine2)
								.attr('id', line.name + 'Median')
								.attr('opacity', this.state[`${line.name}`] ? 0 : 1)
								.attr('stroke-dasharray', ("3, 3"))

							// Hidden overlay for Median tooltip
							this.svg.append('path')
								.data([medianData])
								.attr('stroke', '#fff')
								.attr('opacity', 0)
								.attr('stroke-width', '7px')
								.attr('d', count === 1 ? this.valueLine : this.valueLine2)
								.attr('id', line.name + 'HArea')
								.on("mouseover", (d) => {
									if (!this.state[`${line.name}`]) {

										medianLine.transition()
											.duration(100)
											.style('stroke-width', '7px')

										medianTooltip.transition()
											.duration(200)
											.style("opacity", 1)
											.style('z-index', 1040);

										medianTooltip.style("left", (d3.event.pageX) - 82 + "px")
											.style("top", (d3.event.pageY) - 41 + "px");

										setMedianTooltip(d[0])
									}

								}).on("mouseout", function () {
									// setExpand(false)
									medianLine.transition()
										.duration(100)
										.style('stroke-width', '4px')
									medianTooltip.transition()
										.duration(500)
										.style('z-index', -1)
										.style("opacity", 0);
								}).on('click', function () {
									// setExpand(true)
								});
						}
					}
					//#endregion
					//#region Generate Line
					if (!line.prev) {
						if (line.dashed) {
							//Set up your path as normal
							var path = this.svg.append("path")
								.data([line.data])
								.attr('id', line.name)
								.attr('fill', 'none')
								.attr('stroke', line.color)
								.attr('stroke-width', '3px')
								.attr('d', count === 1 ? this.valueLine : this.valueLine2)
								.attr("opacity", this.state[line.name] ? 0 : 1)


							//Get the total length of the path
							var totalLength = path.node().getTotalLength();

							/////// Create the required stroke-dasharray to animate a dashed pattern ///////

							//Create a (random) dash pattern
							//The first number specifies the length of the visible part, the dash
							//The second number specifies the length of the invisible part
							var dashing = "3, 3"

							//This returns the length of adding all of the numbers in dashing
							//(the length of one pattern in essence)
							//So for "6,6", for example, that would return 6+6 = 12
							var dashLength =
								dashing
									.split(/[\s,]/)
									.map(function (a) { return parseFloat(a) || 0 })
									.reduce(function (a, b) { return a + b });

							//How many of these dash patterns will fit inside the entire path?
							var dashCount = Math.ceil(totalLength / dashLength);

							//Create an array that holds the pattern as often
							//so it will fill the entire path
							var newDashes = new Array(dashCount).join(dashing + " ");
							//Then add one more dash pattern, namely with a visible part
							//of length 0 (so nothing) and a white part
							//that is the same length as the entire path
							var dashArray = newDashes + " 0, " + totalLength;

							/////// END ///////

							//Now offset the entire dash pattern, so only the last white section is
							//visible and then decrease this offset in a transition to show the dashes
							path
								.attr("stroke-dashoffset", totalLength)
								//This is where it differs with the solid line example
								.attr("stroke-dasharray", dashArray)
								.transition().duration(1500)
								.attr("stroke-dashoffset", 0);
						} else {
							this.svg.append('path')
								.data([line.data])
								.attr('id', line.name)
								// .attr('class', classes[line.name])
								.attr('fill', 'none')
								.attr('stroke', line.color)
								.attr('stroke-width', '4px')
								.attr('d', count === 1 ? this.valueLine : this.valueLine2)
								.attr("stroke-dasharray", function () {
									return this.getTotalLength()
								})
								.attr("stroke-dashoffset", function () {
									return this.getTotalLength()
								})
								.attr("opacity", this.state[line.name] ? 0 : 1)
								.transition()
								.duration(1500)
								.attr('stroke-dashoffset', 0)
								.transition()
								.duration(100)
								.style("stroke-dasharray", undefined)
						}

						//#endregion
					}
				})

				count++;
			}
		})

	}

	generateMedian = () => {
		const { setMedianTooltip } = this.props
		const classes = this.classes
		//Median tooltip
		let data = this.props.data['temperature']
		var medianTooltip = this.medianTooltip
		data.forEach((line) => {

			//Median line
			if (line.median & !line.noMedianLegend) {
				let medianData = getMedianLineData(line.data)
				let medianLine = this.svg.append('path')
					.data([medianData])
					// .attr('class', classes.medianLine)
					.attr('d', this.valueLine)
					.attr('id', `${line.name}MedianL`)
					.attr('opacity', this.state[`${line.name}Median`] ? 0 : 1)
					.attr('stroke-width', '4px')
					.attr('stroke', line.color)
					.attr('stroke-dasharray', ("3, 3"))

				// Hidden overlay for Median tooltip
				this.svg.append('path')
					.data([medianData])
					.attr('class', classes.hiddenMedianLine)
					.attr('d', this.valueLine)
					.attr('id', `${line.name}MedianH`)
					.style('display', this.state[line.name] ? 'none' : undefined)
					.on("mouseover", (d) => {
						if (!this.state[`${line.name}Median`]) {

							medianLine.transition()
								.duration(100)
								.style('stroke-width', '7px')

							medianTooltip.transition()
								.duration(200)
								.style("opacity", 1)
								.style('z-index', 1040);

							medianTooltip.style("left", (d3.event.pageX) - 82 + "px")
								.style("top", (d3.event.pageY) - 41 + "px");

							setMedianTooltip(d[0])
						}

					}).on("mouseout", function () {
						// setExpand(false)
						medianLine.transition()
							.duration(100)
							.style('stroke-width', '4px')
						medianTooltip.transition()
							.duration(500)
							.style('z-index', -1)
							.style("opacity", 0);
					}).on('click', function () {
						// setExpand(true)
					});
			}
		})

	}
	destroy = () => {
		// this.svg.remove()
		this.svg.selectAll("*").remove()
	}

}
window.d3 = d3
export default d3Line;