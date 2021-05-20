import React, { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useModal, useAuth, useTheme } from '../../hooks';
import { ContentContainer, Title } from '../../components/Common';
import { toast } from '../../components/Toast';
import { Form, Actions, InputField } from '../../components/Form';
import { Button } from '../../components/Button';
import { internal as internalPages } from '../../utils/consts/pages';

const ConfirmAccount = () => {
	const [loading, setLoading] = useState(false);

	const { colors } = useTheme();
	const { t } = useTranslation(['common']);
	const { openModal } = useModal();
	const { accountConfirmation } = useAuth();

	const handleSubmit = async ({ email, userCode }) => {
		setLoading(true);
		const result = await accountConfirmation({ token: userCode, email });
		setLoading(false);

		if (result.success) {
			openModal('login', {
				message: t('common:signInToContinue'),
				redirectTo: internalPages.home,
			});
		} else {
			toast.error(result.error.message.map((error) => error.message).join(', '));
		}
	};

	return (
		<ContentContainer bgColor={colors.gray98}>
			<Form onSubmit={handleSubmit}>
				<Title align="left" noPadding noMargin>
					{t('common:accountConfirmation')}
				</Title>

				<p>Digite abaixo o código de 6 dígitos que enviamos para o seu e-mail.</p>
				<br />

				<InputField
					name="email"
					placeholder="Confirme seu email"
					type="email"
					validation={{ required: true }}
				/>
				<InputField
					name="userCode"
					placeholder="Código"
					type="text"
					validation={{ required: true }}
					max={6}
				/>
				<Actions center row>
					<Button type="submit" disabled={loading}>
						{loading ? t('common:wait') : t('common:confirm')}
					</Button>
				</Actions>
			</Form>
		</ContentContainer>
	);
};

export default ConfirmAccount;
