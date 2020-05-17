import styled, { css } from 'styled-components';

export const InputFieldWrapper = styled.div`
	font-size: 1.4rem;
	line-height: 14px;

	> div.wrapper {
		display: flex;
	}

	${({ hasError }) =>
		hasError &&
		css`
			> input {
				border: 1px solid ${({ theme }) => theme.colors.orange};
			}
			> .react-select-container .react-select__control {
				border-color: ${({ theme }) => theme.colors.orange};
			}
		`}
`;

export const InputLabel = styled.label`
	color: ${({ theme }) => theme.colors.lightGray};
	font-size: 1.4rem;
	font-weight: 600;
`;

export const InputError = styled.span`
	color: ${({ theme }) => theme.colors.orange};
	margin: 0 0 1rem 0;
	display: inline-block;
`;

export const Row = styled.div`
	display: flex;
`;
