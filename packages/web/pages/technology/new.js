import React from 'react';
import { ContentContainer, Title } from '../../components/Common';
import InputField from '../../components/Form/InputField';
import { Form } from '../../components/Form';
import { Button } from '../../components/Button';

const NewTechnology = () => {
	return (
		<ContentContainer>
			<Title align="left">
				Cadastrar <span>Tecnologia</span>
			</Title>
			<Form>
				<InputField label="Título da Tecnologia" name="name" />
				<InputField label="Sigla da Tecnologia" name="acronym" />

				<Button type="submit">Enviar</Button>
			</Form>
		</ContentContainer>
	);
};

NewTechnology.getInitialProps = async () => {
	return {
		namespacesRequired: ['common'],
	};
};

export default NewTechnology;
