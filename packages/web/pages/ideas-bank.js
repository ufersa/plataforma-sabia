import React from 'react';
import { Element } from 'react-scroll';

import { Intro, ListIdeas, RegisterIdea } from '../components/LandingPage';

const IdeasBank = () => {
	return (
		<>
			<Intro
				title="Não encontrou o que desejava?"
				subtitle="Aqui você pode sugerir novas ideias de desenvolvimento de pesquisa e tecnologia de acordo com sua necessidade e para resolver problemas comuns do nosso povo. Veja abaixo as ideias já sugeridas pelos nossos usuários e registre a sua também."
				image={{
					src: '/brainstorming-rafiki.svg',
					alt:
						'Pessoas fazendo um brainstorming com uma ilustração de uma grande lâmpada acima delas',
				}}
				link={{
					label: 'Cadastre sua ideia',
					href: 'register-idea',
					scroll: true,
				}}
			/>
			<ListIdeas />
			<Element id="register-idea" name="register-idea" className="element">
				<RegisterIdea />
			</Element>
		</>
	);
};

export default IdeasBank;
