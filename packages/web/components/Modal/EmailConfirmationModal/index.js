import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import styled from 'styled-components';
import { Form, InputField, Actions } from '../../Form';
import { Button } from '../../Button';
import { useModal, useAuth } from '../../../hooks';

const StyledEmailConfirmationModal = styled.div`
	width: 50rem;
	padding: 0rem;

	@media (max-width: ${({ theme }) => theme.screens.medium}px) {
		width: 100%;
	}
`;

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
			{t('common:confirmYourEmail')}
			<Form onSubmit={handleSubmit}>
				<InputField
					name="email"
					placeholder="E-mail"
					type="email"
					validation={{ required: true }}
				/>
				<Actions>
					<Button type="submit" disabled={loading}>
						{loading ? t('common:wait') : t('common:confirmEmail')}
					</Button>
				</Actions>
			</Form>
		</StyledEmailConfirmationModal>
	);
};

export default EmailConfirmationModal;
