import styled, { css } from 'styled-components';

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
		border: none;
		bottom: 0;
		position: relative;

		font-weight: 700;
		font-size: 1.2rem;
		text-transform: lowercase;

		background-color: transparent;
		color: ${selected ? colors.secondary : colors.lightGray2};

		padding: 0.8rem;

		:first-letter {
			text-transform: uppercase;
		}

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
		position: sticky;
		top: 0;
		z-index: 1;
		border-bottom: 2px solid ${colors.lightGray4};
		margin-top: 1.6rem;
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
