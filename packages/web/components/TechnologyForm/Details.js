import React from 'react';
import PropTypes from 'prop-types';
import { TextField, InputField } from '../Form';
import { ColumnContainer, Column } from '../Common';

const Details = ({ form }) => {
	return (
		<ColumnContainer>
			<Column>
				<TextField
					form={form}
					name="primary_purpose"
					label="Objetivo principal da tecnologia"
					placeholder="Descreva qual o objetivo deseja alcançar com essa tecnologia"
					validation={{ required: true }}
				/>
				<TextField
					form={form}
					name="secondary_purpose"
					label="Objetivo secundário da tecnologia"
					placeholder="Descreva aqui os objetivos secundários"
					validation={{ required: false }}
				/>
				<TextField
					form={form}
					name="application_mode"
					label="Forma de aplicação"
					placeholder="Descreva aqui como é realizada a aplicação da sua tecnologia"
				/>
				<TextField
					form={form}
					name="application_examples"
					label="Exemplos de Aplicação"
					placeholder="Descreva aqui exemplos de aplicação da sua tecnologia"
				/>
				<InputField
					form={form}
					name="installation_time"
					type="number"
					label="Duração do processo de instalação da tecnologia"
					placeholder="Quantidade de dias necessários para instalação da tecnologia"
				/>
			</Column>
			<Column>
				<TextField
					form={form}
					name="solves_problem"
					label="Problemas que a tecnologia soluciona"
					placeholder="Descreva aqui os problemas solucionáveis por sua tecnologia"
					validation={{ required: true }}
					help={
						<p>
							Se a sua tecnologia for utilizada, quais os problemas que ela soluciona
							a curto, médio e longo prazo?
						</p>
					}
				/>
				<TextField
					form={form}
					name="entailes_problem"
					label="Problemas que a tecnologia acarreta"
					placeholder="Descreva aqui os possíveis efeitos colaterais que podem ocorrer pelo uso da sua tecnologia"
					help={
						<p>
							Se a sua tecnologia for utilizada, quais os seus efeitos colaterais? Ou
							seja, que problemas ela acarreta?
						</p>
					}
				/>
				<TextField
					form={form}
					name="requirements"
					label="Pré-requisitos para implantação da tecnologia"
					placeholder="Descreva aqui o que é necessário fazer no ambiente antes de implantar a sua tecnologia"
					validation={{ required: true }}
				/>
				<TextField
					form={form}
					name="risks"
					label="Riscos associados à tecnologia"
					placeholder="Descreva aqui os riscos envolvidos na implantação e uso da tecnologia"
					validation={{ required: true }}
				/>
				<TextField
					form={form}
					name="contribution"
					label="Contribuição da tecnologia"
					placeholder="Descreva aqui as contribuições da sua tecnologia para a região de implantação"
				/>
			</Column>
		</ColumnContainer>
	);
};

Details.propTypes = {
	form: PropTypes.shape({}),
};

Details.defaultProps = {
	form: {},
};

export default Details;
