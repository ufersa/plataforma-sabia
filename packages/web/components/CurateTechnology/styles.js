import styled, { css } from 'styled-components';
import { TabList as RTablList } from 'react-tabs';

import { Tabs, Tab as RTab } from '../Tab';

export const Wrapper = styled(Tabs)`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
`;

export const TitleWrapper = styled.div`
	display: flex;
	align-items: center;

	div:first-child {
		margin-left: 1.4rem;
	}
`;

export const Tab = styled(RTab)`
	${({ selected, theme: { colors } }) => css`
		display: flex;
		align-items: center;
		justify-content: center;
		text-transform: uppercase;

		border: none;
		bottom: 0;
		position: relative;

		font-weight: 700;
		font-size: 1.2rem;

		background-color: transparent;
		color: ${selected ? colors.secondary : colors.lightGray2};

		padding: 0.8rem;

		:after {
			content: '';
			position: absolute;
			bottom: -2px;
			right: 0;
			left: 0;
			border-bottom: 2px solid ${selected ? colors.secondary : colors.lightGray4};
		}
	`}
`;

export const TabsHeader = styled.div`
	${({ theme: { colors } }) => css`
		border-bottom: 2px solid ${colors.lightGray4};
		margin-top: 1.6rem;
	`}
`;

export const TabList = styled(RTablList)`
	${({ theme: { screens } }) => css`
		padding: 0;
		display: grid;

		@media screen and (min-width: ${screens.medium}px) {
			grid-template-columns: 1fr 1fr;
			grid-template-rows: 1fr 1fr 1fr;
		}

		@media screen and (min-width: ${screens.large}px) {
			grid-template-columns: 1fr 1fr 1fr 1fr;
			grid-template-rows: 1fr 1fr;
		}

		@media screen and (min-width: 1280px) {
			grid-template-columns: repeat(6, 1fr);
			grid-template-rows: 1fr;
		}
	`}
`;

export const Footer = styled.footer`
	${({ theme: { screens } }) => css`
		display: flex;
		flex-flow: row wrap;

		button {
			margin-top: 1.4rem;
		}

		> button {
			margin-right: 2.2rem;
		}

		> div {
			display: flex;
			flex-flow: row wrap;
			flex-grow: 1;
		}

		@media screen and (min-width: ${screens.medium}px) {
			button:not(:first-child) {
				margin-left: 2.2rem;
			}

			> div {
				margin-left: auto;
				justify-content: flex-end;
			}
		}
	`}
`;

/** *
 * Shared between tabs
 ** */

export const Container = styled.div`
	${({ theme: { screens }, flexDirection }) => css`
		display: flex;
		flex-direction: ${flexDirection};
		padding: 3.2rem 0;
		max-width: 116.4rem;

		@media screen and (max-width: ${screens.medium}px) {
			flex-direction: column;
		}
	`}
`;

export const ContentBox = styled.div`
	${({ theme: { colors, screens }, flexBasis }) => css`
		flex-basis: ${flexBasis || '50%'};

		> div:not(:first-child) {
			margin-top: 1.6rem;
		}

		@media screen and (max-width: ${screens.medium}px) {
			flex-basis: 100%;

			:last-child > div:first-child {
				margin-top: 1.6rem;
			}
		}

		@media screen and (min-width: ${screens.medium}px) {
			:not(:first-child) {
				margin-left: 0.8rem;
				padding-left: 0.8rem;
				border-left: 1px solid ${colors.lightGray4};
			}
		}
	`}
`;
