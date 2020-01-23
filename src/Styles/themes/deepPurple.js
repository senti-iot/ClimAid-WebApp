import { createMuiTheme, darken } from '@material-ui/core/styles'
import override from './override'
import * as colors from '@material-ui/core/colors';
import hexToRgba from 'hex-to-rgba';
import { bgColors } from 'Styles/backgroundColors';


const theme = createMuiTheme({
	...override('deepPurple'),
	palette: {
		type: "dark",
		primary: {
			main: colors.deepPurple[500],
			light: colors.deepPurple[400],
		},
		secondary: {
			main: colors.orange[500],
			light: colors.orange[300],
		},
		error: {
			main: colors.red[400]
		}
	},
	appBackground: bgColors['deepPurple'].background,
	boxBackground: darken(hexToRgba(colors['deepPurple'][700], 0.7), 0.5),
	textColor: '#fff',
	primary: colors.deepPurple[500],
	activeButton: colors.orange[500],
});

export default theme
