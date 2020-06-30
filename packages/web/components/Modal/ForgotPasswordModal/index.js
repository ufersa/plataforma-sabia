import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MdMailOutline } from 'react-icons/md';
import { Form, InputField } from '../../Form';
import { Button } from '../../Button';
import { SafeHtml } from '../../SafeHtml';
import {
	StyledForgotPasswordModal,
	StyledLabel,
	ActionsRegister,
	LabelGrups,
	StyledSpan,
	StyledLink,
} from './styles';
import { useModal, useAuth } from '../../../hooks';

const ForgotPasswordModal = () => {
	const { openModal } = useModal();
	const { requestPasswordReset } = useAuth();
	const [loading, setLoading] = useState(false);
	const { t } = useTranslation(['common', 'error']);
	const [message, setMessage] = useState('');

	const handleSubmit = async ({ email }) => {
		setLoading(true);
		const result = await requestPasswordReset({ email });
		setLoading(false);

		if (result) {
			openModal('login', {
				message: t('common:requestPasswordReset'),
			});
		} else {
			setMessage(result?.error?.message[0]?.message ?? t('error:serverError'));
		}
	};

	return (
		<StyledForgotPasswordModal>
			<StyledLabel>
				<SafeHtml html={t('common:forgotPassword')} />
			</StyledLabel>
			<Form onSubmit={handleSubmit}>
				<InputField
					icon={MdMailOutline}
					name="email"
					placeholder="E-mail"
					type="email"
					validation={{ required: true }}
				/>
				<p>{message}</p>
				<ActionsRegister>
					<Button type="submit" disabled={loading}>
						{loading ? t('common:wait') : t('common:request')}
					</Button>
					<LabelGrups>
						<StyledSpan>{t('common:alreadyHaveAnAccount?')}</StyledSpan>
						<StyledLink onClick={() => openModal('login')}>
							{t('common:enterHere')}
						</StyledLink>
					</LabelGrups>
				</ActionsRegister>
			</Form>
		</StyledForgotPasswordModal>
	);
};

export default ForgotPasswordModal;
