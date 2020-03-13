import { makeStyles } from '@material-ui/styles';

const lineStyles = makeStyles(theme => ({
	axis: {
		stroke: 'none'
	},
	axisText: {
		fill: '#ffffff',
		fontWeight: 400,
		fontSize: '16px'
	},
	axisTick: {
		fill: '#ffffff',
		fontWeight: 400,
		fontSize: '16px'
	},
	hiddenMedianLine: {
		stroke: '#fff',
		opacity: 0,
		strokeWidth: '6px'
	},
	periodLabels: {
		color: '#ffffff',
		fontSize: 18,
		textAlign: 'center',
		userSelect: 'none',
	},
	periodLabelsContainer: {
		cursor: 'pointer',
	},
}))

export default lineStyles