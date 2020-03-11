import { makeStyles } from '@material-ui/styles';

const lineStyles = makeStyles(theme => ({
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