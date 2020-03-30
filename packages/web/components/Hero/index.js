import React from 'react';
import Button from '../Button';

import { Image, Content, SearchBox } from './styles';

const Hero = () => {
	function submit() {
		// Submit code
	}

	return (
		<Image>
			<Content>
				<h1>O que você precisa para mudar o Semiárido?</h1>
				<p>Encontre a tecnologia certa para a sua região</p>
				<SearchBox>
					<form action="">
						<input type="text" placeholder="Qual solução você busca?" />
						<Button onClick={submit} type="submit">
							Buscar
						</Button>
					</form>
				</SearchBox>
			</Content>
		</Image>
	);
};

export default Hero;
