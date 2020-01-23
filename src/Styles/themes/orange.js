import { createMuiTheme, darken } from '@material-ui/core/styles'
import override from './override'
import * as colors from '@material-ui/core/colors';
import hexToRgba from 'hex-to-rgba';
import { bgColors } from 'Styles/backgroundColors';


const theme = createMuiTheme({
	...override('orange'),
	palette: {
		type: "dark",
		primary: {
			main: colors.orange[500],
			light: colors.orange[400],
		},
		secondary: {
			main: colors.orange[500],
			light: colors.orange[300],
		},
		error: {
			main: colors.red[400]
		}
	},
	appBackground: bgColors['orange'].background,
	boxBackground: darken(hexToRgba(colors['orange'][700], 0.7), 0.5),
	textColor: '#fff',
	primary: colors.orange[500],
	activeButton: colors.orange[500],
});

export default theme
