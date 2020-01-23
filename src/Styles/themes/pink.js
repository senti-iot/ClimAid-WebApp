import { createMuiTheme, darken } from '@material-ui/core/styles'
import override from './override'
import * as colors from '@material-ui/core/colors';
import hexToRgba from 'hex-to-rgba';
import { bgColors } from 'Styles/backgroundColors';


const theme = createMuiTheme({
	...override('pink'),
	palette: {
		type: "dark",
		primary: {
			main: colors.pink[500],
			light: colors.pink[400],
		},
		secondary: {
			main: colors.orange[500],
			light: colors.orange[300],
		},
		error: {
			main: colors.red[400]
		}
	},
	appBackground: bgColors['pink'].background,
	boxBackground: darken(hexToRgba(colors['pink'][700], 0.7), 0.5),
	textColor: '#fff',
	primary: colors.pink[500],
	activeButton: colors.orange[500],
});

export default theme
