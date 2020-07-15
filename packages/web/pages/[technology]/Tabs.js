import React from 'react';
import PropTypes from 'prop-types';
import { resetIdCounter } from 'react-tabs';
import { useTechnology } from '../../hooks';

import { Tabs as Container, Tab, TabPanel, TabList } from '../../components/Tab';
import { Row, Col, TitleContainer } from './styles';

const DescriptionWithValues = ({ title = '', value }) => (
	<p>
		{!!title && <strong>{title}: </strong>}
		<span>{value}</span>
	</p>
);

const SectionTitle = ({ children }) => (
	<TitleContainer>
		<h4>{children}</h4>
	</TitleContainer>
);

const Tabs = () => {
	const { technology } = useTechnology();

	return (
		<Container>
			<TabList>
				<Tab>Sobre a Tecnologia</Tab>
				<Tab>Caracterização</Tab>
			</TabList>

			<TabPanel>
				<SectionTitle>Identificação</SectionTitle>
				<DescriptionWithValues title="Título" value={technology.title} />
				<DescriptionWithValues title="Nome Popular" value={technology.id} />
				<DescriptionWithValues title="Sigla" value={technology.id} />
				<DescriptionWithValues title="Descrição" value={technology.description} />
				<DescriptionWithValues title="Categoria" value={technology.category} />
				<DescriptionWithValues title="Classificação" value={technology.id} />
				<DescriptionWithValues title="Dimensão" value={technology.id} />
				<DescriptionWithValues title="Público-alvo" value={technology.id} />
				<DescriptionWithValues title="Bioma" value={technology.id} />
				<DescriptionWithValues title="Programa Governamental" value={technology.id} />

				<SectionTitle>Aspectos Legais</SectionTitle>
				<DescriptionWithValues
					title="Tecnologia Patenteada"
					value={technology.patent ? 'Sim' : 'Não'}
				/>
				<DescriptionWithValues title="Direitos intelectuais" value={technology.id} />

				<SectionTitle>Desenvolvedor</SectionTitle>
				<DescriptionWithValues value={technology.id} />
			</TabPanel>
			<TabPanel>
				<Row>
					<Col size="2">
						<SectionTitle>Objetivos</SectionTitle>
						<DescriptionWithValues title="Objetivo Principal" value={technology.id} />

						<SectionTitle>Aplicação</SectionTitle>
						<DescriptionWithValues title="Onde é a Aplicação" value={technology.id} />
					</Col>
					<Col size="2">
						<SectionTitle>Problematização</SectionTitle>
						<DescriptionWithValues
							title="Problemas que a tecnologia soluciona"
							value={technology.id}
						/>

						<SectionTitle>Contribuição</SectionTitle>
						<DescriptionWithValues title="Onde é a Aplicação" value={technology.id} />
					</Col>
				</Row>
			</TabPanel>
		</Container>
	);
};

DescriptionWithValues.propTypes = {
	title: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

DescriptionWithValues.defaultProps = {
	title: '',
};

SectionTitle.propTypes = {
	children: PropTypes.string.isRequired,
};

Tabs.getInitialProps = () => {
	resetIdCounter();
};

export default Tabs;
