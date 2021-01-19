import { makeStyles } from '@material-ui/styles';

const comformChartStyles = makeStyles(theme => ({
	rectbordered: {
		stroke: '#E6E6E6',
		strokeWidth: '1px',
	},
	rectbordered2: {
		stroke: '#fff',
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
	},
	topDropdown: {
		height: 75,
		borderRadius: 4,
		backgroundColor: '#dddddd',
	},
	topDropdownButton: {
		fontSize: 20,
		"&:hover": {
			backgroundColor: 'transparent'
		},
		"&:active": {
			backgroundColor: 'transparent'
		},
	},
}));

export default comformChartStyles;