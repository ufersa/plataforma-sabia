import React from 'react';
import { ContentContainer, Title } from '../../components/Common';

const NewTechnology = () => {
	return (
		<ContentContainer>
			<Title align="left">
				Cadastrar <span>Tecnologia</span>
			</Title>
		</ContentContainer>
	);
};

NewTechnology.getInitialProps = async () => {
	return {
		namespacesRequired: ['common'],
	};
};

export default NewTechnology;
