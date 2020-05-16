import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MdPermContactCalendar, MdMailOutline, MdVpnKey } from 'react-icons/md';
import { Form, InputField } from '../../Form';
import { Button } from '../../Button';
import {
	StyledRegisterModal,
	StyledLabel,
	ActionsRegister,
	LabelGrups,
	StyledSpan,
	StyledLink,
} from './styles';
import { useModal, useAuth } from '../../../hooks';

const RegisterModal = () => {
	const { openModal } = useModal();
	const { register } = useAuth();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [fullname, setFullname] = useState('');
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');
	const { t } = useTranslation(['common']);

	const handleSubmit = async () => {
		setLoading(true);
		await register({ fullname, email, password });
		setLoading(false);
		setMessage(t('common:checkYourInbox'));
		setEmail('');
		setPassword('');
		setFullname('');
		setTimeout(() => openModal('login'), 5000);
	};

	return (
		<StyledRegisterModal>
			<StyledLabel dangerouslySetInnerHTML={{ __html: t('common:registerTitle') }} />
			<Form onSubmit={handleSubmit}>
				<InputField
					icon={MdPermContactCalendar}
					name="fullname"
					placeholder={t('common:fullName')}
					type="text"
					required
					value={fullname}
					onChange={setFullname}
				/>
				<InputField
					icon={MdMailOutline}
					name="email"
					placeholder="E-mail"
					type="email"
					required
					value={email}
					onChange={setEmail}
				/>
				<InputField
					icon={MdVpnKey}
					name="password"
					placeholder="Password"
					type="password"
					required
					value={password}
					onChange={setPassword}
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
		</StyledRegisterModal>
	);
};

export default RegisterModal;
