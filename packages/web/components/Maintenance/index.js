import React from 'react';
import { useRouter } from 'next/router';

import { Container, Button } from './styles';

const Maintenance = () => {
	const router = useRouter();
	return (
		<Container>
			<img
				src="/building-blocks-rafiki.svg"
				alt="Ilustração de um rapaz em pé segurando uma caixa laranja em frente a algumas caixas verdes empilhadas"
			/>
			<h1>Oops, esta página ainda não está disponível</h1>
			<p>
				Enquanto nós trabalhamos nessa funcionalidade, fique a vontade para voltar e
				usufruir de tudo que nossa plataforma oferece para você hoje.
			</p>
			<Button type="button" variant="success" onClick={() => router.push('/')}>
				Voltar para a página principal
			</Button>
		</Container>
	);
};

export default Maintenance;
