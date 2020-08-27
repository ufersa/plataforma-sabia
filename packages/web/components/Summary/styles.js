import styled from 'styled-components';

export const Box = styled.div`
	margin-top: 1rem;
	display: flex;
	justify-content: flex-end;
	margin-right: 2.5rem;
	color: ${({ theme }) => theme.colors.black};
`;

export const Text = styled.span`
	border-top: 1px solid ${({ theme }) => theme.colors.black};
	padding-top: 1rem;
	min-width: 10rem;
	padding-bottom: 1rem;
	padding-left: 3rem;
`;
