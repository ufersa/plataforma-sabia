import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { MdPermContactCalendar, MdMailOutline, MdVpnKey } from 'react-icons/md';
import { AiFillCloseCircle as CloseIcon } from 'react-icons/ai';

import { toast } from '../../Toast';
import { Form, InputField } from '../../Form';
import { Button } from '../../Button';
import { SafeHtml } from '../../SafeHtml';
import {
	StyledRegisterModal,
	StyledLabel,
	StyledCloseButton,
	StyledModalContent,
	ActionsRegister,
	LabelGrups,
	StyledSpan,
	StyledLink,
} from './styles';
import { useModal, useAuth } from '../../../hooks';

const RegisterModal = ({ closeModal }) => {
	const { openModal } = useModal();
	const { register } = useAuth();
	const [loading, setLoading] = useState(false);
	const { t } = useTranslation(['common']);
	const [message, setMessage] = useState('');
	const handleSubmit = async ({ fullname, email, password }) => {
		setLoading(true);
		const result = await register({ fullname, email, password });
		setLoading(false);
		if (result.error) {
			setMessage(result.error.message[0].message);
		} else {
			toast.success(t('common:accountCreated'));
			openModal('login');
		}
	};

	return (
		<StyledRegisterModal>
			<StyledLabel>
				<StyledCloseButton type="button" aria-label="Close modal" onClick={closeModal}>
					<CloseIcon />
				</StyledCloseButton>
				<SafeHtml html={t('common:registerTitle')} />
			</StyledLabel>
			<StyledModalContent>
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
			</StyledModalContent>
		</StyledRegisterModal>
	);
};

RegisterModal.propTypes = {
	closeModal: PropTypes.func.isRequired,
};

export default RegisterModal;
