import { makeStyles } from '@material-ui/styles';

const otherStyles = makeStyles(theme => ({
	mapInfoContainer: {
		boxSizing: 'border-box',
		position: 'absolute',
		zIndex: '1000',
		height: "1100px",
		width: "800px",
		backgroundColor: '#fff',
		padding: 50,
		paddingTop: 100,
	},
	mapInfoContainerHeader: {
		
	},
	mapInfoContainerSubHeader: {

	},
	mapInfoContainerBuildingsContainer: {
		width: '90%',
		height: 300,
		backgroundColor: '#f6f7ff',
		borderRadius: 20,
		padding: 15,
		overflow: 'scroll',
	},
	mapInfoContainerToggleOn: {
		position: 'absolute',
		top: 'calc(50% - 25px)',
		right: '-25px',
		boxSizing: 'border-box',
		width: 50,
		height: 50,
		borderRadius: '50%',
		backgroundColor: '#b2b2c1',
		color: '#ffffff',
		paddingTop: 15,
		paddingLeft: 17,
		cursor: 'pointer',
	},
	mapInfoContainerToggleOff: {
		position: 'absolute',
		top: '500px',
		left: '30px',
		width: 50,
		height: 50,
		borderRadius: '50%',
		zIndex: 1000,
		backgroundColor: '#ffffff',
		color: '#b9bdbe',
		boxShadow: '0px 0px 8px 0px rgba(153,153,153,1);',
		paddingTop: 15,
		paddingLeft: 17,
		cursor: 'pointer',
	},
	mapPopupContainer: {
		width: 400,
		minHeight: 550,
		background: '#fff'
	},
	mapPopupHeader: {
		fontSize: 18,
		margin: 0,
		padding: 0
	}
}));

export default otherStyles;
