import React from 'react'
import ImgTexture from 'assets/imgs/texture_inverted2.png'
import { makeStyles } from '@material-ui/styles';
import { sideBarColor } from 'Styles/mainStyles';
import styled from 'styled-components';

const Background = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background: rgb(52,129,131);
	background: linear-gradient(45deg, rgba(52,129,131,1) 0%, rgba(78,191,173,1) 100%);
`
const styles = makeStyles(() => ({
	container: {
		backgroundImage: `url(${ImgTexture})`,
		backgroundRepeat: "no-repeat",
		backgroundPosition: "bottom",
		backgroundColor: sideBarColor,
		// background: sideBarColor,
		width: "100%",
		height: "100%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	contentWrapper: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexFlow: "column",
		margin: '15px 150px'
	},
	bold: {
		fontWeight: 600
	},
	message: {
		color: '#fff',
		padding: 25,
		paddingTop: 0,
		maxWidth: 615,
		marginBottom: 30
	},
	overcomplicatedButtonTextLight: {
		fontWeight: 300,
		marginRight: 4
	},
	overcomplicatedButtonTextRegular: {
		fontWeight: 700
	},
	button: {
		color: '#000',
		marginBottom: 40,
		boxShadow: 'none'
	},
	img: {
		height: 650,
	},
	sentiDots: {
		height: 75,
		margin: 50,
		marginTop: 100,
		marginBottom: 0
	}
}))

function LoginImages() {
	const classes = styles()
	return (
		<Background>
			<div className={classes.contentWrapper}>
			</div>
		</Background>
	)
}


export default LoginImages
