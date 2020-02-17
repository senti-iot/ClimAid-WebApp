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
	graphContainer: {
		boxSizing: 'border-box',
		width: '100%',
		backgroundColor: '#108686',
		borderRadius: 4,
		padding: 20,
	},
	currentRoomContainer: {
		boxSizing: 'border-box',
		width: '100%',
		backgroundColor: '#f6f7ff',
		borderRadius: 4,
		padding: 20,
		marginBottom: 20
	},
	currentRoomName: {
		fontSize: 18,
		paddingTop: 5,
	},
	currentReadingsContainer: {
		boxSizing: 'border-box',
		width: '100%',
		backgroundColor: '#f6f7ff',
		borderRadius: 4,
		padding: 20,
	},
	currentReadingsHeader: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
	},
	comfortLevelText: {
		float: 'left',
		color: '#cacad7',
		fontWeight: 400,
		fontSize: 18,
	},
	comfortSquare: {
		float: 'left',
		width: 20,
		height: 20,
		borderRadius: 4,
		backgroundColor: '#cacad7',
		marginLeft: 10,
	},
	barGraphContainer: {
		clear: 'both',
	},
	barGraphLabel: {
		fontWeight: 'bold',
	},
	barGraphCurrectReading: {
		display: 'inline-block',
		fontWeight: 'bold',
		fontSize: 16,
		paddingTop: 8,
	},
	currentReadingBarContainer: {
		position: 'relative',
	},
	currentReadingBar: {
		position: 'absolute',
		borderRadius: 2,
		height: 25,
		marginTop: 10
	},
	currentReadingBarRecommended: {
		position: 'absolute',
		height: 45,
		backgroundColor: '#b2b2c1',
		borderRadius: 5,
	},
	batteryBarContainer: {
		boxSizing: 'border-box',
		width: '100%',
		backgroundColor: '#f6f7ff',
		borderRadius: 4,
		padding: 20,
		marginTop: 20
	},
	batteryLabel: {
		marginTop: 0,
	},
	batteryBar: {
		height: 25,
		backgroundColor: '#3fbfad',
	},
	barGraphCurrectBatteryReading: {
		display: 'inline-block',
		fontWeight: 'bold',
		fontSize: 16,
	},
	weatherContainer: {
		boxSizing: 'border-box',
		width: '100%',
		backgroundColor: '#f6f7ff',
		borderRadius: 4,
		padding: 20,
		marginTop: 20
	}
}));

export default roomStyles;