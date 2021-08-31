/* eslint-disable import/prefer-default-export */
import styled, { css } from 'styled-components';

export const RegisterTypeTitle = styled.h3`
	${({ theme: { colors } }) => css`
		color: ${colors.lightGray2};
		font-size: 2.8rem;
		font-weight: 500;
		line-height: 3.3rem;
		margin-bottom: 4rem;

		> p {
			font-size: 1.6rem;
			line-height: 3.3rem;
		}
	`}
`;
