import * as d3 from "d3";

import {
	centerTranslation,
	getRadius,
	formatCurrentValueText,
	sumArrayTill,
} from "../util"
import {
	configureArc,
	configureTicks,
	configureTickData,
	configureScale,
} from "../config/configure"

export const update = ({ d3_refs, newValue, config }) => {
	const scale = configureScale(config)
	const ratio = scale(newValue)
	const range = config.maxAngle - config.minAngle
	const r = getRadius(config)
	const newAngle = config.minAngle + ratio * range

	// update the pointer
	d3_refs.pointer
		.transition()
		.attr("transform", `rotate(${newAngle}) translate(0, -${r - 23.5})`)

	d3_refs.current_value_text.text(formatCurrentValueText(newValue, config))
}

export const render = ({ container, config, type }) => {
	const r = getRadius(config)
	const centerTx = centerTranslation(
		r,
		config.paddingHorizontal,
		config.paddingVertical
	)

	const svg = _renderSVG({ container, config })

	svg.append('svg:image')
		.attr('xlink:href', '/images/gaugebg.png')
		.attr('x', 0)
		.attr('y', 10)
		.attr('width', 250)
		.attr('height', 230);

	svg.append("rect")
		.attr("fill", "url(#bg)");

	_renderArcs({ config, svg, centerTx, type })
	_renderLabels({ config, svg, centerTx, r })
	_renderInfoLabels({ config, svg })

	return {
		current_value_text: _renderCurrentValueText({ config, svg }),
		pointer: _renderNeedle({ config, svg, r, centerTx }),
	}
}

// helper function to render individual parts of gauge
function _renderSVG({ container, config }) {
	// calculate width and height
	const width = config.width + 2 * config.paddingHorizontal
	const height = config.height + 2 * config.paddingVertical

	return (
		d3.select(container)
			.append("svg:svg")
			.attr("class", "speedometer")
			.attr("width", `${width}${config.dimensionUnit}`)
			.attr("height", `${height}${config.dimensionUnit}`)
			// use inline styles so that width/height is not overridden
			.style("width", `${width}${config.dimensionUnit}`)
			.style("height", `${height}${config.dimensionUnit}`)
	)
}

function _renderArcs({ config, svg, centerTx, type }) {
	const tickData = configureTickData(config);
	// var gradientDefs = svg.append("svg:defs");

	let minAngle, maxAngle;
	if (type === 'temperature') {
		minAngle = 12;
		maxAngle = 61;
	} else if (type === 'co2') {
		minAngle = -130;
		maxAngle = -25;
	} else if (type === 'humidity') {
		minAngle = -40;
		maxAngle = 40;
	}

	const arc = configureArc(config, minAngle, maxAngle);

	let arcs = svg
		.append("g")
		.attr("class", "arc")
		.attr("transform", centerTx)

	arcs
		.selectAll("path")
		.data(tickData)
		.enter()
		.append("path")
		.attr("fill", "#3fbfad")
		.attr("d", arc);

	// .attr("fill", (d, i) => {
	// 	let newGrad = gradientDefs.append("svg:linearGradient")
	// 		.attr("id", function () { return "linear-gradient-" + type; })
	// 		.attr("spreadMethod", "pad");

	// 	// Define the gradient color stops
	// 	if (type === 'temperature') {
	// 		newGrad.append("svg:stop")
	// 			.attr("offset", "0%")
	// 			.attr("stop-color", "#d1463d")
	// 			.attr("stop-opacity", 1);
	// 		newGrad.append("svg:stop")
	// 			.attr("offset", "44%")
	// 			.attr("stop-color", "#e28117")
	// 			.attr("stop-opacity", 1);
	// 		newGrad.append("svg:stop")
	// 			.attr("offset", "50%")
	// 			.attr("stop-color", "#3fbfad")
	// 			.attr("stop-opacity", 1);
	// 		newGrad.append("svg:stop")
	// 			.attr("offset", "67%")
	// 			.attr("stop-color", "#3fbfad")
	// 			.attr("stop-opacity", 1);
	// 		newGrad.append("svg:stop")
	// 			.attr("offset", "78%")
	// 			.attr("stop-color", "#e28117")
	// 			.attr("stop-opacity", 1);
	// 		newGrad.append("svg:stop")
	// 			.attr("offset", "89%")
	// 			.attr("stop-color", "#e56363")
	// 			.attr("stop-opacity", 1);
	// 		newGrad.append("svg:stop")
	// 			.attr("offset", "100%")
	// 			.attr("stop-color", "#d1463d")
	// 			.attr("stop-opacity", 1);
	// 	}

	// 	if (type === 'co2') {
	// 		console.log(1);
	// 		newGrad.append("svg:stop")
	// 			.attr("offset", "0%")
	// 			.attr("stop-color", "#3fbfad")
	// 			.attr("stop-opacity", 1);
	// 		newGrad.append("svg:stop")
	// 			.attr("offset", "56%")
	// 			.attr("stop-color", "#3fbfad")
	// 			.attr("stop-opacity", 1);
	// 		newGrad.append("svg:stop")
	// 			.attr("offset", "78%")
	// 			.attr("stop-color", "#e28117")
	// 			.attr("stop-opacity", 1);
	// 		newGrad.append("svg:stop")
	// 			.attr("offset", "89%")
	// 			.attr("stop-color", "#e56363")
	// 			.attr("stop-opacity", 1);
	// 		newGrad.append("svg:stop")
	// 			.attr("offset", "100%")
	// 			.attr("stop-color", "#d1463d")
	// 			.attr("stop-opacity", 1);
	// 	}

	// 	if (type === 'humidity') {
	// 		newGrad.append("svg:stop")
	// 			.attr("offset", "0%")
	// 			.attr("stop-color", "#e56363")
	// 			.attr("stop-opacity", 1);
	// 		newGrad.append("svg:stop")
	// 			.attr("offset", "56%")
	// 			.attr("stop-color", "#e28117")
	// 			.attr("stop-opacity", 1);
	// 		newGrad.append("svg:stop")
	// 			.attr("offset", "78%")
	// 			.attr("stop-color", "#e28117")
	// 			.attr("stop-opacity", 1);
	// 		newGrad.append("svg:stop")
	// 			.attr("offset", "89%")
	// 			.attr("stop-color", "#e56363")
	// 			.attr("stop-opacity", 1);
	// 		newGrad.append("svg:stop")
	// 			.attr("offset", "100%")
	// 			.attr("stop-color", "#d1463d")
	// 			.attr("stop-opacity", 1);
	// 	}

	// 	return "url(#" + newGrad.attr("id") + ")";
	// })
	// .attr("d", arc)
}

function _renderLabels({ config, svg, centerTx, r }) {
	const ticks = configureTicks(config)
	const tickData = configureTickData(config)
	const scale = configureScale(config)
	const range = config.maxAngle - config.minAngle

	let lg = svg
		.append("g")
		.attr("class", "label")
		.attr("transform", centerTx)

	lg.selectAll("text")
		.data(ticks)
		.enter()
		.append("text")
		.attr("transform", (d, i) => {
			const ratio =
				config.customSegmentStops.length === 0
					? scale(d)
					: sumArrayTill(tickData, i)
			const newAngle = config.minAngle + ratio * range

			return `rotate(${newAngle}) translate(0, ${config.labelInset - r})`
		})
		.text(config.labelFormat)
		// add class for text label
		.attr("class", "segment-value")
		// styling stuffs
		.style("text-anchor", "middle")
		.style("font-size", config.labelFontSize)
		.style("font-weight", "normal")
		// .style("fill", "#666");
		.style("fill", config.textColor)
}

function _renderCurrentValueText({ config, svg }) {
	const translateX = (config.width + 2 * config.paddingHorizontal) / 2
	// move the current value text down depending on padding vertical
	const translateY = (config.width + 4 * config.paddingVertical) / 2

	return (
		svg
			.append("g")
			.attr("transform", `translate(${translateX}, ${translateY})`)
			.append("text")
			// add class for the text
			.attr("class", "current-value")
			.attr("text-anchor", "middle")
			// position the text 23pt below
			.attr("y", 15)
			// add text
			.text(config.currentValue)
			.style("font-size", config.valueTextFontSize)
			.style("font-weight", "normal")
			.style("fill", config.textColor)
	)
}

function _renderInfoLabels({ config, svg }) {
	const translateX = (config.width + 2 * config.paddingHorizontal) / 2
	// move the current value text down depending on padding vertical
	const translateY = (config.width + 4 * config.paddingVertical) / 2

	svg
		.append("g")
		.attr("transform", `translate(${translateX}, ${translateY})`)
		.append("text")
		// add class for the text
		.attr("class", "current-valuetemp-label")
		.attr("text-anchor", "middle")
		.attr("y", -25)
		// add text
		.text(config.topLabel)
		.style("font-size", config.valueTextFontSize - 13)
		.style("font-weight", "normal")
		.style("fill", config.textColor)

	svg
		.append("g")
		.attr("transform", `translate(${translateX}, ${translateY})`)
		.append("text")
		// add class for the text
		.attr("class", "current-valuetemp-label")
		.attr("text-anchor", "middle")
		.attr("y", 43)
		// add text
		.text(config.unitLabel)
		.style("font-size", config.valueTextFontSize - 15)
		.style("font-weight", "normal")
		.style("fill", config.textColor)

}

function _renderNeedle({ config, svg, r, centerTx }) {
	// let lg = svg
	// 	.append("g")
	// 	.attr("class", "activepoint")
	// 	.attr("transform", centerTx)

	var arc = d3.arc();
	arc.innerRadius(0);
	arc.outerRadius(8);
	arc.startAngle(0);
	arc.endAngle(360);

	var arcBorder = d3.arc();
	arcBorder.innerRadius(10);
	arcBorder.outerRadius(11);
	arcBorder.startAngle(0);
	arcBorder.endAngle(360);

	return svg
		.append("g")
		.attr("class", "activepoint")
		.attr("transform", centerTx)
		.append("path")
		.attr("d", arc)
		.attr('fill', '#c7c7c7')
		.style('stroke', '#999')
		.style('stroke-width', '1')

	// return lg.append("circle")
	// 	.attr('fill', '#000000')
	// 	.attr('r', 8)
}
