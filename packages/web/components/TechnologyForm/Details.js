import React from 'react';
import PropTypes from 'prop-types';
import { TextField, SelectField, InputField } from '../Form';
import { ColumnContainer, Column } from '../Common';

const Details = ({ form }) => {
	return (
		<ColumnContainer>
			<Column>
				<TextField
					form={form}
					name="primaryPurpose"
					label="Objetivo principal da tecnologia"
					placeholder="Descreva qual o objetivo deseja alcançar com essa tecnologia"
					validation={{ required: true }}
					help={<p>Help Text</p>}
				/>
				<TextField
					form={form}
					name="secondaryPurpose"
					label="Objetivo secundário da tecnologia"
					placeholder="Descreva aqui os objetivos secundários"
					validation={{ required: true }}
					help={<p>Help Text</p>}
				/>
				<SelectField
					form={form}
					name="place"
					label="Local de aplicação da tecnologia"
					placeholder="Escolha um local de aplicação"
					options={[
						{
							label: 'Areia Branca',
							value: 'areiabranca',
						},
						{
							label: 'Mossoró',
							value: 'mossoro',
						},
					]}
					help={<p>Help Text</p>}
				/>
				<TextField
					form={form}
					name="aplication"
					label="Forma de aplicação"
					placeholder="Descreva aqui como é realizada a aplicação da sua tecnologia"
					validation={{ required: true }}
					help={<p>Help Text</p>}
				/>
				<SelectField
					form={form}
					name="examples"
					label="Exemplos de aplicação"
					placeholder="Escolha exemplos"
					isMulti
					help={<p>Help Text</p>}
					options={[
						{
							label: 'Exemplo1',
							value: 'exemplo1',
						},
						{
							label: 'Exemplo2',
							value: 'exemplo2',
						},
					]}
				/>
				<InputField
					form={form}
					name="time"
					label="Duração do processo de instalação da tecnologia"
					placeholder="Quantidade de dias necessários para instalação da tecnologia"
					validation={{ required: true }}
					help={<p>Help Text</p>}
				/>
			</Column>
			<Column>
				<TextField
					form={form}
					name="solutions"
					label="Problemas que a tecnologia soluciona"
					placeholder="Descreva aqui os problemas solucionáveis por sua tecnologia"
					validation={{ required: true }}
					help={<p>Help Text</p>}
				/>
				<TextField
					form={form}
					name="problems"
					label="Problemas que a tecnologia acarreta"
					placeholder="Descreva aqui os possíveis efeitos colaterais que podem ocorrer pelo uso da sua tecnologia"
					validation={{ required: true }}
					help={<p>Help Text</p>}
				/>
				<TextField
					form={form}
					name="requirements"
					label="Pré-requisitos para implantação da tecnologia"
					placeholder="Descreva aqui o que é necessário fazer no ambiente antes de implantar a sua tecnologia"
					validation={{ required: true }}
					help={<p>Help Text</p>}
				/>
				<TextField
					form={form}
					name="risks"
					label="Riscos associados à tecnologia"
					placeholder="Descreva aqui os riscos envolvidos na implantação e uso da tecnologia"
					validation={{ required: true }}
					help={<p>Help Text</p>}
				/>
				<TextField
					form={form}
					name="contribution"
					label="Contribuição da tecnologia"
					placeholder="Descreva aqui as contribuições da sua tecnologia para a região de implantação"
					validation={{ required: true }}
					help={<p>Help Text</p>}
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
