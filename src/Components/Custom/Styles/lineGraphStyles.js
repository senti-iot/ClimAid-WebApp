import { makeStyles } from '@material-ui/styles';

const lineStyles = makeStyles(theme => ({
	// waterusageL: {
	// 	fill: 'none',
	// 	stroke: () => theme.chart.waterUsageLine,
	// 	strokeWidth: '4px'
	// },
	// waterusageLDot: {
	// 	fill: () => theme.chart.waterUsageLine,
	// },
	// benchmark: {
	// 	fill: 'none',
	// 	stroke: () => theme.chart.benchmarkLine,
	// 	strokeWidth: '4px',
	// },
	// benchmarkDot: {
	// 	fill: () => theme.chart.benchmarkLine,
	// },
	// tempAmbient: {
	// 	fill: 'none',
	// 	stroke: () => theme.chart.ambientTempLine,
	// 	strokeWidth: '4px'
	// },
	// tempAmbientDot: {
	// 	fill: () => theme.chart.ambientTempLine
	// },
	// tempWater: {
	// 	fill: 'none',
	// 	stroke: () => theme.chart.waterTempLine,
	// 	strokeWidth: '4px'
	// },
	// tempWaterDot: {
	// 	fill: () => theme.chart.waterTempLine,
	// },
	// maxFlow: {
	// 	fill: 'none',
	// 	stroke: () => theme.chart.maxFlowLine,
	// 	strokeWidth: '4px'
	// },
	// maxFlowDot: {
	// 	fill: () => theme.chart.maxFlowLine,
	// },
	// minFlow: {
	// 	fill: 'none',
	// 	stroke: () => theme.chart.minFlowLine,
	// 	strokeWidth: '4px'
	// },
	// minFlowDot: {
	// 	fill: () => theme.chart.minFlowLine,
	// },
	axis: {
		stroke: 'none'
	},
	axisText: {
		fill: 'currentColor',
		fontWeight: 600,
		fontSize: '1rem'
	},
	axisTick: {
		fill: 'currentColor',
		fontWeight: 600,
		fontSize: '0.75rem'
	},
	hiddenMedianLine: {
		stroke: '#fff',
		opacity: 0,
		strokeWidth: '6px'
	},
	// medianLine: {
	// 	fill: 'none',
	// 	stroke: theme.chart.medianLine,
	// 	strokeWidth: '4px'
	// },
	// medianLinePrev: {
	// 	fill: 'none',
	// 	stroke: 'rgba(128, 128, 128, 0.6)',
	// 	strokeWidth: '4px'
	// },
	// prevArea: {
	// 	fill: 'rgba(255,255,255, 0.1)',
	// },
	// waterusageLArea: {
	// 	fill: () => hexToRgba(theme.chart.waterUsageLine, 0.1)
	// },
	// tempAmbientArea: {
	// 	fill: () => hexToRgba(theme.chart.ambientTempLine, 0.1)
	// },
	// tempWaterArea: {
	// 	fill: () => hexToRgba(theme.chart.waterTempLine, 0.1)
	// },
	// maxFlowArea: {
	// 	fill: () => hexToRgba(theme.chart.maxFlowLine, 0.1)
	// },
	// minFlowArea: {
	// 	fill: () => hexToRgba(theme.chart.minFlowLine, 0.1)
	// },
}))

export default lineStyles