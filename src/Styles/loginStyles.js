import styled from 'styled-components';
import size from './themes/mediaQueries';
import Paper from '@material-ui/core/Paper';
import { IconButton, ButtonBase, Button } from '@material-ui/core';
import { ItemG, Muted, T, TextF } from 'Components';

export const LoginWrapper = styled.div`
	display: flex;
	overflow: auto;
	@media ${size.up.md} {
		height: 100vh;
	}
`
export const MobileContainer = styled.div`
	@media ${size.down.sm} {
		padding: 16px;
	}
	@media ${size.down.xs} {
		padding: 16px 4px;
	}
`

export const ImgLogo = styled.img`
	height: 50px;
	margin: 8px;
`
export const SmallActionButton = styled(IconButton)`
	padding: 0;
	&:hover {
		background: initial;
	}
`
export const Footer = styled(ItemG)`
	flex: 1;
	padding: 24px;
	@media ${size.down.md} {
		padding: 8px;
	}
	@media ${size.down.sm} {
		padding: 48px;
	}
`
export const FooterText = styled(Muted)`
	font-family: "Roboto", "Helvetica", "Arial", sans-serif;
	font-weight: 300;
	line-height: 1.5em;
	font-size: 13px;

`

export const MutedButton = styled(ButtonBase)`
	font-family: "Roboto", "Helvetica", "Arial", sans-serif;
	font-weight: 300;
	line-height: 1.5em;
	font-size: 13px;
	margin: 0px 4px;
	text-decoration: underline;
`

export const InputContainer = styled.div`
	padding: 24px;
	@media ${size.down.lg} {
		padding: 0px;
	}
	@media ${size.down.md} {
		padding: 24px;
	}
	@media ${size.down.xs} {
		padding: 8px;
	}
`
export const LeftPanel = styled(Paper)`
	transition: all 300ms ease;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	border-radius: 0px;
	@media ${size.up.md} {
		height: 100%;
	}
	@media ${size.down.sm} {
		border-radius: 8px;
	}
`
export const NeedAccountT = styled(T)`
	font-size: 1rem;
	margin: 16px;
	@media ${size.down.md} {
		margin: 8px;
	}
`
export const LoginButton = styled(Button)`
	margin: 36px;
	color: #fff;
	max-width: 120px;
	@media ${size.down.md} {
		max-width: 100%;
		margin: 8px 8px;
	}
`
export const LoginTF = styled(TextF)`
	margin: 16px;
	@media ${size.down.md} {
		margin: 8px;
	}
`
