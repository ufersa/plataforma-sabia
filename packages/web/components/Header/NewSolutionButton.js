import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useAuth } from '../../hooks';
import { SafeHtml } from '../SafeHtml';
import { internal as internalPages } from '../../utils/enums/pages.enum';

const NewSolutionButton = () => {
	const { t } = useTranslation(['common']);
	const { user } = useAuth();
	const router = useRouter();

	const handleClick = (e) => {
		if (!user.email) {
			e.preventDefault();
			router.push(`${internalPages.signIn}?redirect=${internalPages.newSolution}`);
		}
	};

	return (
		<Link href={internalPages.newSolution} passHref>
			<Button onClick={handleClick}>
				<SafeHtml html={t('common:registerSolution')} />
			</Button>
		</Link>
	);
};

const Button = styled.a`
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 0 3.5rem;
	text-transform: uppercase;
	letter-spacing: 0.2rem;
	font-size: 1.4rem;
	font-weight: 700;
	line-height: 1.8rem;
	background-color: ${({ theme }) => theme.colors.primary};
	color: ${({ theme }) => theme.colors.white};
	text-align: center;

	:hover {
		background-color: ${({ theme }) => theme.colors.darkOrange};
		cursor: pointer;
	}

	span {
		display: block;
	}

	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		display: none;
	}
`;

export default NewSolutionButton;
