import React from 'react';
import PropTypes from 'prop-types';
import { InputField } from '../../Form';
import { ColumnContainer, Column } from '../../Common';

const StepTwo = ({ form, data }) => {
	console.log('FORM TWO', form, data);

	return (
		<>
			<ColumnContainer>
				<Column>
					<InputField
						form={form}
						name="test-two"
						label="Teste Dois"
						placeholder="Teste dois aqui"
						validation={{ required: true }}
					/>
				</Column>
			</ColumnContainer>
		</>
	);
};

StepTwo.propTypes = {
	form: PropTypes.shape({
		watch: PropTypes.func,
		getValues: PropTypes.func,
		setValue: PropTypes.func,
	}),
	data: PropTypes.shape({}).isRequired,
};

StepTwo.defaultProps = {
	form: {},
};

export default StepTwo;
