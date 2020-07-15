import React from 'react';
import PropTypes from 'prop-types';
import { resetIdCounter } from 'react-tabs';
import { useTechnology } from '../../hooks';

import { Tabs as Container, Tab, TabPanel, TabList } from '../../components/Tab';
import { Row, Col, TitleContainer, DescriptionValue } from './styles';

const TextValue = ({ title = '', value }) => (
	<DescriptionValue>
		{!!title && <strong>{title}: </strong>}
		<span>{value}</span>
	</DescriptionValue>
);

const Description = ({ title, children }) => (
	<>
		<TitleContainer>
			<h4>{title}</h4>
		</TitleContainer>
		{children}
	</>
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
				<Description title="Identificação">
					<TextValue title="Título" value={technology.title} />
					<TextValue title="Nome Popular" value={technology.id} />
					<TextValue title="Sigla" value={technology.id} />
					<TextValue title="Descrição" value={technology.description} />
					<TextValue title="Categoria" value={technology.category} />
					<TextValue title="Classificação" value={technology.id} />
					<TextValue title="Dimensão" value={technology.id} />
					<TextValue title="Público-alvo" value={technology.id} />
					<TextValue title="Bioma" value={technology.id} />
					<TextValue title="Programa Governamental" value={technology.id} />
				</Description>

				<Description title="Aspectos Legais">
					<TextValue
						title="Tecnologia Patenteada"
						value={technology.patent ? 'Sim' : 'Não'}
					/>
				</Description>
				<TextValue title="Direitos intelectuais" value={technology.id} />

				<Description title="Desenvolvedor">
					<TextValue value={technology.id} />
				</Description>
			</TabPanel>
			<TabPanel>
				<Row>
					<Col size="2">
						<Description title="Objetivos">
							<TextValue title="Objetivo Principal" value={technology.id} />
						</Description>

						<Description title="Aplicação">
							<TextValue title="Onde é a Aplicação" value={technology.id} />
						</Description>
					</Col>
					<Col size="2">
						<Description title="Problematização">
							<TextValue
								title="Problemas que a tecnologia soluciona"
								value={technology.id}
							/>
						</Description>

						<Description title="Contribuição">
							<TextValue title="Onde é a Aplicação" value={technology.id} />
						</Description>
					</Col>
				</Row>
			</TabPanel>
		</Container>
	);
};

TextValue.propTypes = {
	title: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

TextValue.defaultProps = {
	title: '',
};

Description.propTypes = {
	title: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
};

Tabs.getInitialProps = () => {
	resetIdCounter();
};

export default Tabs;
