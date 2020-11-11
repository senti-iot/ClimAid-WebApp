import { makeStyles } from '@material-ui/styles';

const lineStyles = makeStyles(theme => ({
	axis: {
		stroke: 'none'
	},
	axisText: {
		fill: '#000',
		fontWeight: 400,
		fontSize: '16px'
	},
	axisTick: {
		fill: '#000',
		fontWeight: 400,
		fontSize: '16px'
	},
	hiddenMedianLine: {
		stroke: '#fff',
		opacity: 0,
		strokeWidth: '6px'
	},
	periodLabels: {
		color: '#000',
		fontSize: 18,
		textAlign: 'center',
		userSelect: 'none',
	},
	periodLabelsContainer: {
		cursor: 'pointer',
	},
}))

export default lineStyles