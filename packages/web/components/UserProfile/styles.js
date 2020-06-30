import styled from 'styled-components';
import { Link } from '../Link';

export const Container = styled.section`
	padding-top: 3rem;
	min-width: 30rem;
`;

export const UserMsg = styled.div`
	display: block;
	padding-left: 2rem;
	font-size: 2rem;

	span {
		font-weight: bold;
	}
`;

export const SectionTitle = styled.h3`
	margin: 2rem 0;
	padding: 0.5rem 0;
	text-align: center;
	text-transform: uppercase;
	font-size: 1.4rem;
	color: ${({ theme }) => theme.colors.secondary};
	background-color: ${({ theme }) => theme.colors.gray98};
	border-radius: ${({ theme }) => theme.metrics.doubleRadius}rem;
`;

export const SectionItem = styled(Link)`
	display: flex;
	align-items: center;
	font-size: 1.6rem;
	margin-bottom: 2rem;
	padding-left: 2rem;
	color: ${({ theme }) => theme.colors.secondary};

	:hover {
		color: ${({ theme }) => theme.colors.darkGreen};
	}

	svg {
		fill: ${({ theme }) => theme.colors.secondary};
		stroke: ${({ theme }) => theme.colors.secondary};
		width: 2rem;
		height: 2rem;
		margin-right: 1rem;
	}
`;

export const LogoutButton = styled.button`
	display: flex;
	align-items: center;
	font-size: 1.6rem;
	background: none;
	border: none;
	padding-left: 2rem;
	margin-bottom: 2rem;
	color: ${({ theme }) => theme.colors.secondary};

	:hover {
		color: ${({ theme }) => theme.colors.darkGreen};
	}

	svg {
		fill: ${({ theme }) => theme.colors.secondary};
		stroke: ${({ theme }) => theme.colors.secondary};
		width: 2rem;
		height: 2rem;
		margin-right: 1rem;
	}
`;
