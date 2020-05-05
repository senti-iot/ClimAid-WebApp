import { makeStyles } from '@material-ui/styles';

const forgotPasswordPageStyles = makeStyles(theme => ({
	smallAction: {
		padding: 0,
		// color: primaryColor,
		"&:hover": {
			background: 'initial',
			// color: hoverColor
		}
	},
	IconEndAd: {
		marginLeft: 12
	},
	p: {
		marginBottom: 10
	},
	wrapper: {
		display: 'flex',
		// height: '100vh',
		overflow: 'auto',
		// position: 'fixed',
		height: '100vh'
	},
	logo: {
		height: 50,
		marginBottom: 20,
	},
	footer: {
		flex: 1,
	},
	footerText: {
		padding: "24px",
		margin: 8
	},
	paperContainer: {
		padding: "24px",
		// padding: 0
	},
	paper: {
		transition: 'all 300ms ease',
		width: '100%',
		borderRadius: 0,
		// height: '100%',
		height: '100%',
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
		// borderRadius: 8,
	},
	needAccount: {
		fontSize: '1rem',
	},
	loginButton: {
		margin: "8px 8px",
	},
	container: {
		width: "100%",
		height: "100%",
	},
	mobileContainer: {
		padding: 24
	},
	loader: {
		width: '100%',
		height: 300
	},
}));

export default forgotPasswordPageStyles;