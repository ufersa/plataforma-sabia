import styled from 'styled-components';

export const Box = styled.div`
	margin-top: 1rem;
	display: flex;
	justify-content: flex-end;
	margin-right: 2.5rem;
	color: ${({ theme }) => theme.colors.black};
`;

export const Text = styled.span`
	color: ${({ theme }) => theme.colors.lightGray3};
	font-weight: 500;
`;
