import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, InputField } from '../../Form';
import { Button } from '../../Button';
import { StyledEmailConfirmationModal, ActionsRegister } from './styles';
import { useModal, useAuth } from '../../../hooks';

const EmailConfirmationModal = () => {
	const { openModal } = useModal();
	const { emailConfirmation } = useAuth();
	const [loading, setLoading] = useState(false);
	const { t } = useTranslation(['common']);
	const handleSubmit = async ({ email }) => {
		setLoading(true);
		await emailConfirmation({ email });
		setLoading(false);
		openModal('login', {
			message: t('common:checkYourInbox'),
		});
	};

	return (
		<StyledEmailConfirmationModal>
			<Form onSubmit={handleSubmit}>
				<InputField
					name="email"
					placeholder="E-mail"
					type="email"
					validation={{ required: true }}
				/>
				<ActionsRegister>
					<Button type="submit" disabled={loading}>
						{loading ? t('common:wait') : t('common:confirmEmail')}
					</Button>
				</ActionsRegister>
			</Form>
		</StyledEmailConfirmationModal>
	);
};

export default EmailConfirmationModal;
