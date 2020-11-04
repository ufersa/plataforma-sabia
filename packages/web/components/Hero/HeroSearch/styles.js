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
	`}
`;
