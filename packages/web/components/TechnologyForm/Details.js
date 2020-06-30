import React from 'react';
import PropTypes from 'prop-types';
import { TextField, InputField } from '../Form';
import { ColumnContainer, Column } from '../Common';

const Details = ({ form, initialValues }) => {
	const { technology } = initialValues;

	return (
		<ColumnContainer>
			<Column>
				<TextField
					form={form}
					name="primary_purpose"
					defaultValue={technology?.primary_purpose}
					label="Objetivo principal da tecnologia"
					placeholder="Descreva qual o objetivo deseja alcançar com essa tecnologia"
					validation={{ required: true }}
					help={<p>Help Text</p>}
				/>
				<TextField
					form={form}
					name="secondary_purpose"
					defaultValue={technology?.secondary_purpose}
					label="Objetivo secundário da tecnologia"
					placeholder="Descreva aqui os objetivos secundários"
					validation={{ required: true }}
					help={<p>Help Text</p>}
				/>
				<TextField
					form={form}
					name="application_mode"
					defaultValue={technology?.application_mode}
					label="Forma de aplicação"
					placeholder="Descreva aqui como é realizada a aplicação da sua tecnologia"
					help={<p>Help Text</p>}
				/>
				<InputField
					form={form}
					name="installation_time"
					type="number"
					defaultValue={technology?.installation_time}
					label="Duração do processo de instalação da tecnologia"
					placeholder="Quantidade de dias necessários para instalação da tecnologia"
					help={<p>Help Text</p>}
				/>
				<TextField
					form={form}
					name="solves_problem"
					defaultValue={technology?.solves_problem}
					label="Problemas que a tecnologia soluciona"
					placeholder="Descreva aqui os problemas solucionáveis por sua tecnologia"
					validation={{ required: true }}
					help={<p>Help Text</p>}
				/>
			</Column>
			<Column>
				<TextField
					form={form}
					name="entailes_problem"
					defaultValue={technology?.entailes_problem}
					label="Problemas que a tecnologia acarreta"
					placeholder="Descreva aqui os possíveis efeitos colaterais que podem ocorrer pelo uso da sua tecnologia"
					help={<p>Help Text</p>}
				/>
				<TextField
					form={form}
					name="requirements"
					defaultValue={technology?.requirements}
					label="Pré-requisitos para implantação da tecnologia"
					placeholder="Descreva aqui o que é necessário fazer no ambiente antes de implantar a sua tecnologia"
					validation={{ required: true }}
					help={<p>Help Text</p>}
				/>
				<TextField
					form={form}
					name="risks"
					defaultValue={technology?.risks}
					label="Riscos associados à tecnologia"
					placeholder="Descreva aqui os riscos envolvidos na implantação e uso da tecnologia"
					validation={{ required: true }}
					help={<p>Help Text</p>}
				/>
				<TextField
					form={form}
					name="contribution"
					defaultValue={technology?.contribution}
					label="Contribuição da tecnologia"
					placeholder="Descreva aqui as contribuições da sua tecnologia para a região de implantação"
					help={<p>Help Text</p>}
				/>
			</Column>
		</ColumnContainer>
	);
};

Details.propTypes = {
	form: PropTypes.shape({}),
	initialValues: PropTypes.shape({
		technology: PropTypes.shape({}),
	}).isRequired,
};

Details.defaultProps = {
	form: {},
};

export default Details;
