import styled, { css } from 'styled-components';
import { Stats } from 'react-instantsearch-dom';

export const SearchItemContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	cursor: pointer;
`;

export const SearchItemText = styled.div`
	margin-left: 1rem;
	padding-top: 0.5rem;
	flex: 1;

	> span:first-child {
		display: block;
	}

	> span:last-child {
		font-weight: 400;
	}
`;

export const StyledStats = styled(Stats)`
	${({ theme: { colors } }) => css`
		background-color: ${colors.primary};
		color: ${colors.white};
		text-align: center;
		font-size: 1.8rem;

		position: absolute;
		left: 0;
		right: 0;
	`}
`;

export const StyledSuggestionsContainer = styled.div`
	position: relative;
`;

export const StyledSuggestions = styled.div`
	${({ theme: { colors, metrics } }) => css`
		position: absolute;
		top: 20px;
		left: 0;
		right: 0;

		background-color: ${colors.white};
		border-radius: ${metrics.baseRadius}rem;
		border-top-left-radius: 0;
		overflow: hidden;

		.react-autosuggest__suggestion {
			padding: 1rem 1.4rem;
			cursor: pointer;

			&.react-autosuggest__suggestion--highlighted {
				background-color: ${colors.gray98};
			}
		}
	`}
`;
