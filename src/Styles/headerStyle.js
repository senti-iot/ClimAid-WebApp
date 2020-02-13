// ##############################
// // // Header styles
// #############################

import {
	headerColor,
} from "./mainStyles";
import { makeStyles } from '@material-ui/styles';

const headerStyles = makeStyles(theme => ({
	drawerButton: {
		color: '#fff',
		'&:hover': {
			background: '#FFFFFF22'
		}
	},
	logoContainer: {
		width: '100%',
		height: 48,
		display: "flex",
	},
	logotext: {
		width: 'calc(100% - 200px)',
		color: '#000',
		fontWeight: 'bold',
		fontSize: '20px',
		letterSpacing: '3px',
		textAlign: 'left',
		paddingLeft: '20px',
		paddingTop: '12px'
	},
	appBar: {
		backgroundColor: headerColor,
		//boxShadow: "none",
		borderBottom: "0",
		marginBottom: "0",
		position: 'fixed',
		// padding: "0 !important",
		// [theme.breakpoints.down('xs')]: {
		// 	height: 48
		// },
		height: "120px",
		zIndex: "1029",
		color: "#ffffff",
		border: "0",
		// transition: "all 150ms ease 0s",
		minHeight: "48px",
		display: "block",
	},
	image: {
		position: "relative",
		height: 48,
		"&:hover, &$focusVisible": {
			zIndex: 1
		}
	},
	focusVisible: {},
	imageSrc: {
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		backgroundSize: "195px 34px",
		backgroundRepeat: "no-repeat",
		backgroundPosition: "50% 50%",
	},
	container: {
		height: 120,
	},
	flex: {
		flex: 1,
		display: 'flex',
		flexFlow: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginLeft: 16
	},
	goBackButton: {
		color: "inherit",
		background: "transparent",
		boxShadow: "none",
		"&:hover,&:focus": {
			background: "transparent"
		},
		width: 50,
		height: 50
	},
	title: {
		maxWidth: "calc(100vw - 130px)",
		fontWeight: 500,
		// [theme.breakpoints.down('sm')]: {
		// 	fontSize: "1rem",
		// },
		lineHeight: "1.16667em",
		fontSize: "1.3125rem",
		borderRadius: "3px",
		textTransform: "none",
		color: "inherit",
		"&:hover,&:focus": {
			background: "transparent"
		}
	},
	// primary: {
	// 	backgroundColor: primaryColor,
	// 	color: "#FFFFFF",
	// 	...defaultBoxShadow
	// },
	// info: {
	// 	backgroundColor: infoColor,
	// 	color: "#FFFFFF",
	// 	...defaultBoxShadow
	// },
	// success: {
	// 	backgroundColor: successColor,
	// 	color: "#FFFFFF",
	// 	...defaultBoxShadow
	// },
	// warning: {
	// 	backgroundColor: warningColor,
	// 	color: "#FFFFFF",
	// 	...defaultBoxShadow
	// },
	// danger: {
	// 	backgroundColor: dangerColor,
	// 	color: "#FFFFFF",
	// 	...defaultBoxShadow
	// }
}))

export default headerStyles;
