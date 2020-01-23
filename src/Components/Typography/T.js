import { Typography } from '@material-ui/core';
import styled from 'styled-components';


const T = styled(Typography)`
	font-weight: ${props => props.bold ? 600 : undefined};
`
export default T