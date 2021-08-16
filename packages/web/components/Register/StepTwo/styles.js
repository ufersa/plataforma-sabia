import styled, { css } from 'styled-components';

export const CheckboxLabel = styled.p`
	${({ theme: { colors } }) => css`
		color: ${colors.black};
		font-weight: 500;
		font-size: 1.2rem;
	`}
`;

export const CheckboxWrapper = styled.div`
	margin-bottom: 4rem;
	> div:first-child {
		margin-bottom: 0.8rem;
	}
`;
