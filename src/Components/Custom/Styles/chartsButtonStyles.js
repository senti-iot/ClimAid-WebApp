import { makeStyles } from '@material-ui/styles';
import { colors } from '@material-ui/core';
import { headerColor } from 'Styles/mainStyles';
import { emphasize } from '@material-ui/core/styles';



const chartsButtonStyles = makeStyles(theme => ({
	mainButton: {
		background: ({ active }) => active ? colors['orange'][500] : headerColor,
		width: 'calc(100% - 16px)',
		margin: 8,
		minWidth: 100,
		color: '#fff',
		textTransform: 'none',
		height: 46,
		fontSize: '1.25rem',
		borderRadius: 8,
		"&:hover": {
			backgroundColor: ({ active }) => active ? emphasize(colors['orange'][500], 0.2) : emphasize(headerColor, 0.2)
		}
	}

}))


export default chartsButtonStyles