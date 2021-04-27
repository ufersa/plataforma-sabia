import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { MdMailOutline } from 'react-icons/md';
import { useModal, useAuth, useTheme } from '../../hooks';
import { ContentContainer, Title } from '../../components/Common';
import { Form, InputField } from '../../components/Form';
import { Button } from '../../components/Button';

const ResetPassword = () => {
	const [userToken, setUserToken] = useState(null);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');

	const { colors } = useTheme();
	const { t } = useTranslation(['common']);
	const { openModal } = useModal();
	const { resetPassword } = useAuth();
	const router = useRouter();

	useEffect(() => {
		const url = router.asPath;

		let token = url.split('?')[1];
		token = token?.split('token=')[1];

		if (!token) {
			router.push('/');
		}

		setUserToken(token);
	}, [router]);

	const handleSubmit = async ({ password }) => {
		setLoading(true);
		const result = await resetPassword({ token: userToken, password });
		setLoading(false);

		if (result.success) {
			openModal('login', {
				message: t('common:signInToContinue'),
				redirectTo: '/',
			});
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
