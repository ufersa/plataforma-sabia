import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from '../../Toast';
import { Form } from '../../Form';
import { Container } from './styles';
import { createInstitutions } from '../../../services';
import { unMask } from '../../../utils/helper';
import StepOne from './StepOne';

const CreateInstitutionsModal = ({ closeModal, onClose }) => {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async ({ cnpj, zipcode, state, ...data }) => {
		setIsSubmitting(true);

		const result = await createInstitutions({
			...data,
			zipcode: unMask(zipcode),
			cnpj: unMask(cnpj),
			state: state.value,
		});

		setIsSubmitting(false);

		if (result?.error) {
			if (result?.error?.error_code === 'VALIDATION_ERROR') {
				toast.error(result.error.message[0].message);
			} else {
				toast.error('Não foi possível cadastrar a instituição');
			}
		} else {
			closeModal();
			onClose();
			toast.success('Instituição cadastrada');
		}
	};

	return (
		<Container>
			<h3>Cadastrar nova Organização</h3>
			<Form onSubmit={handleSubmit} aria-label="form">
				<StepOne loading={isSubmitting} closeModal={closeModal} />
			</Form>
		</Container>
	);
};

CreateInstitutionsModal.propTypes = {
	closeModal: PropTypes.func.isRequired,
	onClose: PropTypes.func,
};

CreateInstitutionsModal.defaultProps = {
	onClose: () => {},
};

export default CreateInstitutionsModal;
