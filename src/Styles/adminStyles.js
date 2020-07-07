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
	},
	levelRow: {
		height: 60
	},
	levelHeaderCell: {
		textAlign: 'center',
		fontWeight: 'bold'
	},
	levelCell: {
		textAlign: 'center'
	},
	levelCellRed: {
		backgroundColor: '#edbcbe',
		borderRight: 'solid 1px #fff'
	},
	levelCellYellow: {
		backgroundColor: '#f7dbba',
		borderRight: 'solid 1px #fff'
	},
	levelCellGreen: {
		backgroundColor: '#a0dfd6',
		borderRight: 'solid 1px #fff'
	},
	levelInput: {
		width: 40,
		height: 30,
		border: 'none',
		borderRadius: 4,
		backgroundColor: '#eee',
		textAlign: 'center'
	}
}));

export default adminStyles;