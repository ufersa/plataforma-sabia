import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MdMailOutline } from 'react-icons/md';
import { Form, InputField } from '../../Form';
import { Button } from '../../Button';
import { StyledEmailConfirmationModal, ActionsRegister } from './styles';
import { useModal, useAuth } from '../../../hooks';

const EmailConfirmationModal = () => {
	const { openModal } = useModal();
	const { emailConfirmation } = useAuth();
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);
	const { t } = useTranslation(['common']);
	const handleSubmit = async () => {
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
					icon={MdMailOutline}
					name="email"
					placeholder="E-mail"
					type="text"
					required
					value={email}
					onChange={setEmail}
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
