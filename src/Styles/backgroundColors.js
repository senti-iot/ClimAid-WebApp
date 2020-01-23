import { colors } from '@material-ui/core';
import { darken } from '@material-ui/core/styles';

export const bgColors = {
	'': {
		background: '#eee'
	},
	lightBlue: {
		background: `linear-gradient(to bottom, ${colors.lightBlue[300]}, ${colors.lightBlue[500]})`
	},
	cyan: {
		background: `linear-gradient(to bottom, ${colors.cyan[300]}, ${colors.cyan[500]})`
	},
	teal: {
		background: `linear-gradient(to bottom, ${colors.teal[300]}, ${colors.teal[500]})`
	},
	green: {
		background: `linear-gradient(to bottom, ${colors.green[300]}, ${colors.green[500]})`
	},

	lightGreen: {
		background: `linear-gradient(to bottom, ${colors.lightGreen[300]}, ${colors.lightGreen[500]})`
	},

	lime: {
		background: `linear-gradient(to bottom, ${colors.lime[300]}, ${colors.lime[500]})`
	},

	yellow: {
		background: `linear-gradient(to bottom, ${colors.yellow[300]}, ${colors.yellow[500]})`
	},

	amber: {
		background: `linear-gradient(to bottom, ${colors.amber[300]}, ${colors.amber[500]})`
	},

	orange: {
		background: `linear-gradient(to bottom, ${colors.orange[300]}, ${colors.orange[500]})`
	},

	deepOrange: {
		background: `linear-gradient(to bottom, ${colors.deepOrange[300]}, ${colors.deepOrange[500]})`
	},

	red: {
		background: `linear-gradient(to bottom, ${colors.red[400]}, ${darken(colors.red[400], 0.25)})`
	},

	pink: {
		background: `linear-gradient(to bottom, ${colors.pink[300]}, ${colors.pink[500]})`
	},

	purple: {
		background: `linear-gradient(to bottom, ${colors.purple[300]}, ${colors.purple[500]})`
	},

	deepPurple: {
		background: `linear-gradient(to bottom, ${colors.deepPurple[200]}, ${colors.deepPurple[500]})`,
	},

	indigo: {
		background: `linear-gradient(to bottom, ${colors.indigo[300]}, ${colors.indigo[500]})`
	},

	blue: {
		background: `linear-gradient(to bottom, ${colors.blue[300]}, ${darken(colors.blue[500], 0.4)})`
	}
}