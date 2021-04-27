import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import { toast } from '../../Toast';
import { Form, Actions, InputField } from '../../Form';
import { requestEmailChange } from '../../../services';
import { Container, Button } from './styles';

const UpdateEmailModal = ({ closeModal }) => {
	const { t } = useTranslation(['account']);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async ({ email }) => {
		setIsSubmitting(true);

		const result = await requestEmailChange(email);
		setIsSubmitting(false);

		if (result?.error) {
			if (result?.error?.error_code === 'VALIDATION_ERROR') {
				toast.error(result.error.message[0].message);
			} else {
				toast.error(t('account:messages.error'));
			}
		} else {
			toast.success(t('account:messages.emailSuccessfullyUpdated'));
			closeModal();
		}
	};

	return (
		<Container>
			<Form onSubmit={handleSubmit} aria-label="form">
				<InputField
					label="Digite o seu novo email"
					name="email"
					type="email"
					validation={{ required: true }}
					variant="gray"
				/>
				<Actions center>
					<Button
						type="button"
						variant="outlined"
						onClick={() => closeModal()}
						disabled={isSubmitting}
					>
						Cancelar
					</Button>
					<Button type="submit" disabled={isSubmitting}>
						Confirmar
					</Button>
				</Actions>
			</Form>
		</Container>
	);
};

UpdateEmailModal.propTypes = {
	closeModal: PropTypes.func.isRequired,
};

export default UpdateEmailModal;
