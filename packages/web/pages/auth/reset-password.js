import React, { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { MdMailOutline } from 'react-icons/md';
import { useRouter } from 'next/router';
import { useAuth, useTheme } from '../../hooks';
import { ContentContainer, Title } from '../../components/Common';
import { Form, InputField } from '../../components/Form';
import { Button } from '../../components/Button';
import { toast } from '../../components/Toast';
import { internal as internalPages } from '../../utils/enums/pages.enum';

const ResetPassword = () => {
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');

	const { colors } = useTheme();
	const { t } = useTranslation(['common']);
	const { resetPassword } = useAuth();
	const router = useRouter();

	const handleSubmit = async ({ email, userCode, password }) => {
		setLoading(true);
		const result = await resetPassword({ token: userCode, password, email });
		setLoading(false);

		if (result.success) {
			toast.success('Senha alterada com sucesso!');
			router.push(internalPages.signIn);
		} else {
			setMessage(result.error.message);
		}
	};

	return (
		<ContentContainer bgColor={colors.gray98}>
			<Form onSubmit={handleSubmit}>
				<Title align="left" noPadding noMargin>
					{t('common:passwordReset')}
				</Title>

				<p>{t('common:codeConfirmation')}</p>
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
				<InputField
					icon={MdMailOutline}
					name="password"
					placeholder={t('common:newPassword')}
					type="password"
					validation={{ required: true }}
				/>

				<p>{message}</p>

				<Button type="submit" disabled={loading}>
					{loading ? t('common:wait') : t('common:request')}
				</Button>
			</Form>
		</ContentContainer>
	);
};

export default ResetPassword;
