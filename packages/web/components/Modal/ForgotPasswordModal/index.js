import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MdPermContactCalendar, MdMailOutline, MdVpnKey } from 'react-icons/md';
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
	const { t } = useTranslation(['common']);
	const [message, setMessage] = useState('');
	const handleSubmit = async ({ fullname, email, password }) => {
		setLoading(true);
		const result = await requestPasswordReset({ fullname, email, password });
		setLoading(false);
		if (result.error) {
			setMessage(result.error.message[0].message);
		} else {
			openModal('login', {
				message: t('common:accountCreated'),
			});
		}
	};

	return (
		<StyledForgotPasswordModal>
			<StyledLabel>
				<SafeHtml html={t('common:forgotPassword')} />
			</StyledLabel>
			<Form onSubmit={handleSubmit}>
				<InputField
					icon={MdPermContactCalendar}
					name="fullname"
					placeholder={t('common:fullName')}
					type="text"
					validation={{ required: true }}
				/>
				<InputField
					icon={MdMailOutline}
					name="email"
					placeholder="E-mail"
					type="email"
					validation={{ required: true }}
				/>
				<InputField
					icon={MdVpnKey}
					name="password"
					placeholder="Password"
					type="password"
				/>
				<p>{message}</p>
				<ActionsRegister>
					<Button type="submit" disabled={loading}>
						{loading ? t('common:wait') : t('common:register')}
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
