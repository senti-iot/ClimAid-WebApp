import { makeStyles } from '@material-ui/styles';

const buildingStyles = makeStyles(theme => ({
	buildInfoContainer: {
		height: 940,
		backgroundColor: '#ffffff',
		padding: 30,
	},
	buildingName: {
		fontSize: 40,
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
	weatherContainer: {
		marginTop: 20,
	},
	weatherHeader: {
		fontSize: 24,
		fontWeight: 500,
		color: '#201f20',
		marginBottom: 15,
	},
	weatherInfo: {
		color: '#b2b2c1',
		fontWeight: 500,
	},
	weatherImage: {
		width: '100%',
	},

	buildingMap: {
		width: "100%",
		height: 1000,
	}
}));

export default buildingStyles;
