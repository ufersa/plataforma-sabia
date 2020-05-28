import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Button } from './styles';
import { useModal, useAuth } from '../../hooks';

const NewTechnologyButton = () => {
	const { t } = useTranslation(['common']);
	const { openModal } = useModal();
	const { user } = useAuth();

	const url = '/technology/new';

	const handleClick = (e) => {
		if (!user.email) {
			e.preventDefault();
			openModal('login', {
				message: t('common:signInToContinue'),
				redirectTo: url,
			});
		}
	};

	return (
		<Link href={url} passHref>
			<Button onClick={handleClick}>
				<span
					/* eslint-disable react/no-danger */
					dangerouslySetInnerHTML={{
						__html: t('common:registerTechonology'),
					}}
				/>
			</Button>
		</Link>
	);
};

export default NewTechnologyButton;
