import { makeStyles } from '@material-ui/styles';

const roomStyles = makeStyles(theme => ({
	roomInfoContainer: {
		height: 940,
		padding: 30,
	},
	roomName: {
		fontSize: 30,
		fontWeight: 300,
		color: '#201f20',
		paddingBottom: 25,
		borderBottom: 'solid 1px #bbbebe',
		marginBottom: 10
	},
	dayName: {
		fontSize: 24,
		fontWeight: 500,
		color: '#201f20',
		textTransform: 'capitalize',
		marginBottom: 10
	},
	date: {
		fontSize: 20,
		fontWeight: 500,
		color: '#201f20',
	},
}));

export default roomStyles;