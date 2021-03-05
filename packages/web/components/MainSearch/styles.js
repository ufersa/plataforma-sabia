import styled, { css } from 'styled-components';
import { TabList as RTabList } from 'react-tabs';
import { Tabs, Tab as RTab } from '../Tab';

export const Wrapper = styled.main`
	${({ theme: { colors } }) => css`
		background-color: ${colors.lightGray4};
	`}
`;

export const Container = styled(Tabs)`
	display: flex;
	margin: 0 auto;
	padding: 3rem 4rem 6rem;
	max-width: 1440px;

	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		flex-direction: column;
		padding: 2rem 2rem 3rem;
	}
`;

export const FilterContainer = styled.section`
	${({ theme: { colors, screens }, openMobile }) => css`
		flex: 1;
		margin-right: 3rem;
		min-width: 30rem;

		@media (max-width: ${screens.large}px) {
			display: none;

			${openMobile &&
				css`
					display: block;
					background: ${colors.white};
					border-radius: 1.6rem;
					left: 0;
					bottom: 0;
					width: 100%;
					max-height: 100%;
					position: fixed;
					overflow-y: auto;
					max-width: initial;
					transition: transform 300ms cubic-bezier(0.465, 0.183, 0.153, 0.946);
					will-change: transform;
					z-index: 1;
				`}
		}
	`}
`;

export const FilterContainerHeader = styled.div`
	${({ theme: { colors, screens } }) => css`
		display: flex;
		align-items: center;

		h2 {
			flex: 1;
			font-size: 2.2rem;
			line-height: 3rem;
			color: ${colors.black};
		}

		@media (max-width: ${screens.large}px) {
			padding: 3rem;
		}
	`}
`;

export const MobileCloseButton = styled.button`
	${({ theme: { screens } }) => css`
		display: none;
		align-items: center;
		justify-content: center;
		margin-left: 2rem;
		background: ${({ theme }) => theme.colors.primary};
		border: 0.2rem solid ${({ theme }) => theme.colors.darkOrange};

		svg {
			fill: ${({ theme }) => theme.colors.white};
			stroke: ${({ theme }) => theme.colors.white};
			width: 2rem;
			height: 2rem;
		}

		@media (max-width: ${screens.large}px) {
			display: flex;
		}
	`};
`;

export const FilterContainerBody = styled.div`
	${({ theme: { screens } }) => css`
		@media (max-width: ${screens.large}px) {
			padding: 0 3rem;
		}
	`}
`;

export const MobileButtonsContainer = styled.div`
	${({ theme: { screens, colors } }) => css`
		display: none;
		padding: 2rem 0;
		border-top: 0.1rem solid ${colors.gray98};

		> button {
			width: 100%;
			margin-bottom: 1rem;
		}

		@media (max-width: ${screens.large}px) {
			display: block;
		}
	`}
`;

export const ResultsContainer = styled.section`
	${({ theme: { colors } }) => css`
		width: 100%;

		.ais-Hits {
			.ais-Hits-list {
				display: flex;
				flex-direction: column;

				.ais-Hits-item:not(:last-child) {
					border-bottom: 1px solid ${colors.border};
				}
			}
		}
	`}
`;

export const ResultsContainerHeader = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	margin-top: 1.6rem;

	> div:last-child {
		margin-left: 3rem;
	}

	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		min-height: 0;
		padding-bottom: 2rem;

		> div:not(:first-child) {
			display: none;
		}
	}
`;

export const ResultsFooter = styled.footer`
	width: 100%;
	margin-top: 5rem;
`;

export const Tab = styled(RTab)`
	${({ selected, theme: { colors } }) => css`
		display: flex;
		align-items: center;
		justify-content: center;
		text-transform: uppercase;
		width: 100%;

		border: none;
		bottom: 0;
		position: relative;

		font-weight: 700;
		font-size: 1.4rem;

		background-color: transparent;
		color: ${selected ? colors.secondary : colors.lightGray2};

		padding: 0.8rem;

		:after {
			content: '';
			position: absolute;
			bottom: -2px;
			right: 0;
			left: 0;
			border-bottom: 2px solid ${selected ? colors.secondary : colors.mediumGray};
		}
	`}
`;

export const TabsHeader = styled.div`
	${({ theme: { colors } }) => css`
		border-bottom: 2px solid ${colors.mediumGray};
		margin-top: 1.6rem;
	`}
`;

export const TabList = styled(RTabList)`
	${({ theme: { screens } }) => css`
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: center;

		@media screen and (max-width: ${screens.medium}px) {
			flex-direction: column;
		}
	`}
`;

export const HitsWrapper = styled.div`
	${({ theme: { colors, metrics } }) => css`
		background-color: ${colors.white};
		border-radius: ${metrics.baseRadius}rem;
		margin-top: 1.6rem;
	`}
`;
