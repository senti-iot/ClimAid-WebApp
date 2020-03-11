// ##############################
// // // RegularCard styles
// #############################

import {
	card,
	deviceStatus,
} from "./mainStyles";
import teal from '@material-ui/core/colors/teal';
import { bgColorsLight } from './bgColorsLight';
import { makeStyles } from '@material-ui/styles';

const cardStyles = makeStyles(theme => ({
	transition: {
		transition: 'all 300ms ease',
	},
	...deviceStatus,
	contentMedia: {
		width: "100%",
		padding: 0,
		'&:last-child': {
			padding: 0
		}
	},
	noMargin: {
		margin: 0,
	},
	noPadding: {
		paddingLeft: 0,
		paddingRight: 0
	},
	dashboard: {
		height: 'calc(100% - 128px - 32px)'
	},
	root: {
		paddingTop: 0,
		marginTop: 0,
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	actions: {
		alignSelf: 'center',
		padding: "4px"
	},
	expandPosition: {
		marginLeft: 'auto',
	},
	expand: {
		transform: 'rotate(0deg)',
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
	avatar: {
		color: '#fff',
		backgroundColor: teal[600],
	},
	whiteAvatar: {
		backgroundColor: "inherit",
	},
	card: {
		...card,
		height: "100%",
	},
	title: {
		fontSize: "1em",
		fontWeight: 500
	},
	...bgColorsLight(theme),
}))

export default cardStyles;