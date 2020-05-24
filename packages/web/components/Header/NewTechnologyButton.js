import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { Button } from './styles';
import { useModal, useAuth } from '../../hooks';

const NewTechnologyButton = () => {
	const { t } = useTranslation(['common']);
	const { openModal } = useModal();
	const { user } = useAuth();
	const router = useRouter();
	const url = '/technology/new';
	const handleClick = (e) => {
		e.preventDefault();
		if (!user.email) {
			openModal('login', {
				message: t('common:signInToContinue'),
				redirectTo: url,
			});
		} else if (router.asPath !== url) {
			router.push(url);
		}
	};
	return (
		<Button onClick={handleClick}>
			<span
				/* eslint-disable react/no-danger */
				dangerouslySetInnerHTML={{
					__html: t('common:registerTechonology'),
				}}
			/>
		</Button>
	);
};

export default NewTechnologyButton;
