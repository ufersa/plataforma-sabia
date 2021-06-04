import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { MdMailOutline } from 'react-icons/md';
import { AiFillCloseCircle as CloseIcon } from 'react-icons/ai';
import { toast } from '../../Toast';
import { Form, InputField } from '../../Form';
import { Button } from '../../Button';
import { SafeHtml } from '../../SafeHtml';
import * as S from './styles';
import { auth as authPages } from '../../../utils/consts/pages';
import { useModal, useAuth } from '../../../hooks';

const ForgotPasswordModal = ({ closeModal }) => {
	const { openModal } = useModal();
	const { requestPasswordReset } = useAuth();
	const [loading, setLoading] = useState(false);
	const { t } = useTranslation(['common', 'error']);
	const [message, setMessage] = useState('');
	const router = useRouter();

	const handleSubmit = async ({ email }) => {
		setLoading(true);
		const result = await requestPasswordReset({ email });
		setLoading(false);

		if (result) {
			closeModal();
			toast.success(t('common:requestPasswordReset', { email }));
			router.push(authPages.confirmAccount);
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
