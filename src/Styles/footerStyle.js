import { makeStyles } from '@material-ui/styles';

const footerStyles = makeStyles(theme => ({
	container: {
		width: '100%',
		backgroundColor: '#266367',
		color: '#ffffff',
		paddingTop: '50px',
		paddingBottom: '50px',
	},
	wrapper: {
		width: '60%',
		margin: '0 auto'
	}
}))

export default footerStyles;