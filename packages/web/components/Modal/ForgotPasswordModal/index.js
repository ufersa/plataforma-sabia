import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { MdMailOutline } from 'react-icons/md';
import { AiFillCloseCircle as CloseIcon } from 'react-icons/ai';
import { Form, InputField } from '../../Form';
import { Button } from '../../Button';
import { SafeHtml } from '../../SafeHtml';
import * as S from './styles';
import { useModal, useAuth } from '../../../hooks';

const ForgotPasswordModal = ({ closeModal }) => {
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
				message: t('common:requestPasswordReset', { email }),
			});
		} else {
			setMessage(result?.error?.message ?? t('error:serverError'));
		}
	};

	return (
		<S.ForgotPasswordModal>
			<S.Header>
				<S.CloseButton type="button" aria-label="Close modal" onClick={closeModal}>
					<CloseIcon />
				</S.CloseButton>
				<SafeHtml html={t('common:forgotPassword')} />
			</S.Header>
			<S.ModalContent>
				<Form onSubmit={handleSubmit}>
					<InputField
						icon={MdMailOutline}
						name="email"
						placeholder="Insira seu e-mail"
						type="email"
						validation={{ required: true }}
					/>
					<p>{message}</p>
					<S.ActionsRegister>
						<Button type="submit" disabled={loading}>
							{loading ? t('common:wait') : t('common:request')}
						</Button>
						<S.LabelGroups>
							<S.Span>{t('common:alreadyHaveAnAccount?')}</S.Span>
							<S.Link onClick={() => openModal('login')}>
								{t('common:enterHere')}
							</S.Link>
						</S.LabelGroups>
					</S.ActionsRegister>
				</Form>
			</S.ModalContent>
		</S.ForgotPasswordModal>
	);
};

ForgotPasswordModal.propTypes = {
	closeModal: PropTypes.func.isRequired,
};

export default ForgotPasswordModal;
