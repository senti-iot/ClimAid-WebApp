import { makeStyles } from '@material-ui/styles';

const adminStyles = makeStyles(theme => ({
	adminPaperContainer: {
		backgroundColor: '#ffffff',
		padding: 30,
		width: '100%'
	},
	adminHeader: {
		fontSize: 34,
		fontWeight: 300,
		color: '#201f20',
		marginBottom: 20
	},
	uploadinput: {
		display: 'none'
	},
	adminMenuItem: {
		cursor: 'pointer'
	},
	tableRow: {
		height: 40
	},
	textField: {
		minWidth: 500
	},
	selectField: {
		minWidth: 500
	}
}));

export default adminStyles;