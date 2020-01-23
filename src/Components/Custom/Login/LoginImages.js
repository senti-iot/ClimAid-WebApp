import React, { useState } from 'react'
import { T } from 'Components';
import loginImages from 'assets/imgs/loginImages/loader'
import { Button } from '@material-ui/core';
import ImgTexture from 'assets/imgs/texture_inverted2.png'
import sentiDots from 'assets/imgs/senti_dots.svg'
import { useLocalization } from 'Hooks';
import { makeStyles } from '@material-ui/styles';
import { sideBarColor } from 'Styles/mainStyles';

const styles = makeStyles(theme => ({
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
		padding: 25,
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
		height: 300,
	},
	sentiDots: {
		height: 75,
		marginTop: '100',
		margin: 50
	}
}))

function LoginImages() {

	const t = useLocalization()
	const classes = styles()
	const getRndInteger = () => {
		let min = 0
		let max = loginImages.length
		return Math.floor(Math.random() * (max - min)) + min;
	}
	const [number] = useState(getRndInteger())
	return (
		<div className={classes.container}>
			<div className={classes.contentWrapper}>
				<T reversed variant={'h5'} className={classes.message}>
					{t(`login.cards.${number}`, { type: 'markdown' })}
				</T>
				<Button color='primary' variant={'contained'} component={'a'} target={'_blank'} href={"https://senti.io"} className={classes.button}>
					<span className={classes.overcomplicatedButtonTextLight}>
						{t('actions.learn')}
					</span>
					<span className={classes.overcomplicatedButtonTextRegular}>
						{t('actions.more')}
					</span>
				</Button>
				<img src={loginImages[number]} className={classes.img} alt="" />
				<img src={sentiDots} className={classes.sentiDots} alt='' />
			</div>
		</div>
	)
}


export default LoginImages
