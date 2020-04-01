import { makeStyles } from '@material-ui/styles';

const comformChartStyles = makeStyles(theme => ({
	rectbordered: {
		stroke: '#E6E6E6',
		strokeWidth: '1px',
	},
	textmono: {
		fontSize: '9pt',
		fill: '#aaa',
	},
	textaxisworkweek: {
		fill: '#000',
	},
	textaxisworktime: {
		fill: '#000'
	},
	daylabel: {
		color: '#E6E6E6',
		backGroundColor: '#E6E6E6'
	}
}));

export default comformChartStyles;