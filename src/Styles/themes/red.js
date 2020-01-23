import { createMuiTheme, darken } from '@material-ui/core/styles'
import override from './override'
import * as colors from '@material-ui/core/colors';
import hexToRgba from 'hex-to-rgba';
import { bgColors } from 'Styles/backgroundColors'; import {  /* headerColor */ } from 'Styles/mainStyles'


const theme = createMuiTheme({
	...override('red'),
	palette: {
		type: "dark",
		primary: {
			main: colors.red[500],
			light: colors.red[400],
		},
		secondary: {
			main: colors.orange[500],
			light: colors.orange[300],
		},
		error: {
			main: colors.red[400]
		}
	},
	appBackground: bgColors['red'].background,
	boxBackground: darken(hexToRgba(colors['red'][700], 0.7), 0.5),
	textColor: '#fff',
	primary: colors.red[500],
	activeButton: colors.orange[500],
});

export default theme