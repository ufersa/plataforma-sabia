import React from 'react';
import { useModal } from '../../../../hooks';

import { Container, Image, Title, Content, Text, CloseButton } from './styles';

const HasNoTechnology = () => {
	const { closeModal } = useModal();

	return (
		<Container>
			<Image />
			<Content>
				<Title>Espere um pouco...</Title>
				<Text>
					Essa avaliação é apenas para pessoas que já adquiriram e estão utilizando essa
					tecnologia em seu dia a dia.
				</Text>
				<CloseButton onClick={closeModal}>Entendi</CloseButton>
			</Content>
		</Container>
	);
};

export default HasNoTechnology;
