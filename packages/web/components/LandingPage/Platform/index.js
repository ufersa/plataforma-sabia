import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useModal, useAuth } from '../../../hooks';
import { toast } from '../../Toast';

import Button from '../Button';

import { Container, TextContainer, Title, Subtitle } from './styles';

const Platform = () => {
	const router = useRouter();
	const { t } = useTranslation(['common']);
	const { user } = useAuth();
	const { openModal } = useModal();

	const handleButtonClick = (e) => {
		e.preventDefault();
		if (!user?.email) {
			openModal('login', { message: t('common:signInToContinue'), redirectTo: '/' });
		} else {
			toast.info('Você está sendo redireciondo para o início');
			router.push('/');
		}
	};

	return (
		<Container>
			<TextContainer>
				<Title>A vitrine tecnológica mais completa do semiárido</Title>
				<Subtitle>
					Um ambiente digital interativo voltado a difundir as tecnologias demandadas e
					ofertadas na resolução de problemas do semiárido brasileiro.
				</Subtitle>
				<Button onClick={handleButtonClick}>Acesse agora</Button>
			</TextContainer>
			<img
				src="/search-engines-rafiki.svg"
				alt="Mulher de costas segurando uma lupa gigante e olhando para uma barra de busca gigante"
			/>
		</Container>
	);
};

export default Platform;
